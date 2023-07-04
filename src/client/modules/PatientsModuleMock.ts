import moment from "moment";
import * as uuid from "uuid";
import { inject, injectable } from "inversify";
import { AxiosRequestConfig } from "axios";
import * as faker from "faker";

import { Patient } from "next-shared/src/models/Patient";
import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { IMedicationReminder } from "next-shared/src/types/IMedicationReminder";
import { IPatientInvoice } from "next-shared/src/types/IPatientInvoice";
import { Rating } from "next-shared/src/models/Rating";
import { PatientLetter } from "next-shared/src/models/PatientLetter";
import { PatientLabResult } from "next-shared/src/models/PatientLabResult";
import { mockPatientNoAssociation } from "next-shared/src/mockData/mockPatients";
import { mockLetters } from "next-shared/src/mockData/mockLetters";
import { mockLabResults } from "next-shared/src/mockData/mockLabResults";
import { mockFormData } from "next-shared/src/mockData/mockFormData";
import { mockMedicationRequests } from "next-shared/src/mockData/mockFhirPatientResources";
import { fhirUtil } from "next-shared/src/fhirUtil";
import { NextLocation } from "next-shared/src/models/NextLocation";
import { mockNextLocations } from "next-shared/src/mockData/mockLocations";
import { ClientSession as Session } from "next-shared/src/models/ClientSession";
import {
  NextSessionWeakPasswordError,
  NotFoundError,
} from "next-shared/src/helpers/errorTypes";
import { cloneModelObject } from "next-shared/src/helpers/cloneModelObject";
import {
  PatientMedicalResource,
  MedicalResourceType,
  FormResourceType,
  IFormResources,
} from "next-shared/src/types/types";
import { IPatientDataSectionWithStatus } from "next-shared/src/types/IPatientDataSection";
import { FhirPatientUtil } from "next-shared/src/fhirUtil/utilClasses/FhirPatientUtil";
import { getPatientDataSectionsUpdates } from "next-shared/src/helpers/getPatientDataSectionsUpdates";
import {
  patientLastRecordSyncUrl,
  patientLastRecordUpdateUrl,
} from "next-shared/src/helpers/constants";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { ISyncMetadata } from "next-shared/src/types/ISyncMetadata";
import { EhrPatient } from "next-shared/src/models/EhrPatient";
import { generatePatientSession } from "next-shared/src/mockData/generatePatientSession";
import { IAppointmentWithDetails } from "next-shared/src/types/IAppointmentWithDetails";

import { delay } from "../../helpers/delay";
import { AuthModule } from "../modules/AuthModule";
import {
  IPatientsModule,
  ITwoFactorResponse,
  ICsvResponse,
} from "./PatientsModule";
import { ScopesModule } from "./ScopesModule";
import { MockDataCacheModule } from "./MockDataCacheModule";
import { SYNC_DATA } from "../../types/sync";

@injectable()
export class MockPatientsModule implements IPatientsModule {
  private tourLastSeen: unixTimestamp;

  constructor(
    @inject("AuthModule") private _authModule: AuthModule,
    @inject("ScopesModule") private _scopesModule: ScopesModule,
    @inject("MockDataCacheModule")
    private _mockDataCacheModule: MockDataCacheModule,
  ) {
    this.tourLastSeen = moment().subtract(3, "days").unix();
  }

  public async retrievePatient(patientId: string): Promise<null | Patient> {
    return null;
  }

  public async retrievePatientByNameDob(
    givenName: string,
    familyName: string,
    birthDate: string,
  ): Promise<null | Patient> {
    return null;
  }

  public async acceptTerms(patientId: string): Promise<void> {
    const { emitter, data: patient } =
      this._mockDataCacheModule.findPatient(patientId);
    if (!patient) {
      console.error("unable to find patient", patientId);
      return;
    }
    patient.hasAcceptedLatestTerms = true;
    emitter.emit(SYNC_DATA, { patient: cloneModelObject(patient) });
  }

  public async retrievePatientLocationByEhrId(
    ehrId: string,
  ): Promise<null | NextLocation> {
    return mockNextLocations[0];
  }

  public async registerMobilePushDevice(
    patientId: string,
    playerId: string,
    deviceName: string,
  ): Promise<void> {
    return null;
  }

  public async unregisterMobilePushDevice(
    patientId: string,
    playerId: string,
  ): Promise<void> {
    return null;
  }

  public async retrieveTourLastSeen(patientId: string): Promise<unixTimestamp> {
    await delay(1000);
    return this.tourLastSeen;
  }

