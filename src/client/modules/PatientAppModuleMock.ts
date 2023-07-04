import { injectable, inject } from "inversify";

import { ClientSession as Session } from "next-shared/src/models/ClientSession";
import {
  NextInvalidAccessCodeError,
  NotFoundError,
} from "next-shared/src/helpers/errorTypes";
import { mockPatients } from "next-shared/src/mockData/mockPatients";
import { ICheckAccessCodeResponse } from "next-shared/src/types/ICheckAccessCodeResponse";
import {
  EMockLinkingAccessCodes,
  mockEhrPatients,
} from "next-shared/src/mockData/mockEhrPatients";
import { emailMask } from "next-shared/src/helpers/emailMask";
import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirPatientUtil } from "next-shared/src/fhirUtil/utilClasses/FhirPatientUtil";
import { generatePatientSession } from "next-shared/src/mockData/generatePatientSession";
import { EPatientAcountStatus } from "next-shared/src/types/EPatientAcountStatus";

import { delay } from "../../helpers/delay";
import { IPatientAppModule } from "../modules/PatientAppModule";
import { AuthModule } from "../modules/AuthModule";
import { IScopesModule } from "./ScopesModule";

@injectable()
export class MockPatientAppModule implements IPatientAppModule {
  constructor(
    @inject("AuthModule") private _authModule: AuthModule,
    @inject("ScopesModule") private _scopesModule: IScopesModule,
  ) {}

  public async patientIdForAccessCode(
    accessCode: string,
  ): Promise<{ patientId: string; email: string }> {
    await delay(1000);
    return {
      patientId: mockPatients[0].patientId,
      email: mockPatients[0].email,
    };
  }

  public async checkAccessCode(
    accessCode: string,
  ): Promise<ICheckAccessCodeResponse> {
    await delay(1000);
    // get patient
    const ehrPatient = mockEhrPatients.find(
      (p) => p.appAccessCode === accessCode,
    );
    if (!ehrPatient) throw new NotFoundError();

    // HACK find a better way to test errors for QA
    if (accessCode === EMockLinkingAccessCodes.Invalid) {
      throw new NextInvalidAccessCodeError();
    }
    if (accessCode === EMockLinkingAccessCodes.PhoneMismatch) {
      return {
        status: EPatientAcountStatus.PhoneMismatch,
      };
    }
    if (accessCode === EMockLinkingAccessCodes.Existing) {
      const email = fhirUtil<FhirPatientUtil>(
        ehrPatient.fhir,
      ).getPrimaryEmail();
      const obfuscatedEmail = emailMask(email);
      return {
        status: EPatientAcountStatus.ExistingAccount,
        obfuscatedEmail,
      };
    }
    return {
      status: EPatientAcountStatus.NewAccount,
    };
  }

  public async sendTwoFactorCode(accessCode: string): Promise<void> {
    await delay(1000);
  }

  public async sendInviteTwoFactorCode(accessCode: string): Promise<void> {
    await delay(1000);
  }

  public async sendInviteSignupTwoFactorCode(
    accessCode: string,
  ): Promise<void> {
    await delay(1000);
  }

  public async verifyInviteSignupTwoFactorCode(
    accessCode: string,
    twoFactorCode: string,
  ): Promise<fhir3.Patient> {
    await delay(1000);
    const patient = mockEhrPatients.find((p) => p.appAccessCode === accessCode);
    if (!patient) throw new NotFoundError();
    return patient.fhir;
  }

  public async version(): Promise<number> {
    return 0;
  }

  public async sendAccountVerificationTwoFactorCode(): Promise<void> {
    await delay(1000);
  }

  public async verifyAccount(twoFactorCode: string): Promise<void> {
    await delay(1000);
  }

  public async onboardUser(
    accessCode: string,
    twoFactorCode: string,
    email: string,
    password: string,
  ): Promise<Session> {
    const session = generatePatientSession();
    return session;
  }
}
