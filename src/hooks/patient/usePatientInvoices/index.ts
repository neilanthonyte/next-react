import { useMemo } from "react";
import { useQuery } from "react-query";

import { IPatientInvoice } from "next-shared/src/types/IPatientInvoice";

import { useClient } from "../../useClient";
import { IPatientRecordQuery } from "../../../types/TPatientRecord";

export interface IFetchPatientInvoices<T = IPatientInvoice[]>
  extends IPatientRecordQuery<T> {
  patientInvoices: T;
}

export const usePatientInvoices = (
  patientId: string,
): IFetchPatientInvoices => {
  const client = useClient();

  const {
    data: patientInvoices,
    error,
    isLoading,
    refetch,
  } = useQuery<IPatientInvoice[], Error>(
    ["retrievePatientInvoices", patientId],
    () => {
      return client.patients.retrievePatientInvoices(patientId);
    },
    {
      enabled: !!patientId,
    },
  );

  const sortedInvoices = useMemo(() => {
    if (!patientInvoices || !Array.isArray(patientInvoices)) return null;
    return patientInvoices.sort(
      (a, b) => b.transactionDate - a.transactionDate,
    );
  }, [patientInvoices]);

  return useMemo(
    () => ({
      patientInvoices: sortedInvoices,
      refetch,
      isLoading,
      error,
    }),
    [sortedInvoices, refetch, isLoading, error],
  );
};