  public async touchTourLastSeen(
    patientId: string,
    lastSeen: unixTimestamp,
  ): Promise<void> {
    await delay(1000);
    this.tourLastSeen = lastSeen;
  }

  public async retrieveMedicationReminder(
    patientId: string,
    medicationId: string,
  ): Promise<IMedicationReminder> {
    return null;
  }

  public async updateMedicationReminder(
    patientId: string,
    medicationReminder: IMedicationReminder,
  ): Promise<void> {
    return null;
  }

  public async retrieveGoals(
    patientId: string,
  ): Promise<{ [key: string]: fhir3.Goal }> {
    return null;
  }

  public async setGoal(
    patientId: string,
    key: string,
    goal: fhir3.Goal,
  ): Promise<void> {
    return null;
  }

  public async retrieveMedicalResources(
    patientId: string,
    resourceTypes: MedicalResourceType[],
  ): Promise<PatientMedicalResource[]> {
    await delay(1000);
    const mockDataCacheResources =
      this._mockDataCacheModule.getPatientMedicalResources(
        patientId,
        resourceTypes,
      );

    return mockDataCacheResources.data;
  }

  public async storeMedicalResources(
    patientId: string,
    medicalResources: PatientMedicalResource[],
  ): Promise<void> {
    // add id to be able to delete
    const resourcesWithId = medicalResources.map((res) => {
      res.id = uuid.v4();
      return res;
    });

    this._mockDataCacheModule.storePatientMedicalResources(
      patientId,
      resourcesWithId,
    );
  }

  public async retrieveFormData(
    patientId: string,
    resourceTypes: FormResourceType[],
  ): Promise<IFormResources> {
    const data = mockFormData[0];

    // prefill from the specified patient
    const { data: patient } = this._mockDataCacheModule.findPatient(patientId);
    if (patient?.fhir) {
      data.Patient = patient?.fhir;
    }

    // HACK - no longer prefilling Reason For Visit observation from form data.
    if (data) {
      delete data["observation:ReasonForVisit"];
    }
    // TODO filter by FormResourceType

    return data;
  }

  public async storeFormData(
    patientId: string,
    data: IFormResources,
    formSlug: string,
  ): Promise<void> {
    await delay(2000);
    return;
  }

  public async acceptReviewItems(
    patientId: string,
    itemIds: string[],
  ): Promise<void> {
    await delay(1000);

    throw new Error("Not implemented");
    // TODO reimplement using this._mockDataCacheModule and fixing review extensions

    // old code
    // patientMedicalResources = patientMedicalResources.filter(
    //   (mr) => itemIds.includes(mr.id) === false,
    // );
  }

  public async rejectReviewItems(
    patientId: string,
    itemIds: string[],
  ): Promise<void> {
    await delay(1000);

    throw new Error("Not implemented");
    // TODO reimplement using this._mockDataCacheModule and fixing review extensions

    // old code
    // patientMedicalResources = patientMedicalResources.filter(
    //   (mr) => itemIds.includes(mr.id) === false,
    // );
  }

  public async sendPasswordResetToken(patientEmail: string): Promise<void> {
    return null;
  }

  public async sendPasswordResetTwoFactorCode(
    token: string,
  ): Promise<ITwoFactorResponse> {
    return null;
  }

  public async resetPassword(
    token: string,
    twoFactorCode: string,
    newPassword: string,
  ): Promise<void> {
    return null;
  }

  public async updatePassword(
    patientId: string,
    newPassword: string,
  ): Promise<void> {
    return null;
  }

  public async retrieveAllPatientsAsCsv(): Promise<ICsvResponse> {
    return null;
  }

  public async retrievePatientInvoices(
    patientId: string,
  ): Promise<IPatientInvoice[]> {
    return [];
  }

  public async retrievePatientInvoicePdf(
    patientId: string,
    invoiceId: number,
    ehrId: string,
    getRawRequestConfig?: boolean,
    getContentsInBase64?: boolean,
  ): Promise<BinaryType | AxiosRequestConfig | string> {
    return null;
  }

  public async retrievePatientLetters(
    patientId: string,
  ): Promise<PatientLetter[]> {
    const { data: patient } = this._mockDataCacheModule.findPatient(patientId);
    return mockLetters.filter(
      (l: PatientLetter) =>
        l.patientEhrId == patient.ehrPatients[0].ehrPatientId,
    );
  }

