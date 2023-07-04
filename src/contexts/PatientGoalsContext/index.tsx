import * as React from "react";

export interface IPatientGoalsContextValue {
  goals: fhir3.Goal[];
}

/**
 * The patient's goals
 */
export const PatientGoalsContext =
  React.createContext<IPatientGoalsContextValue>({
    goals: undefined,
  });
