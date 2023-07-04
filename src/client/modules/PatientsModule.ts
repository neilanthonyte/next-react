import { inject, injectable } from "inversify";

import { ISerializedPatient, Patient } from "next-shared/src/models/Patient";
import { IMedicationReminder } from "next-shared/src/types/IMedicationReminder";
import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { IPatientInvoice } from "next-shared/src/types/IPatientInvoice";
import { AxiosRequestConfig } from "axios";
import { Rating } from "next-shared/src/models/Rating";
import { PatientLetter } from "next-shared/src/models/PatientLetter";
import { PatientLabResult } from "next-shared/src/models/PatientLabResult";
import { NextLocation } from "next-shared/src/models/NextLocation";
import {
  NextInvalidTwoFactorCodeError,
  NextSessionWeakPasswordError,
  NextNoActiveConsultError,
  NextAccountLinkError,
  NextOnboardError,
} from "next-shared/src/helpers/errorTypes";
import {
  MedicalResourceType,
  PatientMedicalResource,
  FormResourceType,
  IFormResources,
} from "next-shared/src/types/types";
import { IPatientDataSectionWithStatus } from "next-shared/src/types/IPatientDataSection";
import { ClientSession as Session } from "next-shared/src/models/ClientSession";
import { ISyncMetadata } from "next-shared/src/types/ISyncMetadata";
import { EhrPatient, IEhrPatient } from "next-shared/src/models/EhrPatient";
import { IAppointmentWithDetails } from "next-shared/src/types/IAppointmentWithDetails";
import { Hcp } from "next-shared/src/models/Hcp";

import { IAuthModule } from "./AuthModule";
import {
  IHttpConnection,
  INetworkRequestArgs,
} from "../connections/HttpConnection";

interface IRetrieveSyncedPatientResponse {
  patient: ISerializedPatient;
}

export const unserializePatient = (data: IRetrieveSyncedPatientResponse) => {
  if (!data?.patient) {
    console.warn("expected patient");
    return null;
  }
  return {
    patient: Patient.unserialize(data.patient),
  };
};

interface IRetrieveSyncedEhrPatientResponse {
  ehrPatient: IEhrPatient;
}

export const unserializeEhrPatient = (
  data: IRetrieveSyncedEhrPatientResponse,
) => {
  if (!data?.ehrPatient) {
    console.warn("expected patient");
    return null;
  }
  return {
    ehrPatient: EhrPatient.unserialize(data.ehrPatient),
  };
};

export const unserializePatientAppointments = (
  appointments: IAppointmentWithDetails[],
) => {
  if (!appointments) {
    console.warn("expected appointments");
    return null;
  }
  return appointments.map((apptWithDetails) => ({
    ...apptWithDetails,
    hcp: apptWithDetails.hcp
      ? Hcp.unserialize(apptWithDetails.hcp)
      : apptWithDetails.hcp,
    location: apptWithDetails.location
      ? NextLocation.unserialize(apptWithDetails.location)
      : apptWithDetails.location,
  }));
};

export interface ITwoFactorResponse {
  // the last three digits of the mobile number that the two factor was sent to.
  mobile: string;
}
export interface ICsvResponse {
  csv: string; // the actual csv content.
}

export interface IPatientsModule {
  retrievePatient(patientId: string): Promise<null | Patient>;
  /**
   * Provides updates when core information about the patient changes.
   */
  retrieveSyncedPatient(patientId: string): ISyncMetadata<{ patient: Patient }>;
  retrieveSyncedEhrPatient(
    ehrId: string,
    ehrPatientId: string,
  ): ISyncMetadata<{ ehrPatient: EhrPatient }>;

  retrievePatientByNameDob(
    givenName: string,
    familyName: string,
    birthDate: string,
  ): Promise<null | Patient>;
  acceptTerms(patientId: string): Promise<void>;
  retrievePatientLocationByEhrId(ehrId: string): Promise<null | NextLocation>;

  registerMobilePushDevice(
    patientId: string,
    playerId: string,
    deviceName: string,
  ): Promise<void>;
  unregisterMobilePushDevice(
    patientId: string,
    playerId: string,
  ): Promise<void>;

  retrieveTourLastSeen(patientId: string): Promise<unixTimestamp>;
  touchTourLastSeen(patientId: string, lastSeen: unixTimestamp): Promise<void>;

