import {
  IGroupedPatientMedicalResources,
  IGroupedObservations,
  MedicalResourceType,
} from "next-shared/src/types/types";
import {
  IPatientRecordContextMedications,
  IPatientRecordQuery,
} from "./TPatientRecord";

export interface IPatientMedicalResources<T = IGroupedPatientMedicalResources>
  extends IPatientRecordQuery<T> {
  patientAllMedicalResources: IGroupedPatientMedicalResources;
  patientObservations: IGroupedObservations;
  patientSubmittedInformation: IGroupedPatientMedicalResources;
  patientMetrics: T;
  patientMedications: IPatientRecordContextMedications;
  patientGoals: fhir3.Goal[];
  patientInstructions: fhir3.Observation[];
  patientLifestyle: T;
}

export const resourceList = [
  MedicalResourceType.MedicationRequest,
  MedicalResourceType.Smoking,
  MedicalResourceType.Alcohol,
  // TODO:
  // MedicalResourceType.Nutrition,
  // MedicalResourceType.PhysicalActivity,
  MedicalResourceType.BloodPressure,
  MedicalResourceType.HeartRate,
  MedicalResourceType.Height,
  MedicalResourceType.Weight,
  MedicalResourceType.WaistCircumference,
  MedicalResourceType.NoteToPatient,
  MedicalResourceType.Goal,
  // Reasons for visit and onboarding
  MedicalResourceType.ReasonForVisit,
  MedicalResourceType.OnboardingForm,
  MedicalResourceType.PatientForm,
];
