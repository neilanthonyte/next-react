import { useMemo } from "react";

import {
  IGroupedPatientMedicalResources,
  MedicalResourceType,
} from "next-shared/src/types/types";

import { IPatientRecordQuery } from "../../../types/TPatientRecord";
import { useSyncedPatientMedicalResources } from "../useSyncedPatientMedicalResources";

interface IPatientLifestyleObservations<T = IGroupedPatientMedicalResources>
  extends IPatientRecordQuery<T> {
  patientLifestyle: T;
}

const lifestyleResources = [
  MedicalResourceType.Smoking,
  MedicalResourceType.Alcohol,
];

/**
 * Hook handling fetching of patient lifestyle observations
 */
export const usePatientLifestyleObservations = (
  patientId: string,
): IPatientLifestyleObservations => {
  const { patientLifestyle } = useSyncedPatientMedicalResources(
    patientId,
    lifestyleResources,
  );

  return useMemo<IPatientLifestyleObservations>(
    () => ({
      patientLifestyle,
      error: null,
      isLoading: false,
      refetch: null,
    }),
    [patientLifestyle], //, error, isLoading, refetch],
  );
};
