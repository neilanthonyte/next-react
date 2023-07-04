import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { useMemo } from "react";

const css = cssComposer(styles);

export enum EProgressStepStatus {
  INVALID = -1,
  INCOMPLETE = 0,
  COMPLETE = 1,
}

export interface IProgressStep {
  heading: string;
  description?: string;
  subSteps?: IProgressStep[];
}

interface IPreparedProgressStep extends IProgressStep {
  isGroup: boolean; // has sub steps
  isSub: boolean; // is sub step
}

const prepSteps = (steps: IProgressStep[]): IPreparedProgressStep[] => {
  const preppedSteps: IPreparedProgressStep[] = [];
  steps.forEach((step) => {
    const isGroup = "subSteps" in step;

    preppedSteps.push({ ...step, isGroup, isSub: false });
    if (isGroup) {
      step.subSteps.forEach((substep) =>
        preppedSteps.push({ ...substep, isGroup: false, isSub: true }),
      );
    }
  });

  return preppedSteps;
};

interface IProgressTrackerStackedProps {
  steps: IProgressStep[];
  activeStep?: number; // defaults to 0
  className?: string;
  status: EProgressStepStatus[]; // maps to each step in the steps array
  onStepClick?: (stepIndex: number) => void;
}

/**
 *  Steps bar showed for progression through a multi step process
 */
export const ProgressTrackerStacked: React.FC<IProgressTrackerStackedProps> = ({
  steps,
  activeStep = 0,
  className = "",
  status = [],
  onStepClick,
}) => {
  const preppedSteps: IPreparedProgressStep[] = useMemo(
    () => prepSteps(steps),
    [steps],
  );

  return (
    <div
      className={[css("progressTrackerStacked"), className].join(" ")}
      data-test="progress-tracker-stacked"
    >
      {preppedSteps.map((step, i) => {
        const isActive = activeStep === i;
        const isComplete =
          status.length > i
            ? !isActive && status[i] === EProgressStepStatus.COMPLETE
            : i < activeStep;
        const isInvalid =
          status.length > i
            ? !isActive && status[i] === EProgressStepStatus.INVALID
            : false;

        return (
          <div
            className={css(
              "step",
              { "-clickable": !!onStepClick },
              { "-active": isActive },
              { "-completed": isComplete },
              { "-invalid": isInvalid },
              { "-sub": step.isSub },
              { "-group": step.isGroup },
            )}
            key={i}
            onClick={() => {
              if (onStepClick) {
                onStepClick(i);
              }
            }}
            data-test="progress-tracker-item"
          >
            <div className={css("step_heading")}>
              <div className={css("step_point")} />
              <div className={css("step_label")}>{step.heading}</div>
            </div>

            <div className={css("step_description")}>{step.description}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressTrackerStacked; // for legacy imports
