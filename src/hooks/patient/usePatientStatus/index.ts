import { useEffect, useMemo } from "react";
import { useQuery } from "react-query";

import { IPatientDataSectionWithStatus } from "next-shared/src/types/IPatientDataSection";

import { useClient } from "../../useClient";
import { useSyncedSessionData } from "../../core/useSyncedSessionData";

export interface IPatientStatus {
  patientDataSections: IPatientDataSectionWithStatus[];
  numberOfUpdates: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<IPatientDataSectionWithStatus[]>;
}

/**
 * Hook fetching available patient data statuses. Automatically re-fetches based on synced session data.
 *
 * The patient status will be re-fetched if:
 *   - the Next patient's demographicInformationUpdatedAt is updated, and/or
 *   - the EHR patient's FHIR is changed.
 *
 * TODO this should probably be a socket
 */
export const usePatientStatus = (): IPatientStatus => {
  const client = useClient();

  const { ehrPatient, nextPatient } = useSyncedSessionData();

  const {
    data: patientDataSections,
    error,
    isLoading,
    refetch,
  } = useQuery<IPatientDataSectionWithStatus[] | null, Error>(
    ["retrievePatientStatus", ehrPatient?.ehrPatientId],
    () => {
      return ehrPatient?.ehrPatientId
        ? client.patients.retrievePatientStatus(ehrPatient?.ehrPatientId)
        : null;
    },
  );

  useEffect(() => {
    void refetch();
  }, [nextPatient?.demographicInformationUpdatedAt, ehrPatient?.fhir, refetch]);

  const numberOfUpdates = useMemo<number>(() => {
    if (!patientDataSections) return 0;
    return patientDataSections.filter((s) => s.status === "updated").length;
  }, [patientDataSections]);

  return useMemo(
    () => ({
      patientDataSections,
      numberOfUpdates,
      refetch,
      isLoading,
      error,
    }),
    [patientDataSections, refetch, isLoading, error, numberOfUpdates],
  );
};
