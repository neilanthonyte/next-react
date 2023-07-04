import * as React from "react";

export interface IMedicalGoalsContextValue {
  medicalGoals: fhir3.Goal[];
}

/**
 * The patient's goals
 */
export const MedicalGoalsContext =
  React.createContext<IMedicalGoalsContextValue>({
    medicalGoals: undefined,
  });
