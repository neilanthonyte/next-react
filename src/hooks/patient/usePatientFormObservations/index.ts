import { useMemo } from "react";

import { MedicalResourceType } from "next-shared/src/types/types";

import { IPatientRecordQuery } from "../../../types/TPatientRecord";
import { useSyncedPatientMedicalResources } from "../useSyncedPatientMedicalResources";

interface IPatientFormObservations<T = fhir3.Observation[]>
  extends IPatientRecordQuery<T> {
  patientForms: T;
}

/**
 * Hook handling fetching of patient submitted forms observations
 */
export const usePatientFormObservations = (
  patientId: string,
): IPatientFormObservations => {
  const { patientObservations } = useSyncedPatientMedicalResources(patientId, [
    MedicalResourceType.PatientForm,
  ]);

  return useMemo<IPatientFormObservations>(
    () => ({
      patientForms: patientObservations?.[MedicalResourceType.PatientForm],
      error: null,
      isLoading: false,
      refetch: null,
    }),
    [patientObservations], //, error, isLoading, refetch],
  );
};