  retrieveMedicationReminder(
    patientId: string,
    medicationId: string,
  ): Promise<IMedicationReminder>;
  updateMedicationReminder(
    patientId: string,
    medicationReminder: IMedicationReminder,
  ): Promise<void>;

  retrieveGoals(patientId: string): Promise<{ [key: string]: fhir3.Goal }>;
  setGoal(patientId: string, key: string, goal: fhir3.Goal): Promise<void>;

  retrieveMedicalResources(
    patientId: string,
    resourceTypes: MedicalResourceType[],
  ): Promise<PatientMedicalResource[]>;
  retrieveSyncedMedicalResources(
    patientId: string,
    resourceTypes: MedicalResourceType[],
  ): ISyncMetadata<PatientMedicalResource[]>;

  /**
   * Provides updates when core information about the patient appointments changes.
   */
  retrieveSyncedPatientAppointments(
    patientId: string,
  ): ISyncMetadata<IAppointmentWithDetails[]>;
  /**
   * Provides updates when core information about the ehr patient appointments changes.
   */
  retrieveSyncedEhrPatientAppointments(
    ehrId: string,
    ehrPatientId: string,
  ): ISyncMetadata<IAppointmentWithDetails[]>;

  storeMedicalResources(
    patientId: string,
    medicalResources: PatientMedicalResource[],
  ): Promise<void>;

  retrieveFormData(
    patientId: string,
    resourceTypes: FormResourceType[],
  ): Promise<IFormResources>;

  /**
   * Method storing submitted form data for the given patient
   * if a formSlug is passed, it will try to attach form detail extensions to the resources where appropriate
   *
   * @param patientId
   * @param data
   * @param formSlug
   */
  storeFormData(
    patientId: string,
    data: IFormResources,
    formSlug?: string,
  ): Promise<void>;

  acceptReviewItems(patientId: string, resourceIds: string[]): Promise<void>;
  rejectReviewItems(patientId: string, resourceIds: string[]): Promise<void>;
  sendPasswordResetToken(patientEmail: string): Promise<void>;
  sendPasswordResetTwoFactorCode(token: string): Promise<ITwoFactorResponse>;
  resetPassword(
    token: string,
    twoFactorCode: string,
    newPassword: string,
  ): Promise<void>;
  updatePassword(patientId: string, newPassword: string): Promise<void>;
  retrieveAllPatientsAsCsv(): Promise<ICsvResponse>;
  retrievePatientInvoices(patientId: string): Promise<IPatientInvoice[]>;

  retrievePatientInvoicePdf(
    patientId: string,
    invoiceId: number,
    ehrId: string,
    getRawRequestConfig?: boolean,
    getContentsInBase64?: boolean,
  ): Promise<BinaryType | AxiosRequestConfig | string>;

  retrievePatientLetters(patientId: string): Promise<PatientLetter[]>;
  retrievePatientLetterPdf(
    patientId: string,
    letterId: number,
    ehrId: string,
    getRawRequestConfig?: boolean,
    getContentsInBase64?: boolean,
  ): Promise<BinaryType | AxiosRequestConfig | string>;

  retrievePatientLabResults(patientId: string): Promise<PatientLabResult[]>;
  retrievePatientLabResult(
    patientId: string,
    resultId: number,
    ehrId: string,
  ): Promise<PatientLabResult>;
  retrievePatientLabResultPdf(
    patientId: string,
    resultId: number,
    ehrId: string,
    getRawRequestConfig?: boolean,
    getContentsInBase64?: boolean,
  ): Promise<BinaryType | AxiosRequestConfig | string>;
  releaseLabResult(
    patientId: string,
    resultId: number,
    ehrId: string,
  ): Promise<PatientLabResult[]>;
  unreleaseLabResult(
    patientId: string,
    resultId: number,
    ehrId: string,
  ): Promise<PatientLabResult[]>;

