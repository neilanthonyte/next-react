import * as React from "react";
import * as _ from "lodash";

import { IFormDetailsMulti } from "next-shared/src/types/formTypes";

import ToggleViews from "../../structure/ToggleViews";
import { Form } from "../Form";
import { Form as LibForm } from "../../../lib/Form";
import { ProgressDots } from "../../generic/ProgressDots";
import { Flow, FlowStep } from "../../structure/Flow";
import { PageSectionBody, PageSection } from "../../structure/PageSection";

import {
  importDataUsingMapping,
  exportDataUsingMapping,
} from "../../../lib/Form/helpers/remapFormData";
import verifyMultiFormSchema from "./helpers/verifyMultiFormSchema";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { NextClient } from "../../../client/NextClient";
import { withClient } from "../../../helpers/withClient";
const css = cssComposer(styles, "MultiForm");

export enum EFormSectionStatus {
  INVALID = -1,
  INCOMPLETE = 0,
  COMPLETE = 1,
}

export enum EMultiFormDisplayStyle {
  // collapsed sections
  Accordion,
  // steps through a set of forms
  StepByStep,
}

export interface IMultiFormProps {
  schema: IFormDetailsMulti;
  data?: any;
  onSuccess?: (...args: any[]) => any;
  onProgressUpdate?: (
    activeSection: number,
    statuses: EFormSectionStatus[],
  ) => any;
  activeSectionIndex?: number;
  showProgress?: boolean;
  displayStyle?: EMultiFormDisplayStyle;
  client: NextClient;
}

export interface IMultiFormState {
  activeSectionIndex: number;
}
/**
 * Renders a styleForm based on a schema.
 */
class MultiFormInner extends React.Component<IMultiFormProps, IMultiFormState> {
  private transformers: any;
  private sections: any;
  private views: React.FC[];

  constructor(props: IMultiFormProps) {
    super(props);
    // ensure the schema follows the expected format - throws if not
    verifyMultiFormSchema(props.schema);
    this.state = {
      activeSectionIndex: 0,
    };
    // prepare the data with the global transformers
    // this.transformers = props.schema.transformers || [];
    this.transformers = _.flatten(
      props.schema.sections.map((s) => {
        return s.schema.transformers || [];
      }),
    );
    // remove duplicate transformers
    this.transformers = _.uniqWith(this.transformers, _.isEqual);

    const globallyTransformedData = importDataUsingMapping(
      props.data,
      this.transformers,
    );
    // prepare the forms - each gets a copy of the supplied data, the Form objects are controlled
    // by this component, allowing them to be reinstated and queried, e.g. validate
    this.sections = props.schema.sections.map((section: any) => {
      // create the form object to handle the data
      const formObj = new LibForm(
        section.schema.fields,
        globallyTransformedData,
        // remove the transformers, as we'll transform the data globally
        null,
        this.props.client,
      );

      return {
        ...section,
        status: EFormSectionStatus.INCOMPLETE,
        form: formObj,
      };
    });

    // HACK - ensure the menu has the same status list - try do in a cleaner manner
    if (props.onProgressUpdate) {
      props.onProgressUpdate(
        0,
        this.sections.map((s: any) => s.status),
      );
    }
  }
  // let others know where we're up to
  reportProgress = () => {
    const { onProgressUpdate } = this.props;
    if (!onProgressUpdate) {
      return;
    }
    // provide some key details
    onProgressUpdate(
      this.state.activeSectionIndex,
      this.sections.map((s: any) => s.status),
    );
  };
  stepForward = () => {
    this.step(1);
  };
  stepBack = () => {
    this.step(-1);
  };
  step = (stepSize: number) => {
    const { activeSectionIndex } = this.state;

    this.setState(
      { activeSectionIndex: Math.max(0, activeSectionIndex + stepSize) },
      this.reportProgress,
    );
  };
  setStep = (step: number) => {
    this.setState({ activeSectionIndex: step }, this.reportProgress);
  };
  // hit submit on the last section
  finaliseForm = async () => {
    // validate all sub-forms
    this.sections = await Promise.all(
      this.sections.map(async (section: any) => {
        const errors = await section.form.validate();
        return {
          ...section,
          status: !errors
            ? EFormSectionStatus.COMPLETE
            : EFormSectionStatus.INVALID,
        };
      }),
    );
    // ensure the side menu is up to date
    this.reportProgress();
    // did any of the sections fail?
    const foundError =
      this.sections.filter((s: any) => s.status !== EFormSectionStatus.COMPLETE)
        .length > 0;
    if (foundError) {
      // muteError ensures this doesn't look like a more serious error
      return Promise.reject({
        errorMsg:
          "Some required details are incomplete. Please review and try again.",
      });
    }
    // do we need to report the change?
    const { onSuccess } = this.props;
    if (!onSuccess) {
      return;
    }
    // merge styleForm outputs into one as the forms may refer to the same resource
    let output = {};
    const outputs = [];
    this.sections.map((section: any) => {
      const sectionData = section.form.exportData();
      // could be empty if no data was entered
      if (!_.isEmpty(sectionData)) {
        output = _.merge(output, sectionData);
        outputs.push(sectionData);
      }
    });
    const globallyTransformedData = exportDataUsingMapping(
      output,
      this.transformers,
    );
    return onSuccess(globallyTransformedData);
  };
  // are we showing the last section?
  isLastSectionActive = () => {
    const { activeSectionIndex } = this.state;
    return activeSectionIndex === this.sections.length - 1;
  };
  // user clicks on the styleForm's 'cancel' button
  onSectionCancel = () => {
    this.stepBack();
  };
  // user submits a subform
  onSectionSuccess = (sectionIndex: any) => {
    this.sections[sectionIndex].status = EFormSectionStatus.COMPLETE;
    return this.isLastSectionActive()
      ? this.finaliseForm()
      : this.stepForward();
  };
  // user submits a subform
  onSectionError = (sectionIndex: any) => {
    this.sections[sectionIndex].status = EFormSectionStatus.INVALID;
    this.reportProgress();
  };
  shouldComponentUpdate(
    nextProps: IMultiFormProps,
    nextState: IMultiFormState,
  ) {
    // avoid unwanted changes - in part caused by Styleguidist
    return this.state.activeSectionIndex !== nextState.activeSectionIndex;
  }

