import * as React from "react";
import * as _ from "lodash";

import { InputControls } from "../../../../generic/InputControls";
import { InputDecoration } from "../../../../generic/InputDecoration";
import { TextInput } from "../../../../inputs/TextInput";

import StyleFormGroup from "../FormGroup";
import { formFieldLayoutTypes } from "../FormFieldLayout";

import { FieldInputs } from "../FieldInputs";
import { IFormField } from "next-shared/src/types/formTypes";
import { Disable } from "../../../../generic/Disable";
import { FormContext } from "../../examples/helpers/formContext";
import {
  getInputComponentForField,
  isHiddenField,
  isScoreField,
  isGroupField,
} from "./helpers/inputs";
import { FormHeading } from "../FormHeading";
import { FormDivider } from "../FormDivider";
import { VStack } from "../../../../structure/VStack";
import styles from "./styles.scss";

const isNonValue = (val: any) => ["", null].indexOf(val) > -1;

/**
 * Strip off trailing non-values to act as if they're not there (avoid `false`
 * as this could be chosen value) avoids them being added to the styleForm object
 */
const stripTrailingBlanks: any = (ary: any[]) =>
  isNonValue(_.last(ary)) ? stripTrailingBlanks(ary.slice(0, -1)) : ary;

export interface IFormInputProps {
  /** The styleForm object - allowing for updating */
  field: IFormField;
}

export class FormInput extends React.PureComponent<IFormInputProps> {
  static defaultProps = {
    field: {
      type: "text",
      _visible: true,
    } as IFormField,
  };

  constructor(props: IFormInputProps) {
    super(props);
  }

  public renderGroup() {
    const { field } = this.props;

    const {
      label,
      layout,
      _instances: fieldInstances,
      allowMultiple,
      newInstanceLabel,
    } = field;

    return (
      <FormContext.Consumer>
        {({ newGroupInstance }) => (
          <StyleFormGroup
            onNewInstance={allowMultiple && (() => newGroupInstance(field))}
            newInstanceLabel={newInstanceLabel}
            label={label}
          >
            <VStack size="comfortable">
              {fieldInstances.map((instance, i) => (
                <FieldInputs
                  key={i}
                  fields={instance.fields}
                  layout={formFieldLayoutTypes[layout]}
                />
              ))}
            </VStack>
          </StyleFormGroup>
        )}
      </FormContext.Consumer>
    );
  }

