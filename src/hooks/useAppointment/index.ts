import { useMemo } from "react";
import { useQuery } from "react-query";

import { IAppointmentWithDetails } from "next-shared/src/types/IAppointmentWithDetails";

import { useClient } from "../useClient";

interface IAppointment {
  appointment: IAppointmentWithDetails;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<IAppointmentWithDetails>;
}

/**
 * Hook handling fetching of appointment
 */
export const useAppointment = (
  ehrId: string,
  ehrAppointmentId: string,
  token?: string,
): IAppointment => {
  const client = useClient();

  const {
    data: appointment,
    error,
    isLoading,
    refetch,
  } = useQuery<IAppointmentWithDetails, Error>(
    ["appointments.retrieveAppointment", ehrId, ehrAppointmentId, token],
    () => {
      return client.appointments.retrieveAppointment(
        ehrId,
        ehrAppointmentId,
        token,
      );
    },
    { enabled: !!ehrId && !!ehrAppointmentId },
  );

  return useMemo<IAppointment>(
    () => ({
      appointment,
      error,
      isLoading,
      refetch,
    }),
    [appointment, error, isLoading, refetch],
  );
};