  public async retrievePatientLabResults(
    patientId: string,
  ): Promise<PatientLabResult[]> {
    const { data: patient } = this._mockDataCacheModule.findPatient(patientId);
    return mockLabResults.filter(
      (l: PatientLabResult) =>
        l.patientEhrId == patient.ehrPatients[0].ehrPatientId,
    );
  }

  public async retrievePatientLetter(
    patientId: string,
    letterId: number,
    ehrId: string,
  ): Promise<PatientLetter> {
    const letters: PatientLetter[] = await this.retrievePatientLetters(
      patientId,
    );
    return letters.find(
      (l: PatientLetter) => l.id == letterId && l.ehrId == ehrId,
    );
  }

  public async retrievePatientLabResult(
    patientId: string,
    resultId: number,
    ehrId: string,
  ): Promise<PatientLabResult> {
    const results: PatientLabResult[] = await this.retrievePatientLabResults(
      patientId,
    );
    return results.find(
      (l: PatientLabResult) => l.id == resultId && l.ehrId == ehrId,
    );
  }

  public async releaseLabResult(
    patientId: string,
    resultId: number,
    ehrId: string,
  ): Promise<any> {
    const labResult = mockLabResults.find(
      (l: PatientLabResult) => l.id == resultId && l.ehrId == ehrId,
    );
    labResult.released = moment().unix();

    // mock delay to show loading states.
    await delay(1000);
    return labResult;
  }

  public async unreleaseLabResult(
    patientId: string,
    resultId: number,
    ehrId: string,
  ): Promise<any> {
    const labResult = mockLabResults.find(
      (l: PatientLabResult) => l.id == resultId && l.ehrId == ehrId,
    );
    labResult.released = false;

    // mock delay to show loading states
    await delay(1000);
    return labResult;
  }

  public async retrievePatientLetterPdf(
    patientId: string,
    letterId: number,
    ehrId: string,
    getRawRequestConfig?: boolean,
    getContentsInBase64?: boolean,
  ): Promise<BinaryType | AxiosRequestConfig | string> {
    return null;
  }

  public async retrievePatientLabResultPdf(
    patientId: string,
    resultId: number,
    ehrId: string,
    getRawRequestConfig?: boolean,
    getContentsInBase64?: boolean,
  ): Promise<BinaryType | AxiosRequestConfig | string> {
    return null;
  }

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
  public async retrievePatientDocumentPdf(
    patientId: string,
    documentId: string,
    ehrId: string,
    getRawRequestConfig?: boolean,
    getContentsInBase64?: boolean,
  ): Promise<BinaryType | AxiosRequestConfig | string> {
    console.warn("Document pdf not available in mock client");
    return null;
  }

  public async submitRating(patientId: string, rating: Rating): Promise<void> {
    return null;
  }

  public async logPatientOpenedApp(patientId: string): Promise<void> {
    return null;
  }

  public async createPatientAccount(
    password: string,
    patient: fhir3.Patient,
  ): Promise<void> {
    if (password.length <= 8) {
      throw new NextSessionWeakPasswordError();
    }
    await this._mockDataCacheModule.createPatient(patient);
  }

  public async createPatientAccountFromEhr(
    password: string,
    email: string,
    accessCode: string,
    twoFactorCode: string,
  ): Promise<Session | void> {
    await delay(1000);
    if (password.length <= 8) {
      throw new NextSessionWeakPasswordError();
    }

    const { data: ehrPatient, emitter: ehrPatientEmitter } =
      this._mockDataCacheModule.findEhrPatientByAccessCode(accessCode);

    // create patient not in mockPatients list
    const { data: newNextPatient } =
      await this._mockDataCacheModule.createPatient(
        mockPatientNoAssociation.fhir,
      );

    newNextPatient.ehrPatients.push({
      ...ehrPatient.association,
      patientId: newNextPatient.patientId,
      linkedAt: currentUnixTimestamp(),
      twoFactorCode: null,
      twoFactorCodeExpiry: null,
    });
    // mock hard link for the ehrPatient
    ehrPatient.association.patientId = newNextPatient.patientId;

    // emit event for ehr patient with new link
    ehrPatientEmitter.emit(SYNC_DATA, { ehrPatient });

    // generate new patient session
    const newSession = await generatePatientSession({
      fhirPatient: newNextPatient.fhir,
    });
    return newSession;
  }

