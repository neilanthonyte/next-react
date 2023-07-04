import { injectable, inject } from "inversify";

import { mockNextLocations } from "next-shared/src/mockData/mockLocations";
import { NextLocation } from "next-shared/src/models/NextLocation";
import { SimpleEventEmitter } from "next-shared/src/lib/SimpleEventEmitter";
import {
  EMockLinkingTwoFactorCodes,
  EMockSigninTwoFactorCodes,
} from "next-shared/src/mockData/mockEhrPatients";
import {
  mockStaffMemberSession,
  mockMedicalStaffSession,
  mockMedicalStaffSessionWithApp,
  mockRestorableSessions,
  mockPatientSessionWithAssociation,
} from "next-shared/src/mockData/mockAuth";
import { ClientSession as Session } from "next-shared/src/models/ClientSession";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import {
  NextAccountLinkError,
  NextInvalidTwoFactorCodeError,
  NextLoginError,
  NextSessionWeakPasswordError,
  NotFoundError,
} from "next-shared/src/helpers/errorTypes";
import { generatePatientSession } from "next-shared/src/mockData/generatePatientSession";

import { IAuthModule } from "../modules/AuthModule";
import { MockConfiguration } from "../MockConfiguration";
import { delay } from "../../helpers/delay";
import { IScopesModule } from "./ScopesModule";
import { MockDataCacheModule } from "./MockDataCacheModule";
import { SYNC_DATA } from "../../types/sync";

@injectable()
export class MockAuthModule extends SimpleEventEmitter implements IAuthModule {
  private _session: Session | null;
  private _sessionTemporaryAccessGranted: boolean = false;
  constructor(
    @inject("MockConfiguration")
    protected _mockConfiguration: MockConfiguration,
    @inject("ScopesModule") private _scopesModule: IScopesModule,
    @inject("MockDataCacheModule")
    private _mockDataCacheModule: MockDataCacheModule,
  ) {
    super();
  }

  public setSession(newSession: Session | null): void {
    this._session = newSession;
    this.emit("sessionChange");
  }

  public get session(): Session | null {
    if (this._session === undefined) {
      if (this._mockConfiguration.config.sessionType === "staffMember") {
        this._session = mockStaffMemberSession;
      } else if (
        this._mockConfiguration.config.sessionType === "medicalStaffMember"
      ) {
        this._session = mockMedicalStaffSession;
      } else {
        this._session = null;
      }
    }

    return this._session;
  }

  public activeLocation: NextLocation = mockNextLocations[0];

  public setActiveLocation(location: NextLocation) {
    this.activeLocation = location;
  }

  public availableLocations: NextLocation[] = [];

  public setAvailableLocations(locations: NextLocation[]) {
    this.availableLocations = locations;
  }

  /**
   * Temporary access
   */
  public get sessionTemporaryAccessGranted(): boolean {
    return this._sessionTemporaryAccessGranted;
  }

  public grantSessionTemporaryAccess(): void {
    if (this.session === null) return;
    this._sessionTemporaryAccessGranted = true;
    this.emit("sessionTemporaryAccessChange");
  }

  public revokeSessionTemporaryAccess(): void {
    this._sessionTemporaryAccessGranted = false;
    this.emit("sessionTemporaryAccessChange");
  }

  public async me(): Promise<null | Session> {
    await delay(1000);
    return this._session;
  }

  public async setSessionFromSessionId(
    sessionId: string,
  ): Promise<Session | null> {
    await delay(500);
    let session = mockRestorableSessions.find((s) => s.id === sessionId);
    // required for booking widget examples
    if (!session) session = await generatePatientSession({ sessionId });

    this.setSession(session);
    return this._session;
  }

  public async sendLoginTwoFactorCode(
    email: string,
    password: string,
  ): Promise<{
    success: boolean;
    strongPassword: boolean;
  }> {
    await delay(1000);
    return { success: true, strongPassword: true };
  }

