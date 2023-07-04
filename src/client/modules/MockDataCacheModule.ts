import { injectable } from "inversify";
import { fhirUtil } from "next-shared/src/fhirUtil";
import { NotFoundError } from "next-shared/src/helpers/errorTypes";
import { matchingPatientIdentifiers } from "next-shared/src/helpers/matchingPatientIdentifiers";

import { SimpleEventEmitter } from "next-shared/src/lib/SimpleEventEmitter";
import { generatePatient } from "next-shared/src/mockData/generatePatient";
import {
  mockAppointmentsWithDetails,
  mockUpcomingAppointmentWithDetailsWithForm,
  mockUpcomingAppointmentWithDetailsWithoutForm,
} from "next-shared/src/mockData/mockAppointments";
import { mockEhrPatients } from "next-shared/src/mockData/mockEhrPatients";
import { mockPatientResources } from "next-shared/src/mockData/mockFhirPatientResources";
import { mockPatients } from "next-shared/src/mockData/mockPatients";
import { EhrPatient } from "next-shared/src/models/EhrPatient";
import { Patient } from "next-shared/src/models/Patient";
import { IAppointmentWithDetails } from "next-shared/src/types/IAppointmentWithDetails";
import {
  MedicalResourceType,
  PatientMedicalResource,
} from "next-shared/src/types/types";
import { SYNC_DATA } from "../../types/sync";

export interface IMockDataCache<T> {
  data: T;
  emitter: SimpleEventEmitter;
}

export interface IMockDataCacheModule {
  createPatient(fhirPatient: fhir3.Patient): Promise<IMockDataCache<Patient>>;
  findPatient(patientId: string): IMockDataCache<Patient>;
  findPatientByEmail(email: string): IMockDataCache<Patient>;
  findPatientByIdentifiers(fhirPatient: fhir3.Patient): IMockDataCache<Patient>;
  findEhrPatient(
    ehrId: string,
    ehrPatientId: string,
  ): IMockDataCache<EhrPatient>;
  findEhrPatientByAccessCode(accessCode: string): IMockDataCache<EhrPatient>;
  getPatientMedicalResources(
    patientId: string,
    medicalResourceTypes: MedicalResourceType[],
  ): IMockDataCache<PatientMedicalResource[]>;
  storePatientMedicalResources(
    patientId: string,
    resources: PatientMedicalResource[],
  ): IMockDataCache<PatientMedicalResource[]>;
  getPatientAppointments(
    patientId: string,
  ): IMockDataCache<IAppointmentWithDetails[]>;
  getEhrPatientAppointments(
    ehrId: string,
    ehrPatientId: string,
  ): IMockDataCache<IAppointmentWithDetails[]>;
}

let resources: PatientMedicalResource[] = [];
Object.keys(mockPatientResources).forEach((type: MedicalResourceType) => {
  if (type === MedicalResourceType.AllObservations) return;
  resources = resources.concat(mockPatientResources[type]);
});

/**
 * Utility class to share mock data between modules
 */
@injectable()
export class MockDataCacheModule implements IMockDataCacheModule {
  public patients: { [patientId: string]: IMockDataCache<Patient> } = {};
  public ehrPatients: { [ehrPatientId: string]: IMockDataCache<EhrPatient> } =
    {};
  public medicalResources: {
    [patientId: string]: IMockDataCache<PatientMedicalResource[]>;
  } = {};

  private patientAppointments: {
    [patientId: string]: IMockDataCache<IAppointmentWithDetails[]>;
  } = {};

  private ehrPatientAppointments: {
    [id: string]: IMockDataCache<IAppointmentWithDetails[]>;
  } = {};

  async createPatient(
    fhirPatient: fhir3.Patient,
  ): Promise<IMockDataCache<Patient>> {
    const newPatient = await generatePatient(fhirPatient);
    const emitter = new SimpleEventEmitter();
    this.patients[newPatient.patientId] = { emitter, data: newPatient };

    setTimeout(() => {
      emitter.emit(SYNC_DATA, { patient: newPatient });
    });

    return this.patients[newPatient.patientId];
  }

  public findEhrPatient(
    ehrId: string,
    ehrPatientId: string,
  ): IMockDataCache<EhrPatient> {
    const id = `${ehrId}:${ehrPatientId}`;
    let emitterConfig = this.ehrPatients[id];

    if (!emitterConfig) {
      // send the patient through
      const ehrPatient = mockEhrPatients.find(
        (p) => p.ehrPatientId === ehrPatientId,
      );

      if (!ehrPatient) {
        throw new NotFoundError(
          `No mock ehr patient with ehrPatientId=${ehrPatientId}`,
        );
      }

      const emitter = new SimpleEventEmitter();
      emitterConfig = this.ehrPatients[id] = { emitter, data: ehrPatient };

      setTimeout(() => {
        emitter.emit(SYNC_DATA, { ehrPatient });
      });
    }
    return emitterConfig;
  }

  public findEhrPatientByAccessCode(
    accessCode: string,
  ): IMockDataCache<EhrPatient> {
    const ehrPatient = mockEhrPatients.find(
      (p) => p.appAccessCode === accessCode,
    );

    if (!ehrPatient) {
      throw new NotFoundError(
        `No mock ehr patient with appAccessCode=${accessCode}`,
      );
    }

    return this.findEhrPatient(
      ehrPatient.association.ehrId,
      ehrPatient.association.ehrPatientId,
    );
  }

