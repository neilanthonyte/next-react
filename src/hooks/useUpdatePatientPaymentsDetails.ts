import { useMemo } from "react";
import { useMutation } from "react-query";

import { NextClient } from "../client/NextClient";
import { useClient } from "../hooks/useClient";

export interface IUpdatePatientPaymentsDetails {
  isLoading: boolean;
  error: Error | null;
  mutate: (paymentToken: string) => Promise<void>;
}

export const useUpdatePatientPaymentsDetails = (
  patientId: string,
): IUpdatePatientPaymentsDetails => {
  const client = useClient();

  const [mutate, { isLoading, error }] = useMutation<void, Error>(
    (paymentToken: string) => {
      if (!patientId || !paymentToken) return;
      return client.payments.setPaymentMethod(patientId, paymentToken);
    },
  );

  return useMemo(
    () => ({
      isLoading,
      error,
      mutate,
    }),
    [isLoading, error, mutate],
  );
};