  public async loginAsPatient(
    email: string,
    password: string,
    twoFactorCode: string,
  ): Promise<null | Session> {
    await delay(1000);
    if (twoFactorCode === EMockSigninTwoFactorCodes.Invalid) {
      throw new NextInvalidTwoFactorCodeError("Incorrect two factor auth code");
    }

    const newSession = mockPatientSessionWithAssociation;
    console.warn("New session set on client - ", newSession);
    this.setSession(newSession);
    return newSession;
  }

  public async loginAsPatientAndLinkOnCompanion(
    email: string,
    password: string,
    twoFactorCode: string,
  ): Promise<void> {
    await delay(1000);

    // weak password
    if (password.length <= 8) {
      throw new NextSessionWeakPasswordError();
    }

    const scopeId = this.session?.app?.scopeId;

    if (!scopeId) {
      throw new Error("No app found in session.");
    }

    const scope = await this._scopesModule.retrieveScope(scopeId);

    if (!scope) {
      throw new NotFoundError(`No scope found with scopeId ${scopeId}.`);
    }

    const ehrPatientId = scope.ehrPatient.ehrPatientId;

    if (!ehrPatientId) {
      throw new NotFoundError(
        `No ehr patient found in scope with scopeId ${scopeId}.`,
      );
    }

    const { data: ehrPatient, emitter: ehrPatientEmitter } =
      this._mockDataCacheModule.findEhrPatient(scope.ehrId, ehrPatientId);

    const { data: patient, emitter: patientEmitter } =
      this._mockDataCacheModule.findPatientByEmail(email);

    // this should mock wrong credentials
    if (!patient) {
      throw new NextLoginError();
    }

    // too hard to mantain / mock all scenarios, use mock access code as two factor code to mock specific scenarios
    if (twoFactorCode === EMockLinkingTwoFactorCodes.Invalid) {
      throw new NextInvalidTwoFactorCodeError("Incorrect two factor auth code");
    }
    if (twoFactorCode === EMockLinkingTwoFactorCodes.PhoneMismatch) {
      throw new NextAccountLinkError(
        "The phone number in your Next Practice account does not match the one in your clinic record. Please ask a staff member for assistance.",
      );
    }
    if (
      ehrPatient.getDisplayName() !== patient.getDisplayName() ||
      twoFactorCode === EMockLinkingTwoFactorCodes.AccountMismatch
    ) {
      throw new NextAccountLinkError(
        "The details in your Next Practice account do not match the ones in your clinic record. Please ask a staff member for assistance.",
      );
    }

    // new ehr association
    patient.ehrPatients.push({
      ...ehrPatient.association,
      patientId: patient.patientId,
      linkedAt: currentUnixTimestamp(),
      twoFactorCode: null,
      twoFactorCodeExpiry: null,
    });

    // mock hard link for the ehrPatient
    ehrPatient.association.patientId = patient.patientId;

    // set patient on scope
    this._scopesModule.setScopeUsers(scopeId, { patientId: patient.patientId });
    // events
    ehrPatientEmitter.emit(SYNC_DATA, ehrPatient);
    patientEmitter.emit(SYNC_DATA, patient);
  }

  public async loginAsStaffMember(
    email: string,
    password: string,
  ): Promise<null | Session> {
    this.setSession(mockStaffMemberSession);
    return mockStaffMemberSession;
  }

  public async loginAsApp(accessCode: string): Promise<null | Session> {
    this.setSession(mockMedicalStaffSessionWithApp);
    return mockMedicalStaffSessionWithApp;
  }

  public async checkPasswordStrength(
    userType: "Patient" | "StaffMember",
    password: string,
  ): Promise<boolean> {
    await delay(1000);
    return password.length > 8;
  }

  public async logout(): Promise<void> {
    await delay(2000);
    this.emit("beforeLogout");
    this.setSession(null);
    // reset sessionTemporaryAccess if true
    if (this.sessionTemporaryAccessGranted === true) {
      this.revokeSessionTemporaryAccess();
    }
  }
}
