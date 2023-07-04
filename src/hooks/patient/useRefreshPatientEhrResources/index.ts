import { useMemo } from "react";

import { usePatientInvoices } from "../usePatientInvoices";

/**
 * Hook exposing direct ehr refetch methods (not action driven)
 * e.g. invoices
 */
export const useRefreshPatientEhrResources = (
  patientId: string,
): Array<() => Promise<any>> => {
  const { refetch: refetchPatientInvoices } = usePatientInvoices(patientId);

  return useMemo(() => {
    return [refetchPatientInvoices];
  }, [refetchPatientInvoices]);
};
