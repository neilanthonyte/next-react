import { useMemo } from "react";

import {
  groupPatientAppointmentsChronologically,
  IPatientAppointments,
} from "next-shared/src/helpers/groupPatientAppointmentsChronologically";

import { useCachedSyncedData } from "../../core/useCachedSyncedData";
import { useClient } from "../../useClient";

interface IEhrPatientAppointments {
  patientAppointments: IPatientAppointments;
  isMissingFormForToday: boolean;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Provides a syncronised patient appointments list that automatically updates when altered remotely.
 */
export const useSyncedEhrPatientAppointments = (
  ehrId: string,
  ehrPatientId: string,
): IEhrPatientAppointments => {
  const client = useClient();

  // must explicitly name each of the options as dependency to ensure useMemo's equality check.
  const ehrPatientAppointmentsSyncMetadata = useMemo(() => {
    if (!ehrId || !ehrPatientId) {
      return null;
    }
    return client.patients.retrieveSyncedEhrPatientAppointments(
      ehrId,
      ehrPatientId,
    );
  }, [ehrId, ehrPatientId]);

  const { data: patientAppointmentsWithDetails, error } = useCachedSyncedData(
    ehrPatientAppointmentsSyncMetadata,
  );

  return useMemo(() => {
    if (!ehrId || !ehrPatientId || !patientAppointmentsWithDetails) {
      return {
        patientAppointments: {
          all: null,
          past: null,
          upcoming: null,
          todays: null,
        },
        isMissingFormForToday: false,
        error: null,
        // if we have a patient, but no data we are loading
        isLoading: !!(ehrId && ehrPatientId),
      };
    }

    const groupedAppointments = groupPatientAppointmentsChronologically(
      patientAppointmentsWithDetails,
    );

    const isMissingFormForToday = !!(groupedAppointments?.todays || []).find(
      (appt) => (appt.forms || []).length === 0,
    );

    return {
      patientAppointments: groupedAppointments,
      isMissingFormForToday,
      isLoading: patientAppointmentsWithDetails === undefined,
      error,
    };
  }, [patientAppointmentsWithDetails, ehrId, ehrPatientId]);
};
