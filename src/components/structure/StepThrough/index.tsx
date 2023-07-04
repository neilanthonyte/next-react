import * as React from "react";
import { Choice, IChoiceOption } from "../../generic/Choice";
import ToggleViews from "../ToggleViews";
import styles from "./styles.scss";

export interface IStepThroughAction {
  label: string;
  onClick: () => void;
  isDisabled?: boolean;
  isSecondary?: boolean;
}

export interface IStepThroughStep {
  view: React.ReactElement;
  actions?: IStepThroughAction[];
}

export interface IStepThroughProps {
  steps: IStepThroughStep[];
  show: number;
}

export const StepThrough: React.FC<IStepThroughProps> = ({ steps, show }) => {
  const toggleViewSteps = steps.map((step, i) => {
    const choices: IChoiceOption[] = (step.actions || []).map((a) => ({
      label: a.label,
      onSelect: a.onClick,
      isDisabled: a.isDisabled,
      isSelected: a.isSecondary !== true,
    }));
    return (
      <div className={styles.StepThrough_step} key={i}>
        <div className={styles.StepThrough_body}>{step.view}</div>
        <div className={styles.StepThrough_actions}>
          {choices ? <Choice choices={choices} /> : <div />}
        </div>
      </div>
    );
  });

  return (
    <div className={styles.StepThrough}>
      <ToggleViews views={toggleViewSteps} activeIndex={show} />
    </div>
  );
};