  public async createPatientAccountFromEhrInScope(
    password: string,
    email: string,
    accessCode: string,
    twoFactorCode: string,
  ): Promise<void> {
    await delay(1000);

    const scopeId = this._authModule.session?.app?.scopeId;
    if (!scopeId) {
      throw new Error("Expected an app session");
    }

    if (password.length <= 8) {
      throw new NextSessionWeakPasswordError();
    }

    const { data: ehrPatient, emitter: ehrPatientEmitter } =
      this._mockDataCacheModule.findEhrPatientByAccessCode(accessCode);

    // create patient not in mockPatients list
    const { data: newNextPatient } =
      await this._mockDataCacheModule.createPatient(
        mockPatientNoAssociation.fhir,
      );

    newNextPatient.ehrPatients.push({
      ...ehrPatient.association,
      patientId: newNextPatient.patientId,
      linkedAt: currentUnixTimestamp(),
      twoFactorCode: null,
      twoFactorCodeExpiry: null,
    });
    // mock hard link for the ehrPatient
    ehrPatient.association.patientId = newNextPatient.patientId;

    // update scope
    await this._scopesModule.setScopeUsers(scopeId, {
      patientId: newNextPatient.patientId,
    });

    // event for ehr patient update
    ehrPatientEmitter.emit(SYNC_DATA, { ehrPatient });
  }

  public async linkEhrAccount(inviteCode: string): Promise<Session | null> {
    await delay(1000);
    const patientId = this._authModule.session.patientId;

    const now = moment();

    const { data: existingEhrPatient, emitter: ehrPatientEmitter } =
      this._mockDataCacheModule.findEhrPatientByAccessCode(inviteCode);

    const {
      association: {
        ehrId,
        ehrPatientId,
        ehrPatientIdAlt,
        lastVisitedClinic,
        createdAt,
        cmsLocationSlug,
      },
    } = existingEhrPatient;

    const newAssociation = {
      patientId,
      ehrId,
      ehrPatientId,
      ehrPatientIdAlt,
      lastVisitedClinic,
      createdAt,
      cmsLocationSlug,
      linkedAt: now.unix(),
    };

    const { data: patient, emitter: patientEmitter } =
      this._mockDataCacheModule.findPatient(patientId);

    // add association to patient
    patient.ehrPatients.push(newAssociation);
    // emit event
    patientEmitter.emit(SYNC_DATA, { patient });

    existingEhrPatient.association = newAssociation;
    ehrPatientEmitter.emit(SYNC_DATA, { ehrPatient: existingEhrPatient });

    return null;
  }

  public async unlinkEhrAccount(
    patientId: string,
    ehrId: string,
  ): Promise<Session | null> {
    await delay(1000);
    const { data: patient, emitter: patientEmitter } =
      this._mockDataCacheModule.findPatient(patientId);

    const association = patient.ehrPatients.find((ass) => ass.ehrId === ehrId);
    if (!association) {
      throw new NotFoundError(
        `Patient ${patient.getDisplayName()} does not have an association with an ehr with ehrId=${ehrId}`,
      );
    }

    // get corresponding ehr patient
    const { data: ehrPatient, emitter: ehrPatientEmitter } =
      this._mockDataCacheModule.findEhrPatient(ehrId, association.ehrPatientId);

    // update and emit event for patient
    patient.ehrPatients = patient.ehrPatients.filter((a) => a.ehrId !== ehrId);
    patientEmitter.emit(SYNC_DATA, { patient });

    // update and emit event for ehr patient
    ehrPatient.association.patientId = null;
    ehrPatient.association.appAccessCode = faker.random
      .number({ min: 1000000, max: 2000000 })
      .toString();

    ehrPatientEmitter.emit(SYNC_DATA, ehrPatient);

    return null;
  }

  public async retrievePatientStatus(
    ehrPatientId: string,
  ): Promise<IPatientDataSectionWithStatus[]> {
    await delay(1000);

    const ehrId = this._authModule.session?.staffMember?.ehrId;

    if (!ehrId) {
      throw new Error(
        "Patient status only accessible from a session with a valid staff member",
      );
    }

    // TODO mock proper patients lookup and derive available data accordingly
    const { data: ehrPatient } = this._mockDataCacheModule.findEhrPatient(
      ehrId,
      ehrPatientId,
    );

    // check if linked
    const patientId = ehrPatient.association.patientId;

    // get next patient by patient id or look for a matching one by identifiers
    const { data: nextPatient } = patientId
      ? this._mockDataCacheModule.findPatient(patientId)
      : this._mockDataCacheModule.findPatientByIdentifiers(ehrPatient.fhir);

    if (!nextPatient) {
      return [];
    }

    if (!patientId) {
      return getPatientDataSectionsUpdates(ehrPatient.fhir, nextPatient.fhir);
    }

    // check if record has been updated
    const nextPatientUtil = fhirUtil<FhirPatientUtil>(nextPatient.fhir);
    const lastUpdate = nextPatientUtil.getLastRecordUpdate();
    const lastSync = nextPatientUtil.getLastRecordSync(
      ehrPatient.association.ehrId,
    );
    // if equal, don't scan, just return
    if (lastUpdate === lastSync) {
      return [];
    }
    return getPatientDataSectionsUpdates(ehrPatient.fhir, nextPatient.fhir);
  }

