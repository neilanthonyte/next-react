import { useMemo } from "react";
import { useQuery } from "react-query";

import { PatientLabResult } from "next-shared/src/models/PatientLabResult";

import { useClient } from "../../useClient";
import { IPatientRecordQuery } from "../../../types/TPatientRecord";

export interface IFetchPatientLabResults<T = PatientLabResult[]>
  extends IPatientRecordQuery<T> {
  patientLabResults: T;
}

export const usePatientLabResults = (
  patientId: string,
): IFetchPatientLabResults => {
  const client = useClient();

  const {
    data: patientLabResults,
    error,
    isLoading,
    refetch,
  } = useQuery<PatientLabResult[], Error>(
    ["retrievePatientLabResults", patientId],
    () => {
      return client.patients.retrievePatientLabResults(patientId);
    },
    { enabled: !!patientId },
  );

  return useMemo<IFetchPatientLabResults>(
    () => ({
      patientLabResults: patientLabResults || null,
      refetch,
      isLoading,
      error,
    }),
    [patientLabResults, refetch, isLoading, error],
  );
};
