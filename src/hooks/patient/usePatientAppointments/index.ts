import { useMemo } from "react";
import { useQuery } from "react-query";
import moment from "moment";

import { FhirAppointmentUtil } from "next-shared/src/fhirUtil/utilClasses/FhirAppointmentUtil";
import { fhirUtil } from "next-shared/src/fhirUtil";
import { IAppointmentWithDetails } from "next-shared/src/types/IAppointmentWithDetails";

import { useClient } from "../../useClient";

export const RETRIEVE_APPOINTMENTS_QUERY_KEY = "retrieveAppointments";

interface IAppointmentQueryResult {
  all: IAppointmentWithDetails[] | null;
  past: IAppointmentWithDetails[] | null;
  upcoming: IAppointmentWithDetails[] | null;
  todays: IAppointmentWithDetails[] | null;
}

interface IPatientAppointmentsWithRelated {
  error: Error | null;
  isLoading: boolean;
  refetch: () => Promise<IAppointmentWithDetails[]>;
  patientAppointments: IAppointmentQueryResult;
}

/**
 * Hook fetching patient appointments for both ehrPatient and nextPatient based on the id parameter
 */
export const usePatientAppointments = ({
  nextPatientId,
  ehrPatientId,
}: {
  nextPatientId?: string;
  ehrPatientId?: string;
}): IPatientAppointmentsWithRelated => {
  const client = useClient();
  const {
    data: patientAppointmentsWithDetails,
    isLoading,
    error,
    refetch,
  } = useQuery<IAppointmentWithDetails[], Error>(
    [RETRIEVE_APPOINTMENTS_QUERY_KEY, nextPatientId, ehrPatientId],
    () => {
      if (ehrPatientId) {
        return client.appointments.retrieveAppointmentsForEhrPatient(
          ehrPatientId,
        );
      }
      return client.appointments.retrieveAppointmentsForPatient(nextPatientId);
    },
    {
      enabled: !!nextPatientId || !!ehrPatientId,
    },
  );

  return useMemo<IPatientAppointmentsWithRelated>(() => {
    if (!patientAppointmentsWithDetails) {
      return {
        patientAppointments: {
          all: null,
          past: null,
          upcoming: null,
          todays: null,
        },
        error,
        isLoading,
        refetch,
      };
    }
    const now = moment();
    const all = patientAppointmentsWithDetails.sort(
      (appt1, appt2) =>
        moment(appt1.appointment.start).unix() -
        moment(appt2.appointment.start).unix(),
    );

    const todays = all.filter((appt) =>
      moment(appt.appointment.end).isSame(now, "day"),
    );

    const upcoming = all.filter((appt) => {
      // if telehealth, keep in upcoming for the whole day
      const isTelehealth = fhirUtil<FhirAppointmentUtil>(
        appt.appointment,
      ).getTelehealthUrl();
      const momentAppointmentEnd = moment(appt.appointment.end);
      const telehealthToday =
        isTelehealth && momentAppointmentEnd.isSame(now, "day");
      const endInFuture = momentAppointmentEnd.isAfter(now);
      return telehealthToday || endInFuture;
    });

    const past = all
      .filter(
        (appt) =>
          !upcoming.some(
            (appt2) => appt.appointment.id === appt2.appointment.id,
          ),
      )
      // for past appointments, we want desc reversed order, starting from most recent
      .sort(
        (appt1, appt2) =>
          moment(appt2.appointment.end).unix() -
          moment(appt1.appointment.end).unix(),
      );

    return {
      patientAppointments: {
        all,
        past,
        upcoming,
        todays,
      },
      isLoading,
      error,
      refetch,
    };
  }, [patientAppointmentsWithDetails, refetch, error, isLoading]);
};
