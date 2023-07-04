import * as React from "react";
import * as _ from "lodash";

import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import { FormInner as StyleForm } from "./components/FormInner";
import { ErrorMessage, MessageBody } from "../../generic/Message";

import { FieldInputs } from "./components/FieldInputs";
import { Form as DataForm } from "../../../lib/Form";
import { IFormSchema, IFormField } from "next-shared/src/types/formTypes";
import { Collapse } from "../../generic/Collapse";
import { NextClient } from "../../../client/NextClient";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { FormContext } from "./examples/helpers/formContext";
import { withClient } from "next-react/src/helpers/withClient";

const css = cssComposer(styles, "Form");

export interface IFormProps {
  /** The styleForm description */
  schema?: IFormSchema;
  /** The internal form object */
  form?: any;
  /** The initial styleForm data */
  data?: any;
  /** A set of data transformations to prepare the data for the schema. */
  dataTransformers?: any[];
  /** Success callback */
  onSuccess?: (details?: any) => any;
  /** Called whenever the form changes, which includes on every keystroke, so use with caution */
  onChange?: (details?: any) => any;
  /** Error callback */
  onError?: (arg?: any) => any;
  /** Cancel callback */
  onCancel?: (arg?: any) => any;
  /** Overrides the default submit button label */
  submitLabel?: string;
  /** Dumps the output to a debug `div` - not be used in production */
  debug?: boolean;
  disableOnSuccess?: boolean;
  title?: string;
  cancelLabel?: string;
  // TODO change to use context instead
  client?: NextClient;
}

export interface IFormState {
  fields: any;
  errorMsg: boolean | string;
}

/**
 * Produces a form based on a schema. Forms are highly functional components - please refer
 * to the readme for details of each feature.
 */
class FormInner extends React.PureComponent<IFormProps, IFormState> {
  // TODO - he this once the from class has been typed.
  private form: any;
  private initial: boolean = true;

  constructor(props: IFormProps) {
    super(props);
    if (props.form) {
      // allow the parent component to pass a Form object
      this.form = props.form;
    } else {
      // create a Form object based on the passed details
      this.form = new DataForm(
        props.schema,
        props.data,
        props.dataTransformers,
        props?.client,
      );
    }

    this.state = {
      fields: this.form.getFields(),
      errorMsg: false,
    };

    // respond to form changes
    this.form.registerOnChangeCallback((fields: IFormField[]) => {
      this.setState({ fields });

      // use the initialised property to avoid reporting early changes
      if (this.form.isInitialised) {
        props?.onChange?.(this.form.exportData());
      }
    });
  }

  public setFieldValue = (value: any, field: IFormField) => {
    this.form.set(value, field);
  };

  public clearFieldValue = (field: IFormField) => {
    this.form.clearField(field);
  };

  // Creates a new group instance
  public newGroupInstance = (field: IFormField) => {
    this.form.createGroupInstance(field);
  };

  public removeGroupInstance = (field: IFormField) => {
    this.form.removeGroupInstance(field);
  };

  public onSubmit = () => {
    const { onError, disableOnSuccess = true } = this.props;

    // Prevent editing during submit
    this.form.disable();
    this.setState({ fields: this.form.getFields(), errorMsg: false });

    return this.form.validate().then((errorCount: number) => {
      // Ensure the button shows an error
      if (errorCount) {
        this.setState({
          errorMsg:
            "Some of the fields are incorrect - please review and submit again.",
        });
        // allow it to be re-edited
        this.form.enable();
        // report back
        onError && onError();
        return Promise.reject();
      }

      // allow it to be re-edited
      if (!disableOnSuccess) {
        this.form.enable();
      }

      // Check if we need to wait for the calling class
      const remoteExec = _.isFunction(this.props.onSuccess)
        ? this.props.onSuccess(this.form.exportData())
        : false;
      // Check if the external promises fails and show an error message
      const isPromise = remoteExec && remoteExec.constructor === Promise;
      if (!isPromise) {
        return;
      }

      return remoteExec.catch((err: any) => {
        // show a general purpose error on behalf of the parent component
        this.setState({ errorMsg: _.get(err, "errorMsg") || true });
        // re-enable on error
        this.form.enable();
        return Promise.reject(err);
      });
    });
  };

  public onCancel = (externalCallback: any) => {
    if (_.isFunction(externalCallback)) {
      // return the current state
      externalCallback(this.form.exportData());
    }
  };

  public render() {
    const { fields = [], errorMsg } = this.state;
    const {
      title,
      submitLabel,
      onCancel = false,
      cancelLabel = "Cancel",
      onSuccess,
    } = this.props;
    const { onSubmit } = this;
    const provider = {
      setFieldValue: this.setFieldValue,
      clearFieldValue: this.clearFieldValue,
      newGroupInstance: this.newGroupInstance,
      removeGroupInstance: this.removeGroupInstance,
    };

    return (
      <FormContext.Provider value={provider}>
        <div className={css("")}>
          <StyleForm
            // only render a submit button when there is a valid callback - can be disabled when the onChange is used
            onSubmit={onSuccess ? onSubmit : undefined}
            submitLabel={submitLabel}
            title={title}
            onCancel={onCancel ? () => this.onCancel(onCancel) : false}
            cancelLabel={cancelLabel}
          >
            <FieldInputs fields={fields} />
            <Collapse isOpened={!!errorMsg}>
              <div className={css("error")}>
                {_.isString(errorMsg) ? (
                  <div data-test="customError">
                    <ErrorMessage>
                      <MessageBody>{errorMsg}</MessageBody>
                    </ErrorMessage>
                  </div>
                ) : (
                  <div data-test="genericError">
                    <ErrorPlaceholder />
                  </div>
                )}
              </div>
            </Collapse>
          </StyleForm>
        </div>
      </FormContext.Provider>
    );
  }
}

// HACK better handling of omitting the client
// @ts-ignore
export const Form = withClient<Omit<IFormProps, "client">>(FormInner);
export const FormWithoutClient = FormInner;
