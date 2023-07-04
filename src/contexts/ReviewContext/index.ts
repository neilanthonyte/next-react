import * as React from "react";
import { MedicalResourceType } from "next-shared/src/types/types";

export interface IReviewContextValue {
  acceptResources: (ids: string[]) => Promise<void>;
  rejectResources: (ids: string[]) => Promise<void>;
  transcribeResources: (
    observations: fhir3.Observation[],
    ehrAppointmentId: string | void,
  ) => Promise<void>;
  /**
   * The types of observations that can be imported into the EHR via the "Accept/Reject" workflow.
   */
  reviewableObservationTypes: readonly MedicalResourceType[];
}

/**
 * Context exposing review and transcribe methods
 */
export const ReviewContext = React.createContext<IReviewContextValue>({
  acceptResources: undefined,
  rejectResources: undefined,
  transcribeResources: undefined,
  reviewableObservationTypes: [],
});
