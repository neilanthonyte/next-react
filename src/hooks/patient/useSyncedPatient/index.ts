import { Patient } from "next-shared/src/models/Patient";
import { useMemo } from "react";
import { useCachedSyncedData } from "../../core/useCachedSyncedData";

import { useClient } from "../../useClient";

interface IUseSyncedPatient {
  patient: Patient;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Provides a syncronised patient that automatically updates when altered remotely.
 */
export const useSyncedPatient = (patientId: string): IUseSyncedPatient => {
  const client = useClient();

  // must explicitly name each of the options as dependency to ensure useMemo's equality check.
  const patientsSyncMetadata = useMemo(
    () => (patientId ? client.patients.retrieveSyncedPatient(patientId) : null),
    [patientId],
  );

  const { data, error } = useCachedSyncedData(patientsSyncMetadata);

  return {
    patient: data?.patient,
    error,
    isLoading: patientId && data === undefined && error === undefined,
  };
};
