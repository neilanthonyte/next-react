import * as React from "react";

import ProgressTrackerStacked, {
  EProgressStepStatus as trackerStatuses,
} from "../../generic/ProgressTrackerStacked";
import { EFormSectionStatus as formStatuses } from "../MultiForm";
import { useContext } from "react";
import { FormStateContext, IFormSectionState } from "../FormStateContext";

const mapStatus = (formStatus: any) => {
  switch (formStatus) {
    case formStatuses.INVALID:
      return trackerStatuses.INVALID;
    case formStatuses.COMPLETE:
      return trackerStatuses.COMPLETE;
  }
  return trackerStatuses.INCOMPLETE;
};

export interface IMultiFormMenuProps {}

export const MultiFormMenu: React.FC<IMultiFormMenuProps> = ({}) => {
  const { clear, reset, sections, activeSection, setActiveSection } =
    useContext(FormStateContext);

  // convert form progress to ProgressTrackerStacked representation
  const steps = (sections || []).map((section: IFormSectionState) => ({
    heading: section.label,
  }));
  const statuses = (sections || []).map((section: IFormSectionState) =>
    mapStatus(section.status),
  );

  return (
    <ProgressTrackerStacked
      steps={steps}
      activeStep={activeSection}
      status={statuses}
      onStepClick={setActiveSection}
    />
  );
};
