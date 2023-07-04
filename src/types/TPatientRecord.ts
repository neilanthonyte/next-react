import { PatientLetter } from "next-shared/src/models/PatientLetter";
import { IPatientInvoice } from "next-shared/src/types/IPatientInvoice";
import { IGroupedPatientMedicalResources } from "next-shared/src/types/types";
import { IPatientPaymentsDetails } from "next-shared/src/types/IPatientPaymentDetails";
import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { PatientLabResult } from "next-shared/src/models/PatientLabResult";
import { IAppointmentWithDetails } from "next-shared/src/types/IAppointmentWithDetails";

export interface IPatientRecordQuery<T> {
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<T | void>;
}

export type TPatientRecord =
  | "patientMedications"
  | "patientAppointments"
  | "patientSubmittedInformation"
  | "patientLifestyle"
  | "patientGoals"
  | "patientInvoices"
  | "patientLetters"
  | "patientLabResults"
  | "patientMetrics"
  | "patientInstructions"
  | "patientPaymentsDetails";

export type TPatientRecordErrors = TPatientRecord;

export interface IPatientRecordReturnTypes {
  patientMedications: Promise<IGroupedPatientMedicalResources | void>;
  patientAppointments: Promise<IAppointmentWithDetails[] | void>;
  patientGoals: Promise<IGroupedPatientMedicalResources | void>;
  patientInvoices: Promise<IPatientInvoice[] | void>;
  patientLetters: Promise<PatientLetter[] | void>;
  patientLabResults: Promise<PatientLabResult[] | void>;
  patientMetrics: Promise<IGroupedPatientMedicalResources | void>;
  patientSubmittedInformation: Promise<IGroupedPatientMedicalResources | void>;
  patientLifestyle: Promise<IGroupedPatientMedicalResources | void>;
  patientInstructions: Promise<IGroupedPatientMedicalResources | void>;
  patientPaymentsDetails: Promise<IPatientPaymentsDetails | void>;
}

export interface IPatientRecordContextMedications {
  all: fhir3.MedicationRequest[] | null;
  active: fhir3.MedicationRequest[] | null;
  past: fhir3.MedicationRequest[] | null;
}

export interface IPatientRecordContextAppointments {
  all: IAppointmentWithDetails[] | null;
  past: IAppointmentWithDetails[] | null;
  upcoming: IAppointmentWithDetails[] | null;
}

export interface IPatientRecord {
  patientAllMedicalResources: IGroupedPatientMedicalResources;
  patientObservations: IGroupedPatientMedicalResources;
  patientMedications: IPatientRecordContextMedications;
  patientAppointments: IPatientRecordContextAppointments;
  patientGoals: fhir3.Goal[];
  patientInvoices: IPatientInvoice[];
  patientLetters: PatientLetter[];
  patientLabResults: PatientLabResult[];
  patientMetrics: IGroupedPatientMedicalResources;
  patientInstructions: fhir3.Observation[];
  patientRecordLastFetch: unixTimestamp;
  patientSubmittedInformation: IGroupedPatientMedicalResources;
  patientLifestyle: IGroupedPatientMedicalResources;
  patientPaymentsDetails: IPatientPaymentsDetails;
}
