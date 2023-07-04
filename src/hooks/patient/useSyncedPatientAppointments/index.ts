import { useMemo } from "react";

import {
  groupPatientAppointmentsChronologically,
  IPatientAppointments,
} from "next-shared/src/helpers/groupPatientAppointmentsChronologically";

import { useCachedSyncedData } from "../../core/useCachedSyncedData";
import { useClient } from "../../useClient";

interface IPatientAppointmentsResult {
  patientAppointments: IPatientAppointments;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Provides a syncronised patient appointments list that automatically updates when altered remotely.
 */
export const useSyncedPatientAppointments = (
  patientId: string,
): IPatientAppointmentsResult => {
  const client = useClient();

  // must explicitly name each of the options as dependency to ensure useMemo's equality check.
  const patientAppointmentsSyncMetadata = useMemo(
    () =>
      patientId
        ? client.patients.retrieveSyncedPatientAppointments(patientId)
        : null,
    [patientId],
  );

  const { data: patientAppointmentsWithDetails, error } = useCachedSyncedData(
    patientAppointmentsSyncMetadata,
  );

  return useMemo(() => {
    if (!patientAppointmentsWithDetails) {
      return {
        patientAppointments: {
          all: null,
          past: null,
          upcoming: null,
          todays: null,
        },
        error: null,
        isLoading: false,
      };
    }

    return {
      patientAppointments: groupPatientAppointmentsChronologically(
        patientAppointmentsWithDetails,
      ),
      isLoading: patientAppointmentsWithDetails === undefined,
      error,
    };
  }, [patientAppointmentsWithDetails]);
};
