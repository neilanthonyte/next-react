import { useMemo } from "react";

import { fhirUtil } from "next-shared/src/fhirUtil";

import { usePatientMedications } from "../usePatientMedications";

interface IUsePatientMedication {
  patientMedication: fhir3.MedicationRequest;
  isLoading: boolean;
  error: Error;
  refetch: () => Promise<fhir3.MedicationRequest[]>;
}

/**
 * Hook retrieving specific patient medication in privided ehr
 *
 * this hook uses the usePatientMedications hook for fetch request and filter based on parameters
 */
export const usePatientMedication = (
  patientId: string,
  medicationId: string,
  ehrId: string,
): IUsePatientMedication => {
  const { patientMedications, ...rest } = usePatientMedications(patientId);

  const patientMedication = useMemo(() => {
    return (patientMedications || []).find((med) => {
      const medicationSourceEhrId = fhirUtil(med).getOriginEhrId();
      return med.id === medicationId && medicationSourceEhrId === ehrId;
    });
  }, [patientMedications, ehrId, medicationId]);

  return useMemo<IUsePatientMedication>(
    () => ({
      patientMedication,
      ...rest,
    }),
    [patientMedication, rest],
  );
};
