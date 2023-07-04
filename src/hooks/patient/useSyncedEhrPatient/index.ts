import { EhrPatient } from "next-shared/src/models/EhrPatient";
import { useMemo } from "react";
import { useCachedSyncedData } from "../../core/useCachedSyncedData";

import { useClient } from "../../useClient";

interface IUseSyncedEhrPatient {
  ehrPatient: EhrPatient;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Provides a synced EHR patient that automatically updates when modified remotely.
 *
 * Note it only responds to link/unlink changes currently.
 */
export const useSyncedEhrPatient = (
  ehrId: string,
  ehrPatientId: string,
): IUseSyncedEhrPatient => {
  const client = useClient();

  // must explicitly name each of the options as dependency to ensure useMemo's equality check.
  const patientsSyncMetadata = useMemo(
    () =>
      ehrPatientId
        ? client.patients.retrieveSyncedEhrPatient(ehrId, ehrPatientId)
        : null,
    [ehrPatientId, ehrId],
  );

  const { data, error } = useCachedSyncedData(patientsSyncMetadata);

  return {
    ehrPatient: data?.ehrPatient,
    error,
    isLoading: data === undefined,
  };
};