  retrievePatientDocumentPdf(
    patientId: string,
    documentId: string,
    ehrId: string,
    getRawRequestConfig: true,
    getContentsInBase64?: boolean,
  ): Promise<AxiosRequestConfig>;
  retrievePatientDocumentPdf(
    patientId: string,
    documentId: string,
    ehrId: string,
    getRawRequestConfig: false,
    getContentsInBase64?: false,
  ): Promise<BinaryType>;
  retrievePatientDocumentPdf(
    patientId: string,
    documentId: string,
    ehrId: string,
    getRawRequestConfig: false,
    getContentsInBase64: true,
  ): Promise<string>;
  retrievePatientDocumentPdf(
    patientId: string,
    documentId: string,
    ehrId: string,
    getRawRequestConfig?: boolean,
    getContentsInBase64?: boolean,
  ): Promise<BinaryType | AxiosRequestConfig | string>;

  submitRating(patientId: string, rating: Rating): Promise<void>;
  logPatientOpenedApp(patientId: string): Promise<void>;
  linkEhrAccount(inviteCode: string): Promise<Session | null>;
  unlinkEhrAccount(patientId: string, ehrId: string): Promise<Session | null>;

  retrievePatientStatus(
    ehrPatientId: string,
  ): Promise<IPatientDataSectionWithStatus[]>;

  updateEhrPatient(
    ehrPatientId: string,
    updatedFhirPatient: fhir3.Patient,
  ): Promise<void>;

  retrieveMedication(
    patientId: string,
    medicationId: string,
    ehrId: string,
  ): Promise<fhir3.MedicationRequest>;

  /**
   * standalone create next patient account, used by patient directly, not in clinic
   * e.g. from booking or patient app
   */
  createPatientAccount(
    password: string,
    patient: fhir3.Patient,
    hasConsented?: boolean,
  ): Promise<void>;

  /**
   * create next patient account using an ehr patient record
   * e.g. from patient app when entering an ehr access code to onboard
   * this method returns a newly generated session for the patient
   */
  createPatientAccountFromEhr(
    password: string,
    email: string,
    accessCode: string,
    twoFactorCode: string,
    hasConsented?: boolean,
  ): Promise<Session | void>;

  /**
   * create next patient account using an ehr patient record
   * this is specific for scopes as it will need to update the patients details in the scope session
   * and will not generate/return a new patient session
   */
  createPatientAccountFromEhrInScope(
    password: string,
    email: string,
    accessCode: string,
    twoFactorCode: string,
    hasConsented?: boolean,
  ): Promise<void>;
}

