import { useMemo } from "react";

import {
  IGroupedPatientMedicalResources,
  MedicalResourceType,
} from "next-shared/src/types/types";

import { IPatientRecordQuery } from "../../../types/TPatientRecord";
import { useSyncedPatientMedicalResources } from "../useSyncedPatientMedicalResources";

interface IPatientMetricObservations<T = IGroupedPatientMedicalResources>
  extends IPatientRecordQuery<T> {
  patientMetrics: T;
}

const resourceTypes = [
  MedicalResourceType.BloodPressure,
  MedicalResourceType.HeartRate,
  MedicalResourceType.Height,
  MedicalResourceType.Weight,
  MedicalResourceType.WaistCircumference,
];

/**
 * Hook handling fetching of patient metric observations
 */
export const usePatientMetricObservations = (
  patientId: string,
): IPatientMetricObservations => {
  const { patientMetrics, error, isLoading } = useSyncedPatientMedicalResources(
    patientId,
    resourceTypes,
  );

  return useMemo<IPatientMetricObservations>(
    () => ({
      patientMetrics,
      error,
      isLoading,
      // HACK
      refetch: null,
    }),
    [patientMetrics, error, isLoading],
  );
};
