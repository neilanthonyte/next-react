import * as React from "react";
import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirGoalUtil } from "next-shared/src/fhirUtil/utilClasses/FhirGoalUtil";

import { Goal } from "../../generic/Goal";

export interface IFhirGoal {
  goal: fhir3.Goal;
}

const FhirGoal: React.FC<IFhirGoal> = ({ goal }) => {
  const goalUtil: FhirGoalUtil = fhirUtil(goal);
  return <Goal unit={goalUtil.getGoalUnit()}>{goalUtil.getGoalValue()}</Goal>;
};

export default FhirGoal;
