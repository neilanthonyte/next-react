import { useMemo } from "react";
import { useQuery } from "react-query";

import { IPatientPaymentsDetails } from "next-shared/src/types/IPatientPaymentDetails";
import { unixTimestamp } from "next-shared/src/types/dateTypes";

import { useClient } from "../../useClient";

export interface IUsePatientPaymentsDetails {
  patientPaymentsDetails: IPatientPaymentsDetails;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<IPatientPaymentsDetails>;
}

/**
 * Hook fetching patient payment methods and subscriptions
 */
export const usePatientPaymentsDetails = (
  patientId: string,
  lastPaymentUpdatedAt?: unixTimestamp,
): IUsePatientPaymentsDetails => {
  const client = useClient();

  const {
    data: patientPaymentsDetails,
    error,
    isLoading,
    refetch,
  } = useQuery<IPatientPaymentsDetails, Error>(
    ["getPaymentDetails", patientId, lastPaymentUpdatedAt],
    () => {
      return client.payments.getPaymentDetails(patientId);
    },
    {
      enabled: !!patientId,
    },
  );

  return useMemo<IUsePatientPaymentsDetails>(
    () => ({
      patientPaymentsDetails: patientPaymentsDetails || {
        creditCards: null,
        subscriptions: null,
      },
      refetch,
      isLoading,
      error,
    }),
    [patientPaymentsDetails, refetch, isLoading, error],
  );
};