@injectable()
export class PatientsModule implements IPatientsModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
    @inject("AuthModule") protected _authModule: IAuthModule,
  ) {}

  public async retrievePatient(patientId: string): Promise<null | Patient> {
    const res = await this._httpConnection.makeRequest({
      url: `patients/${patientId}`,
      method: "get",
      allow404: true,
    });

    return res.patient ? Patient.unserialize(res.patient) : null;
  }

  public retrieveSyncedPatient(
    patientId: string,
  ): ISyncMetadata<{ patient: Patient }> {
    return {
      endpoint: "patients",
      action: "retrieveSyncedPatient",
      parameters: {
        patientId,
      },
      unseralizeData: unserializePatient,
    };
  }

  public async retrievePatientByEhrId(
    patientEhrId: string,
  ): Promise<null | Patient> {
    const res = await this._httpConnection.makeRequest({
      url: `patients-by-ehr-id/${patientEhrId}`,
      method: "get",
      allow404: true,
    });

    return res.patient ? Patient.unserialize(res.patient) : null;
  }

  public retrieveSyncedEhrPatient(
    ehrId: string,
    ehrPatientId: string,
  ): ISyncMetadata<{ ehrPatient: EhrPatient }> {
    return {
      endpoint: "patients",
      action: "retrieveSyncedEhrPatient",
      parameters: {
        ehrId,
        ehrPatientId,
      },
      unseralizeData: unserializeEhrPatient,
    };
  }

  public async retrievePatientByNameDob(
    givenName: string,
    familyName: string,
    birthDate: string,
  ): Promise<null | Patient> {
    const res = await this._httpConnection.makeRequest({
      url: `patients-by-name`,
      params: {
        givenName,
        familyName,
        birthDate,
      },
      method: "get",
      allow404: true,
    });

    return res.patient ? Patient.unserialize(res.patient) : null;
  }
  public async retrievePatientLocationByEhrId(
    ehrId: string,
  ): Promise<null | NextLocation> {
    const res = await this._httpConnection.makeRequest({
      url: `location-by-ehr-id/${ehrId}`,
      method: "get",
    });

    return res.location
      ? (NextLocation.unserialize(res.location) as NextLocation)
      : null;
  }

  public async acceptTerms(patientId: string): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `patients/${patientId}/accept-terms`,
      method: "post",
    });
  }

  public async registerMobilePushDevice(
    patientId: string,
    playerId: string,
    deviceName: string,
  ): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `patients/${patientId}/register-mobile-push-device`,
      method: "post",
      data: { playerId, deviceName },
    });
  }

  public async unregisterMobilePushDevice(
    patientId: string,
    playerId: string,
  ): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `patients/${patientId}/unregister-mobile-push-device`,
      method: "post",
      data: { playerId },
    });
  }

  public async retrieveTourLastSeen(patientId: string): Promise<unixTimestamp> {
    const res = await this._httpConnection.makeRequest({
      url: `patients/${patientId}/tour-last-seen`,
      method: "get",
    });

    return res.tourLastSeen;
  }

  public async touchTourLastSeen(
    patientId: string,
    lastSeen: unixTimestamp,
  ): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `patients/${patientId}/tour-last-seen`,
      method: "post",
      data: { lastSeen },
    });
  }

  public async retrieveMedicationReminder(
    patientId: string,
    medicationId: string,
  ): Promise<IMedicationReminder> {
    const res = await this._httpConnection.makeRequest({
      url: `patients/${patientId}/medicationReminders/${medicationId}`,
      method: "get",
    });

    return res.medicationReminder;
  }

  public async updateMedicationReminder(
    patientId: string,
    medicationReminder: IMedicationReminder,
  ): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `patients/${patientId}/medicationReminders/${medicationReminder.medicationId}`,
      method: "post",
      data: { medicationReminder },
    });
  }

  public async retrieveGoals(
    patientId: string,
  ): Promise<{ [key: string]: fhir3.Goal }> {
    const res = await this._httpConnection.makeRequest({
      url: `patients/${patientId}/goals`,
      method: "get",
    });

    return res.goals;
  }

  public async setGoal(
    patientId: string,
    key: string,
    goal: fhir3.Goal,
  ): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `patients/${patientId}/goals/${key}`,
      method: "post",
      data: { goal },
    });
  }

  public async retrieveMedicalResources(
    patientId: string,
    resourceTypes: MedicalResourceType[],
  ): Promise<PatientMedicalResource[]> {
    const res = await this._httpConnection.makeRequest({
      url: `patients/${patientId}/medical-resources`,
      method: "get",
      params: {
        resourceTypes: resourceTypes.join(","),
        groupByType: undefined,
      },
    });

    return res.medicalResources as PatientMedicalResource[];
  }

  public retrieveSyncedMedicalResources(
    patientId: string,
    resourceTypes: MedicalResourceType[],
  ): ISyncMetadata<PatientMedicalResource[]> {
    return {
      endpoint: "patients",
      action: "retrieveSyncedMedicalResources",
      parameters: {
        patientId,
        resourceTypesStr: resourceTypes.join(","),
      },
    };
  }

  public async storeMedicalResources(
    patientId: string,
    medicalResources: PatientMedicalResource[],
  ): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `patients/${patientId}/medical-resources`,
      method: "post",
      data: { medicalResources },
    });
  }

  public retrieveSyncedPatientAppointments(
    patientId: string,
  ): ISyncMetadata<IAppointmentWithDetails[]> {
    return {
      endpoint: "patients",
      action: "retrieveSyncedPatientAppointments",
      parameters: {
        patientId,
      },
      unseralizeData: unserializePatientAppointments,
    };
  }

  public retrieveSyncedEhrPatientAppointments(
    ehrId: string,
    ehrPatientId: string,
  ): ISyncMetadata<IAppointmentWithDetails[]> {
    return {
      endpoint: "patients",
      action: "retrieveSyncedEhrPatientAppointments",
      parameters: {
        ehrId,
        ehrPatientId,
      },
      unseralizeData: unserializePatientAppointments,
    };
  }

  public async retrieveFormData(
    patientId: string,
    resourceTypes: FormResourceType[],
  ): Promise<IFormResources> {
    const res = await this._httpConnection.makeRequest({
      url: `patients/${patientId}/form-data`,
      method: "get",
      params: {
        resourceTypes: resourceTypes.join(","),
      },
    });
    return res.data as IFormResources;
  }

  public async storeFormData(
    patientId: string,
    data: IFormResources,
    formSlug?: string,
  ): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `patients/${patientId}/form-data`,
      method: "post",
      data: { data, formSlug },
    });
  }

  public async acceptReviewItems(
    patientId: string,
    itemIds: string[],
  ): Promise<void> {
    try {
      await this._httpConnection.makeRequest({
        url: `patients/${patientId}/accept-review-items`,
        method: "post",
        data: { itemIds },
      });
    } catch (error) {
      if (error.message === "No available consult in Helix") {
        throw new NextNoActiveConsultError(error.message);
      }
      throw error;
    }
  }

  public async rejectReviewItems(
    patientId: string,
    itemIds: string[],
  ): Promise<void> {
    try {
      await this._httpConnection.makeRequest({
        url: `patients/${patientId}/reject-review-items`,
        method: "post",
        data: { itemIds },
      });
    } catch (error) {
      if (error.message === "No available consult in Helix") {
        throw new NextNoActiveConsultError(error.message);
      }
      throw error;
    }
  }

  public async sendPasswordResetToken(patientEmail: string): Promise<void> {
    await this._httpConnection.makeRequest({
      url: "patients-password-reset/send-token",
      method: "get",
      params: {
        email: patientEmail,
      },
    });
  }

  public async sendPasswordResetTwoFactorCode(
    token: string,
  ): Promise<ITwoFactorResponse> {
    const res = await this._httpConnection.makeRequest({
      url: "patients-password-reset/send-two-factor",
      method: "get",
      params: {
        token,
      },
    });

    return res as ITwoFactorResponse;
  }

  public async resetPassword(
    token: string,
    twoFactorCode: string,
    newPassword: string,
  ): Promise<void> {
    try {
      await this._httpConnection.makeRequest({
        url: "patients-password-reset/reset",
        method: "post",
        data: { token, twoFactorCode, newPassword },
      });
    } catch (error) {
      if (error.message === "Two factor codes do not match") {
        throw new NextInvalidTwoFactorCodeError(error.message);
      }
      throw error;
    }
  }

  public async updatePassword(
    patientId: string,
    newPassword: string,
  ): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `patients/${patientId}/update-password`,
      method: "post",
      data: { newPassword },
    });
  }

  public async retrieveAllPatientsAsCsv(): Promise<ICsvResponse> {
    return await this._httpConnection.makeRequest({
      url: "patients-export/all-patients-csv",
      method: "post",
    });
  }

  public async retrievePatientInvoices(
    patientId: string,
  ): Promise<IPatientInvoice[]> {
    const res = await this._httpConnection.makeRequest({
      url: `patients/${patientId}/invoices`,
      method: "get",
    });

    return res.invoices;
  }

  public async retrievePatientInvoicePdf(
    patientId: string,
    invoiceId: number,
    ehrId: string,
    getRawRequestConfig?: boolean,
    getContentsInBase64?: boolean,
  ): Promise<BinaryType | AxiosRequestConfig | string> {
    const requestConfig: INetworkRequestArgs = {
      url: `patients/${patientId}/invoices/${ehrId}/${invoiceId}`,
      method: "get",
      params: {
        base64: getContentsInBase64 ? "true" : "false",
      },
    };

    if (getRawRequestConfig) {
      return await this._httpConnection.getRawRequestConfig(requestConfig);
    }

    const response = await this._httpConnection.makeRequest(requestConfig);

    return response;
  }

  public async retrievePatientLetters(
    patientId: string,
  ): Promise<PatientLetter[]> {
    const res = await this._httpConnection.makeRequest({
      url: `patients/${patientId}/letters`,
      method: "get",
    });
    const letters = res.letters.map((l: PatientLetter) =>
      PatientLetter.unserialize(l),
    );
    return letters;
  }

  public async retrievePatientLetterPdf(
    patientId: string,
    letterId: number,
    ehrId: string,
    getRawRequestConfig?: boolean,
    getContentsInBase64?: boolean,
  ): Promise<BinaryType | AxiosRequestConfig | string> {
    const requestConfig: INetworkRequestArgs = {
      url: `patients/${patientId}/letters/${ehrId}/${letterId}`,
      method: "get",
      params: {
        base64: getContentsInBase64 ? "true" : "false",
      },
    };

    if (getRawRequestConfig) {
      return await this._httpConnection.getRawRequestConfig(requestConfig);
    }

    const response = await this._httpConnection.makeRequest(requestConfig);

    return response;
  }

  public async retrievePatientLabResults(
    patientId: string,
  ): Promise<PatientLabResult[]> {
    const res = await this._httpConnection.makeRequest({
      url: `patients/${patientId}/lab-results`,
      method: "get",
    });
    const results = res.labResults.map((l: PatientLabResult) =>
      PatientLabResult.unserialize(l),
    );
    return results;
  }

  public async retrievePatientLabResult(
    patientId: string,
    resultId: number,
    ehrId: string,
  ): Promise<PatientLabResult> {
    const res = await this._httpConnection.makeRequest({
      url: `patients/${patientId}/lab-results/${ehrId}/${resultId}`,
      method: "get",
    });

    return res.result ? PatientLabResult.unserialize(res.result) : null;
  }

  public async retrievePatientLabResultPdf(
    patientId: string,
    resultId: number,
    ehrId: string,
    getRawRequestConfig?: boolean,
    getContentsInBase64?: boolean,
  ): Promise<BinaryType | AxiosRequestConfig | string> {
    const requestConfig: INetworkRequestArgs = {
      url: `patients/${patientId}/lab-results/${ehrId}/${resultId}/pdf`,
      method: "get",
      params: {
        base64: getContentsInBase64 ? "true" : "false",
      },
    };

    if (getRawRequestConfig) {
      return await this._httpConnection.getRawRequestConfig(requestConfig);
    }

    const response = await this._httpConnection.makeRequest(requestConfig);

    return response;
  }

  public async releaseLabResult(
    patientId: string,
    resultId: number,
    ehrId: string,
  ): Promise<any> {
    await this._httpConnection.makeRequest({
      url: `patients/${patientId}/lab-results/${ehrId}/${resultId}/release`,
      method: "put",
    });
  }

  public async unreleaseLabResult(
    patientId: string,
    resultId: number,
    ehrId: string,
  ): Promise<any> {
    await this._httpConnection.makeRequest({
      url: `patients/${patientId}/lab-results/${ehrId}/${resultId}/unrelease`,
      method: "put",
    });
  }

  public async retrievePatientDocumentPdf(
    patientId: string,
    documentId: string,
    ehrId: string,
    getRawRequestConfig: true,
    getContentsInBase64?: boolean,
  ): Promise<AxiosRequestConfig>;
  public async retrievePatientDocumentPdf(
    patientId: string,
    documentId: string,
    ehrId: string,
    getRawRequestConfig: false,
    getContentsInBase64?: false,
  ): Promise<BinaryType>;
  public async retrievePatientDocumentPdf(
    patientId: string,
    documentId: string,
    ehrId: string,
    getRawRequestConfig: false,
    getContentsInBase64: true,
  ): Promise<string>;
  public async retrievePatientDocumentPdf(
    patientId: string,
    documentId: string,
    ehrId: string,
    getRawRequestConfig?: boolean,
    getContentsInBase64?: boolean,
  ): Promise<BinaryType | AxiosRequestConfig | string> {
    const requestConfig: INetworkRequestArgs = {
      url: `patients/${patientId}/documents/${ehrId}/${documentId}/pdf`,
      method: "get",
      params: {
        base64: getContentsInBase64 ? "true" : "false",
      },
    };

    if (getRawRequestConfig) {
      return await this._httpConnection.getRawRequestConfig(requestConfig);
    }

    const response = await this._httpConnection.makeRequest(requestConfig);

    return response;
  }

  public async submitRating(patientId: string, rating: Rating): Promise<void> {
    await rating.validate();
    await this._httpConnection.makeRequest({
      url: `patient-ratings/${patientId}`,
      method: "post",
      data: {
        rating: rating.serialize(),
      },
    });
  }

  public async logPatientOpenedApp(patientId: string): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `patients/${patientId}/opened-app-log`,
      method: "get",
    });
  }

  public async createPatientAccount(
    password: string,
    patient: fhir3.Patient,
    hasConsented?: boolean,
  ): Promise<void> {
    const res = await this._httpConnection.makeRequest({
      url: `patients/create-patient-account`,
      method: "post",
      data: {
        password,
        patient,
        hasConsented,
      },
    });

    if (res.strongPassword === false) {
      throw new NextSessionWeakPasswordError();
    }
  }

  public async createPatientAccountFromEhr(
    password: string,
    email: string,
    accessCode: string,
    twoFactorCode: string,
    hasConsented: boolean,
  ): Promise<Session | void> {
    try {
      const res = await this._httpConnection.makeRequest({
        url: `patients/create-patient-account-from-ehr`,
        method: "post",
        data: {
          password,
          email,
          accessCode,
          twoFactorCode,
          hasConsented,
        },
      });

      if (res.strongPassword === false) {
        throw new NextSessionWeakPasswordError();
      }

      if (res.session) {
        const newSession = Session.unserialize(res.session);
        return newSession;
      }
    } catch (error) {
      if (
        error.message === "Incorrect two factor auth code" ||
        error.message ===
          "The email associated to your account is already in use." ||
        error.message === "Two factor code has expired"
      ) {
        throw new NextOnboardError(error.message);
      }
      // otherwise re-throw
      throw error;
    }
  }

  public async createPatientAccountFromEhrInScope(
    password: string,
    email: string,
    accessCode: string,
    twoFactorCode: string,
    hasConsented: boolean,
  ): Promise<void> {
    try {
      const res = await this._httpConnection.makeRequest({
        url: `patients/create-patient-account-from-ehr-in-scope`,
        method: "post",
        data: {
          password,
          email,
          accessCode,
          twoFactorCode,
          hasConsented,
        },
      });

      if (res.strongPassword === false) {
        throw new NextSessionWeakPasswordError();
      }
    } catch (error) {
      if (
        error.message === "Incorrect two factor auth code" ||
        error.message ===
          "The email associated to your account is already in use." ||
        error.message === "Two factor code has expired"
      ) {
        throw new NextOnboardError(error.message);
      }
      // otherwise re-throw
      throw error;
    }
  }

  public async linkEhrAccount(inviteCode: string): Promise<Session | null> {
    const res = await this._httpConnection.makeRequest({
      url: `patients/link-ehr-account`,
      method: "post",
      data: {
        inviteCode,
      },
    });

    // error could be a mismatch in patient entered / patient ehr identifiers
    // e.g. different name, different dob (identifiers)
    if (res.matchError) {
      throw new NextAccountLinkError(
        "The details in your Next Practice account do not match the ones in your clinic record. Please contact your clinic for assistance.",
      );
    }

    if (res.phoneMismatch) {
      throw new NextAccountLinkError(
        "The phone number in your Next Practice account does not match the one in your clinic record. Please contact your clinic for assistance.",
      );
    }

    const newSession = res.session ? Session.unserialize(res.session) : null;
    return newSession;
  }

  public async unlinkEhrAccount(
    patientId: string,
    ehrId: string,
  ): Promise<Session | null> {
    const res = await this._httpConnection.makeRequest({
      url: `patients/unlink-ehr-account`,
      method: "post",
      data: {
        patientId,
        ehrId,
      },
    });

    const newSession = res.session ? Session.unserialize(res.session) : null;
    return newSession;
  }

  // TODO: I reckon these next two can stay as-is for now (to keep the project rolling), but we should
  // think about a different controller path/method for ehrPatientId (as opposed to Next patientId), since we're
  // sort of breaking the RESTful contract here (different entities using the same 'patient' path, and
  // the patientEhrId is an incomplete/ambiguous ref without a stateful staffmember session to define ehrId,
  // server-side)

  public async retrievePatientStatus(
    patientEhrId: string,
  ): Promise<IPatientDataSectionWithStatus[]> {
    const res = await this._httpConnection.makeRequest({
      url: `patients/${patientEhrId}/status`,
      method: "get",
    });

    return res.dataSections;
  }

  public async updateEhrPatient(
    patientEhrId: string,
    updatedFhirPatient: fhir3.Patient,
  ): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `patients/${patientEhrId}/update-ehr-patient`,
      method: "post",
      data: { updatedFhirPatient },
    });
  }

  public async retrieveMedication(
    patientId: string,
    medicationId: string,
    ehrId: string,
  ): Promise<fhir3.MedicationRequest> {
    const res = await this._httpConnection.makeRequest({
      url: `patients/${patientId}/medications/${ehrId}/${medicationId}`,
      method: "get",
    });
    return res.medication;
  }
}
