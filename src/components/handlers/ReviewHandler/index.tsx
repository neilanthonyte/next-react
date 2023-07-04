import * as React from "react";
import { useCallback, useContext, useMemo } from "react";

import { NextNoActiveConsultError } from "next-shared/src/helpers/errorTypes";
import { getSupportedMedicalResourceTypesForEhr } from "next-shared/src/helpers/getSupportedMedicalResourceTypesForEhr";

import { EhrContext } from "../../../contexts/EhrContext/EhrContext";
import {
  ErrorResolverContext,
  TErrorHandlingApproach,
} from "../../../contexts/ErrorResolver";
import { ReviewContext } from "../../../contexts/ReviewContext";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { useClient } from "../../../hooks/useClient";
import { useRequiredContext } from "../../../hooks/useRequiredContext";

export interface IReviewHandlerProps {
  errorApproach?: TErrorHandlingApproach;
}

/**
 * Handler used to expose review methods to children via ReviewContext
 * Uses next patient in session and refetches resources on success
 */
export const ReviewHandler: React.FC<IReviewHandlerProps> = ({
  children,
  errorApproach = "modal",
}) => {
  const { resolveError } = useRequiredContext(ErrorResolverContext);

  // HACK transcribe can only be used when there's a review handler,
  //      but the functionality is EHR-dependent
  const { transcribeObservations } = useContext(EhrContext);

  const { nextPatient, scope } = useSyncedSessionData();
  const patientId = nextPatient?.patientId;
  const underlyingEhr = scope?.underlyingEhr;

  const client = useClient();

  const acceptResources = useCallback(
    (resIds: string[]) => {
      return client.patients.acceptReviewItems(patientId, resIds).catch((e) => {
        resolveError({
          title:
            e instanceof NextNoActiveConsultError
              ? "Please start a consult in Helix first"
              : "Unable to review item",
          approach: errorApproach,
        });
      });
    },
    [errorApproach, patientId],
  );

  const rejectResources = useCallback(
    (resIds: string[]) => {
      return client.patients.rejectReviewItems(patientId, resIds).catch((e) => {
        resolveError({
          title:
            e instanceof NextNoActiveConsultError
              ? "Please start a consult in Helix first"
              : "Unable to review item",
          approach: errorApproach,
        });
      });
    },
    [errorApproach, patientId],
  );

  const transcribeResources = useCallback(
    async (observations: fhir3.Observation[], ehrAppointmentId: string) => {
      const isSuccessful = transcribeObservations?.(observations);

      // shows an error if outside the bar context and/or the transcription fails
      if (!isSuccessful) {
        resolveError({
          title: "Unable to transcribe the item",
          description: "Please make sure you have started a consult.",
          approach: "modal",
        });
        return;
      }

      try {
        ehrAppointmentId
          ? await client.appointments.acceptAppointmentReviewItems(
              ehrAppointmentId,
              observations.map((obs) => obs.id),
            )
          : await client.patients.acceptReviewItems(
              patientId,
              observations.map((obs) => obs.id),
            );
      } catch (e) {
        resolveError({
          title:
            e instanceof NextNoActiveConsultError
              ? "Please start a consult in Helix first"
              : "Unable to transcribe item",
          approach: errorApproach,
        });
      }
    },
    [errorApproach, patientId, transcribeObservations],
  );

  const value = useMemo(
    () => ({
      acceptResources,
      rejectResources,
      transcribeResources,
      reviewableObservationTypes:
        getSupportedMedicalResourceTypesForEhr(underlyingEhr),
    }),
    [acceptResources, rejectResources, transcribeResources, underlyingEhr],
  );
  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
};