  public renderInput() {
    const { field } = this.props;
    // pull out props that shouldn't be passed to the input
    const { value, errors, disabled, ...inputProps } = field;
    // pull out props that are also passed/used by the input
    const { allowMultiple } = field;
    const {
      component: InputComponent,
      supportsMultiple = false,
      clearable = true,
      indentClear = false,
      _componentType,
    } = getInputComponentForField(field) as any;

    if (allowMultiple && !_.isArray(value)) {
      throw new Error("Mismatch in data");
    }

    // pass value (be it an array) straight through to a single input
    if (supportsMultiple || !allowMultiple) {
      return (
        <FormContext.Consumer>
          {({ setFieldValue }) => {
            const onClear = () => {
              // clearFieldValue(field);
              setFieldValue(allowMultiple ? [] : null, field);
            };
            const hasValue = allowMultiple
              ? value.length > 0
              : !isNonValue(value);
            // merge all errors together as we do not have separate inputs to render them against
            const errorAry = allowMultiple
              ? _.flatten(errors).filter((x) => x)
              : errors;

            return (
              <div
                data-test-component-type={_componentType}
                data-test-map={`${field._path}`}
                data-required={field.required}
                data-hint={`${field.type}`}
              >
                <InputControls
                  onClearValue={clearable && !disabled && hasValue && onClear}
                  errors={errorAry}
                  indentClear={indentClear}
                >
                  <div data-test="input-component">
                    <InputComponent
                      value={value}
                      onInputChange={(val: any) => {
                        setFieldValue(val, field);
                      }}
                      disabled={disabled}
                      {...inputProps}
                    />
                  </div>
                </InputControls>
              </div>
            );
          }}
        </FormContext.Consumer>
      );
    }

    let valueAry = _.clone(value);
    let errorAry = _.clone(errors);

    // add a value to the end of the array if empty or full with values
    // ensures a field is always showing or causes a new instance to be rendered when previous is filled
    if (value.length === 0 || _.last(value) !== null) {
      valueAry = valueAry.concat([null]);
    }

    // treat field level errors as errors on the first value, i.e. merge first and second
    if (errorAry.length > 1) {
      const fieldErrors = errorAry.shift();
      // check errors exist
      if (_.isArray(fieldErrors)) {
        // check the first field has its own errors
        if (_.isArray(errorAry[0])) {
          errorAry[0] = fieldErrors.concat(errorAry[0]);
        } else {
          errorAry[0] = fieldErrors;
        }
      }
    }

    // limit number of instances based on specified limits
    const { maxInstances = false } = field;
    if (maxInstances) {
      valueAry = valueAry.slice(0, maxInstances);
      errorAry = errorAry.slice(0, maxInstances);
    }

    return (
      <FormContext.Consumer>
        {({ setFieldValue }) =>
          valueAry.map((v: any, i: number) => {
            const onClear = () => {
              const newValues = [].concat(valueAry);
              newValues[i] = null;
              setFieldValue(stripTrailingBlanks(newValues), field);
            };
            const hasValue = !isNonValue(v);

            // note - may not have error information for unvalidated instances, hence the error array check
            return (
              <div
                data-test-component-type={_componentType}
                data-test-map={`${field._path}.${i}`}
                data-required={field.required}
                key={`${field._path}.${i}`}
              >
                <InputControls
                  onClearValue={clearable && !disabled && hasValue && onClear}
                  errors={i < errorAry.length ? errorAry[i] : false}
                >
                  <div data-test="input-component">
                    <InputComponent
                      value={v}
                      onInputChange={(val: any) => {
                        const newValues = _.clone(valueAry);
                        newValues[i] = val;
                        setFieldValue(stripTrailingBlanks(newValues), field);
                      }}
                      disabled={disabled}
                      {...inputProps}
                    />
                  </div>
                </InputControls>
              </div>
            );
          })
        }
      </FormContext.Consumer>
    );
  }

  public render() {
    const { field } = this.props;

    // value is retained in the styleForm - no need to render an input
    if (isHiddenField(field)) {
      return null;
    }

    // score fields aren't to be displayed to the user.
    if (isScoreField(field)) {
      return null;
    }

    const {
      label,
      description,
      descriptionImageUrl,
      required,
      _visible: visible,
      _illegal: illegal,
      value,
      allowMultiple,
      disabled,
    } = field;

    if (!visible) {
      return null;
    }

    switch (field.type) {
      case "heading":
        return <FormHeading label={label} description={description} />;
      case "divider":
        return <FormDivider />;
    }

    // does the field hold an illegal value
    if (illegal) {
      return (
        <div className={styles.FormInput}>
          <Disable disabled={true}>
            <InputDecoration
              label={label}
              description={description}
              descriptionImageUrl={descriptionImageUrl}
            >
              <InputControls>
                <TextInput
                  value={allowMultiple ? value.join(",") : value}
                  onInputChange={() => {}}
                />
              </InputControls>
              <p>
                NOTE: the current value is unrecognised and cannot be edited.
              </p>
            </InputDecoration>
          </Disable>
        </div>
      );
    }

    return (
      <div className={styles.FormInput}>
        <Disable disabled={disabled}>
          {isGroupField(field) ? (
            this.renderGroup()
          ) : (
            <InputDecoration
              label={label}
              description={description}
              isRequired={required}
              descriptionImageUrl={descriptionImageUrl}
            >
              {this.renderInput()}
            </InputDecoration>
          )}
        </Disable>
      </div>
    );
  }
}

// TODO - legacy support
export default FormInput;