  UNSAFE_componentWillReceiveProps(nextProps: IMultiFormProps) {
    // respond to section changes
    if (!("activeSectionIndex" in nextProps)) {
      return;
    }
    if (nextProps.activeSectionIndex !== this.state.activeSectionIndex) {
      this.setState({
        activeSectionIndex: nextProps.activeSectionIndex,
      });
    }
  }
  render() {
    const { activeSectionIndex } = this.state;
    const { showProgress = false } = this.props;
    const { displayStyle = EMultiFormDisplayStyle.StepByStep } = this.props;

    switch (displayStyle) {
      case EMultiFormDisplayStyle.StepByStep:
        // set up the views for rendering
        const views = this.sections.map((section: any, i: number) => {
          const nextSection =
            i < this.sections.length - 1 ? this.sections[i + 1] : null;

          const onSuccess = () => this.onSectionSuccess(i);
          const onError = () => this.onSectionError(i);
          const onCancel = i === 0 ? undefined : () => this.onSectionCancel();

          return (
            <div data-test="multiform-form" key={i}>
              <PageSection>
                <PageSectionBody>
                  <Form
                    title={section.schema.title}
                    submitLabel={
                      nextSection ? `Next: ${nextSection.label}` : "Finish"
                    }
                    form={section.form}
                    disableOnSuccess={false}
                    onSuccess={onSuccess}
                    onError={onError}
                    onCancel={onCancel}
                    cancelLabel="< Previous"
                  />
                </PageSectionBody>
              </PageSection>
            </div>
          );
        });
        return (
          <div className={css("")}>
            <div
              data-test="multiform-toggleviews"
              data-test-activeselectionindex={activeSectionIndex}
              data-test-totalpages={views.length}
            >
              {showProgress && (
                <div className={css("progress")}>
                  <ProgressDots
                    current={activeSectionIndex}
                    total={views.length}
                  />
                </div>
              )}
              <ToggleViews views={views} activeIndex={activeSectionIndex} />
            </div>
          </div>
        );
      case EMultiFormDisplayStyle.Accordion:
        return (
          <div className={css("")}>
            <Flow step={activeSectionIndex}>
              {this.sections.map((section: any, i: number) => {
                const isLast = i === this.sections.length - 1;
                const nextSection = isLast ? null : this.sections[i + 1];

                const onSuccess = () => this.onSectionSuccess(i);
                const onError = () => this.onSectionError(i);

                return (
                  <FlowStep
                    key={i}
                    title={`${section.label || "Section"}${
                      isLast ? " & submit" : ""
                    }`}
                    headerOnClick={() => this.setStep(i)}
                  >
                    <Form
                      submitLabel={nextSection ? `Next` : "Finish"}
                      form={section.form}
                      onSuccess={onSuccess}
                      onError={onError}
                      disableOnSuccess={false}
                    />
                  </FlowStep>
                );
              })}
            </Flow>
          </div>
        );
      default:
        return null;
    }
  }
}

export const MultiForm =
  withClient<Omit<IMultiFormProps, "client">>(MultiFormInner);

// TODO - legacy support
export default MultiForm;
