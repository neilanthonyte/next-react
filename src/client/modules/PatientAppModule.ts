import { inject, injectable } from "inversify";

import { ClientSession as Session } from "next-shared/src/models/ClientSession";
import {
  NextOnboardError,
  NextInvalidAccessCodeError,
  NextInvalidTwoFactorCodeError,
} from "next-shared/src/helpers/errorTypes";
import { ICheckAccessCodeResponse } from "next-shared/src/types/ICheckAccessCodeResponse";

import { IHttpConnection } from "../connections/HttpConnection";
import { IAuthModule } from "./AuthModule";
export interface IPatientAppModule {
  version(): Promise<number>;
  /** @deprecated */
  sendTwoFactorCode(accessCode: string): Promise<void>;

  /** legacy pre multi-ehr  */
  patientIdForAccessCode(
    accessCode: string,
  ): Promise<{ patientId: string; email: string }>;
  onboardUser(
    accessCode: string,
    twoFactorCode: string,
    email: string,
    password: string,
  ): Promise<Session>;
  sendInviteTwoFactorCode(accessCode: string): Promise<void>;

  /** multi-ehr */
  sendInviteSignupTwoFactorCode(accessCode: string): Promise<void>;
  // different implementation to sendInviteTwoFactorCode because it will do a look up in the new multi ehr table
  checkAccessCode(accessCode: string): Promise<ICheckAccessCodeResponse>;
  // no session yet, so we need to pass the invite code
  verifyInviteSignupTwoFactorCode(
    accessCode: string,
    twoFactorCode: string,
  ): Promise<fhir3.Patient>;
}

@injectable()
export class PatientAppModule implements IPatientAppModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
    @inject("AuthModule") private _authModule: IAuthModule,
  ) {}

  public async patientIdForAccessCode(
    accessCode: string,
  ): Promise<{ patientId: string; email: string }> {
    const res = await this._httpConnection.makeRequest({
      url: `patient-app/patient-id-for-invite-code`,
      method: "get",
      params: {
        accessCode,
      },
      allow404: true,
    });
    if (res.patientId === null) {
      throw new NextInvalidAccessCodeError();
    }
    return res;
  }

  public async checkAccessCode(
    accessCode: string,
  ): Promise<ICheckAccessCodeResponse> {
    const res: ICheckAccessCodeResponse =
      await this._httpConnection.makeRequest({
        url: `patient-app/check-invite-code`,
        method: "get",
        params: {
          accessCode,
        },
        allow404: true,
      });

    if (res.status === "Invalid code") {
      throw new NextInvalidAccessCodeError();
    }
    return res;
  }

  public async sendTwoFactorCode(accessCode: string): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `patient-app/send-two-factor-code`,
      method: "post",
      data: {
        accessCode,
      },
    });
  }

  public async sendInviteTwoFactorCode(accessCode: string): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `patient-app/send-invite-two-factor-code`,
      method: "post",
      data: {
        accessCode,
      },
    });
  }

  public async sendInviteSignupTwoFactorCode(
    accessCode: string,
  ): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `patient-app/send-invite-signup-two-factor-code`,
      method: "post",
      data: {
        accessCode,
      },
    });
  }

  public async verifyInviteSignupTwoFactorCode(
    accessCode: string,
    twoFactorCode: string,
  ): Promise<fhir3.Patient> {
    try {
      const res = await this._httpConnection.makeRequest({
        url: `patient-app/verify-invite-signup-two-factor-code`,
        method: "post",
        data: {
          accessCode,
          twoFactorCode,
        },
      });
      return res.patient;
    } catch (error) {
      if (error.message === "Incorrect two factor auth code") {
        throw new NextInvalidTwoFactorCodeError(error.message);
      }
      throw error;
    }
  }

  public async version(): Promise<number> {
    try {
      const { version } = await this._httpConnection.makeRequest({
        url: `patient-app/version`,
        method: "get",
      });

      return version;
    } catch (e) {
      return 0; // calling services that doesnt support the version endpoint
    }
  }

  public async onboardUser(
    accessCode: string,
    twoFactorCode: string,
    email: string,
    password: string,
  ): Promise<Session> {
    try {
      const res = await this._httpConnection.makeRequest({
        url: `patient-app/onboard-user`,
        method: "post",
        data: {
          accessCode,
          twoFactorCode,
          email,
          password,
        },
      });

      const newSession = Session.unserialize(res.session);

      this._authModule.setSession(newSession);

      return newSession;
    } catch (error) {
      if (
        error.message === "Incorrect two factor auth code" ||
        error.message ===
          "The email associated to your account is already in use. Please contact the clinic to update your details." ||
        error.message === "Two factor code has expired"
      ) {
        throw new NextOnboardError(error.message);
      }

      throw error;
    }
  }
}
