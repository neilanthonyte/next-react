import { useMemo } from "react";
import moment from "moment";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { Patient } from "next-shared/src/models/Patient";
import { filterByLastSubmittedObservation } from "next-shared/src/helpers/filterByLastSubmittedObservation";
import { groupMedicalResources } from "next-shared/src/helpers/groupMedicalResources";
import {
  IGroupedObservations,
  IGroupedPatientMedicalResources,
  MedicalResourceType,
  supportedResourceTypes,
} from "next-shared/src/types/types";

import { useCachedSyncedData } from "../../core/useCachedSyncedData";
import { useClient } from "../../useClient";
import { IPatientRecordContextMedications } from "../../../types/TPatientRecord";
import { IPatientMedicalResources } from "../../../types/IPatientMedicalResources";

// interface IUseSyncedPatientMedicalResources {
//   resources: IPatientMedicalResources;
//   isLoading: boolean;
//   error: Error | null;
// }

/**
 * Provides a syncronised patient that automatically updates when altered remotely.
 */
export const useSyncedPatientMedicalResources = (
  patientId: string,
  resourceTypes: MedicalResourceType[] = supportedResourceTypes,
): IPatientMedicalResources => {
  const client = useClient();

  // must explicitly name each of the options as dependency to ensure useMemo's equality check.
  const patientsSyncMetadata = useMemo(() => {
    if (!patientId || !resourceTypes) return;

    return client.patients.retrieveSyncedMedicalResources(
      patientId,
      // this will cause all sub-hooks (e.g. usePatientMetrics) to use the same socket connection,
      // which in turn should avoid asking the server to fetch the resource several times over
      supportedResourceTypes, // resourceTypes,
    );
  }, [patientId, resourceTypes]);

  const { data: patientMedicalResourcesList, error } =
    useCachedSyncedData(patientsSyncMetadata);
  const patientMedicalResources: IGroupedPatientMedicalResources =
    groupMedicalResources(patientMedicalResourcesList, resourceTypes);

  const patientMetrics = useMemo(() => {
    if (!patientMedicalResources || !patientId) {
      return null;
    }
    return {
      [MedicalResourceType.BloodPressure]:
        patientMedicalResources[MedicalResourceType.BloodPressure],
      [MedicalResourceType.Weight]:
        patientMedicalResources[MedicalResourceType.Weight],
      [MedicalResourceType.HeartRate]:
        patientMedicalResources[MedicalResourceType.HeartRate],
      [MedicalResourceType.Height]:
        patientMedicalResources[MedicalResourceType.Height],
      [MedicalResourceType.WaistCircumference]:
        patientMedicalResources[MedicalResourceType.WaistCircumference],
    };
  }, [patientMedicalResources, patientId]);

  const patientSubmittedInformation: IGroupedObservations = useMemo(() => {
    if (!patientMedicalResources || !patientId) {
      return null;
    }
    return {
      [MedicalResourceType.ReasonForVisit]:
        patientMedicalResources[MedicalResourceType.ReasonForVisit],
      [MedicalResourceType.OnboardingForm]:
        patientMedicalResources[MedicalResourceType.OnboardingForm],
      [MedicalResourceType.PatientForm]:
        patientMedicalResources[MedicalResourceType.PatientForm],
    };
  }, [patientMedicalResources, patientId]);

  const patientMedications: IPatientRecordContextMedications =
    useMemo<IPatientRecordContextMedications>(() => {
      if (
        !patientMedicalResources ||
        !patientMedicalResources[MedicalResourceType.MedicationRequest] ||
        !patientId
      ) {
        return { all: null, active: null, past: null };
      }
      const medications = patientMedicalResources[
        MedicalResourceType.MedicationRequest
      ] as fhir3.MedicationRequest[];

      const sortedMedications = medications.sort(
        (a, b) =>
          moment(b.meta.lastUpdated, moment.ISO_8601).unix() -
          moment(a.meta.lastUpdated, moment.ISO_8601).unix(),
      );
      const activeMedications = sortedMedications.filter(
        (m) => m.status === "active",
      );
      const pastMedications = sortedMedications.filter(
        (m) => m.status !== "active",
      );

      return {
        all: sortedMedications,
        active: activeMedications,
        past: pastMedications,
      };
    }, [patientMedicalResources, patientId]);

  const patientGoals = useMemo(() => {
    if (!patientMedicalResources || !patientId) return null;
    return patientMedicalResources[MedicalResourceType.Goal] as fhir3.Goal[];
  }, [patientMedicalResources, patientId]);

  const patientInstructions: fhir3.Observation[] = useMemo(() => {
    if (
      !patientMedicalResources ||
      !patientMedicalResources[MedicalResourceType.NoteToPatient] ||
      !patientId
    )
      return null;
    const patientNotes =
      patientMedicalResources[MedicalResourceType.NoteToPatient];
    // sort by unix creation date
    const sortedInstructions = patientNotes.sort((a, b) => {
      const aFhirResource = fhirUtil(a);
      const bFhirResource = fhirUtil(b);
      const aTime = aFhirResource.getCreationDate();
      const bTime = bFhirResource.getCreationDate();
      return bTime - aTime;
    });
    return sortedInstructions;
  }, [patientMedicalResources, patientId]);

  const patientLifestyle = useMemo(() => {
    if (!patientMedicalResources || !patientId) return null;
    const hasSmoking = !!patientMedicalResources[MedicalResourceType.Smoking];
    const hasAlcohol = !!patientMedicalResources[MedicalResourceType.Alcohol];
    return {
      [MedicalResourceType.Smoking]: hasSmoking
        ? filterByLastSubmittedObservation(
            patientMedicalResources[
              MedicalResourceType.Smoking
            ] as fhir3.Observation[],
          )
        : undefined,
      [MedicalResourceType.Alcohol]: hasAlcohol
        ? filterByLastSubmittedObservation(
            patientMedicalResources[
              MedicalResourceType.Alcohol
            ] as fhir3.Observation[],
          )
        : undefined,
    };
  }, [patientMedicalResources, patientId]);

  const resources = useMemo(() => {
    const patientObservations: IGroupedObservations = {
      ...patientMetrics,
      ...patientLifestyle,
      ...patientSubmittedInformation,
    };
    return {
      patientAllMedicalResources: patientMedicalResources || null,
      patientObservations,
      patientSubmittedInformation,
      patientMetrics,
      patientMedications,
      patientGoals,
      patientInstructions,
      patientLifestyle,
      refetch: null,
      error,
      isLoading:
        !!patientId && !!(error || patientMedicalResourcesList === undefined),
    };
  }, [
    patientMedicalResources,
    patientSubmittedInformation,
    patientMetrics,
    patientMedications,
    patientGoals,
    patientInstructions,
    patientLifestyle,
    error,
  ]);

  return resources;
};
