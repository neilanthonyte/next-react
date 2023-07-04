import { useMemo } from "react";
import { useQuery } from "react-query";

import { MedicalResourceType } from "next-shared/src/types/types";

import { useClient } from "../../useClient";
import { useSyncedPatientMedicalResources } from "../useSyncedPatientMedicalResources";

interface IPatientMedications {
  patientMedications: fhir3.MedicationRequest[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<fhir3.MedicationRequest[]>;
}

/**
 * Hook handling fetching of patient medications
 */
export const usePatientMedications = (
  patientId: string,
): IPatientMedications => {
  const { patientMedications } = useSyncedPatientMedicalResources(patientId, [
    MedicalResourceType.MedicationRequest,
  ]);

  return useMemo<IPatientMedications>(
    () => ({
      patientMedications: patientMedications?.all,
      // HACK
      error: null,
      isLoading: null,
      refetch: null,
    }),
    [patientMedications],
  );
};