  public async updateEhrPatient(
    ehrPatientId: string,
    updatedFhirPatient: fhir3.Patient,
  ): Promise<void> {
    await delay(1000);

    const ehrId = this._authModule.session?.staffMember?.ehrId;

    if (!ehrId) {
      throw new Error(
        "Updating of ehr patient only allowed from a session with a valid staff member",
      );
    }

    // patient lookup
    const { data: ehrPatient, emitter: ehrPatientEmitter } =
      this._mockDataCacheModule.findEhrPatient(ehrId, ehrPatientId);

    // get next patient
    const { data: nextPatient, emitter: patientEmitter } =
      this._mockDataCacheModule.findPatient(ehrPatient.association.patientId);

    // update next patient last record touch
    const now = currentUnixTimestamp();
    nextPatient.fhir.extension = nextPatient.fhir.extension.map((ext) => {
      if (
        ext.url !==
          `${patientLastRecordSyncUrl}/ehrId/${ehrPatient.association.ehrId}` &&
        ext.url !== patientLastRecordUpdateUrl
      ) {
        return ext;
      }
      return { url: ext.url, valueInteger: now };
    });

    // hack modify the original object for the mock auth module to
    // refresh the session with the changes
    ehrPatient.fhir = updatedFhirPatient;

    // emit patient patients updates
    ehrPatientEmitter.emit(SYNC_DATA, { ehrPatient });
    patientEmitter.emit(SYNC_DATA, { patient: nextPatient });
  }

  public async retrieveMedication(
    patientId: string,
    medicationId: string,
    ehrId: string,
  ): Promise<fhir3.MedicationRequest> {
    await delay(1000);
    const medication = mockMedicationRequests.find((med) => {
      return med.id === medicationId;
    });
    if (!medication) throw new NotFoundError();
    return medication;
  }

  // SYNCING

  public retrieveSyncedPatient(
    patientId: string,
  ): ISyncMetadata<{ patient: Patient }> {
    const { emitter } = this._mockDataCacheModule.findPatient(patientId);

    return {
      endpoint: "patients",
      action: "retrieveSyncedPatient",
      parameters: {
        patientId,
      },
      emitter,
    };
  }

  public retrieveSyncedEhrPatient(
    ehrId: string,
    ehrPatientId: string,
  ): ISyncMetadata<{ ehrPatient: EhrPatient }> {
    const { emitter } = this._mockDataCacheModule.findEhrPatient(
      ehrId,
      ehrPatientId,
    );

    return {
      endpoint: "patients",
      action: "retrieveSyncedEhrPatient",
      parameters: {
        ehrId,
        ehrPatientId,
      },
      emitter,
    };
  }

  public retrieveSyncedMedicalResources(
    patientId: string,
    resourceTypes: MedicalResourceType[],
  ): ISyncMetadata<PatientMedicalResource[]> {
    const { emitter } = this._mockDataCacheModule.getPatientMedicalResources(
      patientId,
      resourceTypes,
    );
    return {
      endpoint: "patients",
      action: "retrieveSyncedMedicalResources",
      parameters: {
        patientId,
        resourceTypes,
      },
      emitter,
    };
  }

  public retrieveSyncedPatientAppointments(
    patientId: string,
  ): ISyncMetadata<IAppointmentWithDetails[]> {
    const { emitter } =
      this._mockDataCacheModule.getPatientAppointments(patientId);
    return {
      endpoint: "patients",
      action: "retrieveSyncedPatientAppointments",
      parameters: {
        patientId,
      },
      emitter,
    };
  }

  public retrieveSyncedEhrPatientAppointments(
    ehrId: string,
    ehrPatientId: string,
  ): ISyncMetadata<IAppointmentWithDetails[]> {
    const { emitter } = this._mockDataCacheModule.getEhrPatientAppointments(
      ehrId,
      ehrPatientId,
    );
    return {
      endpoint: "patients",
      action: "retrieveSyncedPatientAppointments",
      parameters: {
        ehrId,
        ehrPatientId,
      },
      emitter,
    };
  }
}