  public findPatient(patientId: string): IMockDataCache<Patient> {
    let emitterConfig = this.patients[patientId];

    if (!emitterConfig) {
      // send the patient through
      const patient = mockPatients.find((p) => p.patientId === patientId);

      if (!patient) {
        throw new NotFoundError(`No mock patient with patientId=${patientId}`);
      }

      const emitter = new SimpleEventEmitter();

      emitterConfig = this.patients[patientId] = { emitter, data: patient };

      setTimeout(() => {
        emitter.emit(SYNC_DATA, { patient });
      });
    }

    return emitterConfig;
  }

  public findPatientByEmail(email: string): IMockDataCache<Patient> {
    const findByEmail = (p: Patient) =>
      p.getFhirEmail().toLowerCase() === email.toLowerCase();

    let emitterConfig = Object.values(this.patients).find((p) =>
      findByEmail(p.data),
    );

    if (!emitterConfig) {
      // send the patient through
      const patient = mockPatients.find(findByEmail);

      if (!patient) {
        throw new NotFoundError(`No mock patient with email=${email}`);
      }

      const emitter = new SimpleEventEmitter();

      emitterConfig = this.patients[patient.patientId] = {
        emitter,
        data: patient,
      };

      setTimeout(() => {
        emitter.emit(SYNC_DATA, { patient });
      });
    }

    return emitterConfig;
  }

  public findPatientByIdentifiers(
    fhirPatient: fhir3.Patient,
  ): IMockDataCache<Patient> {
    let emitterConfig = Object.values(this.patients).find((p) =>
      matchingPatientIdentifiers(p.data.fhir, fhirPatient),
    );

    if (!emitterConfig) {
      // send the patient through
      const patient = mockPatients.find((p) =>
        matchingPatientIdentifiers(p.fhir, fhirPatient),
      );

      if (!patient) {
        return { data: null, emitter: null };
      }

      const emitter = new SimpleEventEmitter();

      emitterConfig = this.patients[patient.patientId] = {
        emitter,
        data: patient,
      };

      setTimeout(() => {
        emitter.emit(SYNC_DATA, { patient });
      });
    }

    return emitterConfig;
  }

  public getPatientMedicalResources(
    patientId: string,
    medicalResourceTypes: MedicalResourceType[],
  ): IMockDataCache<PatientMedicalResource[]> {
    let emitterConfig = this.medicalResources[patientId];

    if (!emitterConfig) {
      const emitter = new SimpleEventEmitter();

      const resourceData = medicalResourceTypes
        ? resources.filter((res) =>
            medicalResourceTypes.includes(
              fhirUtil(res).getMedicalResourceType(),
            ),
          )
        : resources;

      emitterConfig = this.medicalResources[patientId] = {
        emitter,
        data: resourceData,
      };

      setTimeout(() => {
        emitter.emit(SYNC_DATA, resourceData);
      });
    }

    return emitterConfig;
  }

  public storePatientMedicalResources(
    patientId: string,
    resources: PatientMedicalResource[],
  ): IMockDataCache<PatientMedicalResource[]> {
    if (!this.medicalResources[patientId]) {
      const emitter = new SimpleEventEmitter();
      this.medicalResources[patientId] = {
        data: resources,
        emitter,
      };
      // emit event
      emitter.emit(SYNC_DATA, resources);
      return this.medicalResources[patientId];
    }

    const { data, emitter } = this.medicalResources[patientId];
    const newData = data.concat(resources);
    // update data
    this.medicalResources[patientId].data = newData;
    // emit event
    emitter.emit(SYNC_DATA, newData);

    return this.medicalResources[patientId];
  }

  public getPatientAppointments(
    patientId: string,
  ): IMockDataCache<IAppointmentWithDetails[]> {
    let emitterConfig = this.patientAppointments[patientId];

    if (!emitterConfig) {
      const emitter = new SimpleEventEmitter();

      emitterConfig = this.patientAppointments[patientId] = {
        emitter,
        data: mockAppointmentsWithDetails,
      };

      setTimeout(() => {
        emitter.emit(SYNC_DATA, mockAppointmentsWithDetails);
      });
    }

    return emitterConfig;
  }

  public getEhrPatientAppointments(
    ehrId: string,
    ehrPatientId: string,
  ): IMockDataCache<IAppointmentWithDetails[]> {
    const id = `${ehrId}:${ehrPatientId}`;
    let emitterConfig = this.ehrPatientAppointments[id];

    if (!emitterConfig) {
      const emitter = new SimpleEventEmitter();

      const mockData = [
        ehrPatientId === mockPatients[0].ehrPatients[0].ehrPatientId
          ? mockUpcomingAppointmentWithDetailsWithoutForm
          : mockUpcomingAppointmentWithDetailsWithForm,
      ];
      emitterConfig = this.ehrPatientAppointments[id] = {
        emitter,
        data: mockData,
      };

      setTimeout(() => {
        emitter.emit(SYNC_DATA, mockData);
      });
    }

    return emitterConfig;
  }
}
