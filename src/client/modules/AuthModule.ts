import { inject, injectable, interfaces } from "inversify";

import { ClientSession as Session } from "next-shared/src/models/ClientSession";
import {
  SimpleEventEmitter,
  eventHandler,
} from "next-shared/src/lib/SimpleEventEmitter";
import {
  NextSessionInvalidatedError,
  NextSessionWeakPasswordError,
  NextInvalidTwoFactorCodeError,
  NextLoginError,
  NextAccountLinkError,
} from "next-shared/src/helpers/errorTypes";

import { IHttpConnection } from "../connections/HttpConnection";
import { IWebSocketConnection } from "../connections/WebSocketConnection";
import { ISyncModule } from "./SyncModule";
import { NextLocation } from "next-shared/src/models/NextLocation";

export interface IAuthModule {
  session: Session | null;
  activeLocation: NextLocation; // used by client requests and components to show and

  // use data relating to a store
  availableLocations: NextLocation[]; // possible stores that can be accessed by
  sessionTemporaryAccessGranted: boolean;

  // current user
  setActiveLocation(location: NextLocation): void;

  // event system
  on(eventName: string, handler: eventHandler): void;
  off(eventName: string, handler: eventHandler): void;

  me(): Promise<null | Session>;

  setSessionFromSessionId(sessionId: string): Promise<Session | null>;
  setSession(newSession: Session | null): void;

  grantSessionTemporaryAccess: () => void;
  revokeSessionTemporaryAccess: () => void;

  sendLoginTwoFactorCode(
    email: string,
    password: string,
  ): Promise<{
    success: boolean;
    strongPassword: boolean;
  }>;
  loginAsPatient(
    email: string,
    password: string,
    twoFactorCode?: string,
    newPassword?: string,
  ): Promise<null | Session>;

  loginAsPatientAndLinkOnCompanion(
    email: string,
    password: string,
    twoFactorCode?: string,
  ): Promise<void>;

  loginAsStaffMember(email: string, password: string): Promise<null | Session>;

  loginAsApp(accessCode: string): Promise<null | Session>;

  logout(): Promise<void>;

  checkPasswordStrength(
    userType: "Patient" | "StaffMember",
    password: string,
  ): Promise<boolean>;
}

@injectable()
export class AuthModule extends SimpleEventEmitter implements IAuthModule {
  protected _session: Session | null = null; // current session
  protected _activeLocation: NextLocation; // used to set an active location when user
  // has access to multiple stores
  protected _availableLocations: NextLocation[]; // possible stores
  protected _sessionTemporaryAccessGranted: boolean = false;

  /**
   * Setup injected dependencies.
   */
  constructor(
    @inject("HttpConnection") protected _httpConnection: IHttpConnection,
    @inject("WebSocketConnection")
    protected _webSocketConnection: IWebSocketConnection,
    @inject("SyncModule")
    protected _syncModule: ISyncModule,
    @inject("interfaces.Newable<Session>")
    protected SessionCls: interfaces.Newable<Session> & typeof Session,
    @inject("interfaces.Newable<Location>")
    protected GenericLocationCls: interfaces.Newable<NextLocation> &
      typeof Location,
  ) {
    super();
  }

  public get activeLocation() {
    return this.session ? this.session.availableLocations[0] : null;
  }

  public setActiveLocation(location: NextLocation): void {
    this._activeLocation = location;
    localStorage.setItem("activeLocationSlug", location.slug);
  }

  public get availableLocations(): NextLocation[] {
    return this._availableLocations;
  }

  public setAvailableLocations(locations: NextLocation[]) {
    this._availableLocations = locations;
  }

  /**
   * Get current session.
   */
  public get session(): Session | null {
    return this._session;
  }

  /**
   * Temporary access
   */
  public get sessionTemporaryAccessGranted(): boolean {
    return this._sessionTemporaryAccessGranted;
  }

  public grantSessionTemporaryAccess(): void {
    // make sure we have a session
    if (this._session === null) return;
    this._sessionTemporaryAccessGranted = true;
    this.emit("sessionTemporaryAccessChange");
  }

  public revokeSessionTemporaryAccess(): void {
    this._sessionTemporaryAccessGranted = false;
    this.emit("sessionTemporaryAccessChange");
  }

  /**
   * Log out current user.
   */
  public async logout() {
    // emit "beforeLogout" event for any listeners
    this.emit("beforeLogout");
    // perform logout request
    await this._httpConnection.makeRequest({
      url: "auth/logout",
      method: "post",
    });

    // reset session
    this.setSession(null);
    // reset sessionTemporaryAccess if true
    if (this._sessionTemporaryAccessGranted === true) {
      this.revokeSessionTemporaryAccess();
    }
  }

  // TODO: we need to override setSession because the generic one doesnt do our socket events yet
  public setSession(newSession: Session | null) {
    if (newSession !== null && !(newSession instanceof Session)) {
      throw new Error("Cannot setSession(...) with non session object");
    }
    (this as any)._session = newSession;

    if (newSession === null) {
      this._httpConnection.bearerToken = null;
      this._syncModule.sessionToken = null;
      this.emit("sessionChange");

      return;
    }

    this._httpConnection.bearerToken = newSession.sessionId;
    this._syncModule.sessionToken = newSession.id;
    this.emit("sessionChange");
  }

  public async setSessionFromSessionId(
    sessionId: string,
  ): Promise<Session | null> {
    const res = await this._httpConnection.makeRequest({
      url: "auth/me",
      method: "get",
      overrideBearerToken: sessionId,
      allow403: true,
    });
    if (res.invalidatedMessage) {
      throw new NextSessionInvalidatedError(res.invalidatedMessage);
    }
    const session = res.session ? Session.unserialize(res.session) : null;
    this.setSession(session);
    return session;
  }

  public async me(): Promise<null | Session> {
    const res = await this._httpConnection.makeRequest({
      url: "auth/me",
      method: "get",
    });

    const session = res.session ? Session.unserialize(res.session) : null;
    this.setSession(session);
    return session;
  }

  public async setEhrPatient(ehrPatientId: string): Promise<null | Session> {
    if (!ehrPatientId) {
      throw new Error("No patient ID");
    }
    const res = await this._httpConnection.makeRequest({
      url: "auth/set-ehr-patient",
      method: "post",
      data: { ehrPatientId },
    });
    if (!res.session) {
      throw new NextSessionInvalidatedError("No session found");
    }

    const session = res.session ? Session.unserialize(res.session) : null;
    this.setSession(session);
    return session;
  }

  public async removeEhrPatient(): Promise<null | Session> {
    const res = await this._httpConnection.makeRequest({
      url: "auth/remove-ehr-patient",
      method: "post",
    });

    const session = res.session ? Session.unserialize(res.session) : null;
    this.setSession(session);
    return session;
  }

  public async sendLoginTwoFactorCode(
    email: string,
    password: string,
  ): Promise<{
    success: boolean;
    strongPassword: boolean;
  }> {
    const res = await this._httpConnection.makeRequest({
      url: `patient-app/send-login-two-factor-code`,
      method: "post",
      data: {
        email,
        password,
      },
    });

    if (res.success === false) {
      throw new NextLoginError(res.error);
    }

    return res;
  }

  public async loginAsPatient(
    email: string,
    password: string,
    twoFactorCode?: string,
    newPassword?: string,
  ): Promise<null | Session> {
    try {
      const res = await this._httpConnection.makeRequest({
        url: "auth/login-as-patient",
        method: "post",
        data: { email, password, twoFactorCode, newPassword },
      });

      if (res.strongPassword === false) {
        throw new NextSessionWeakPasswordError(res.passwordMessage);
      }

      const session = res.session ? Session.unserialize(res.session) : null;
      this.setSession(session);
      return session;
    } catch (error) {
      if (error.message === "Incorrect two factor auth code") {
        throw new NextInvalidTwoFactorCodeError(error.message);
      }
      throw error;
    }
  }

  public async loginAsPatientAndLinkOnCompanion(
    email: string,
    password: string,
    twoFactorCode: string,
  ): Promise<void> {
    try {
      const res = await this._httpConnection.makeRequest({
        url: "auth/login-as-patient-and-link-on-companion",
        method: "post",
        data: { email, password, twoFactorCode },
      });

      if (res.accountMatchError) {
        throw new NextAccountLinkError(
          "The details in your Next Practice account do not match the ones in your clinical record. Please ask a staff member for assistance.",
        );
      }

      if (res.phoneMismatch) {
        throw new NextAccountLinkError(
          "The phone number in your Next Practice account does not match the one in your clinic record. Please ask a staff member for assistance.",
        );
      }
    } catch (error) {
      if (error.message === "Incorrect two factor auth code") {
        throw new NextInvalidTwoFactorCodeError(error.message);
      }
      throw error;
    }
  }

  public async loginAsStaffMember(
    email: string,
    password: string,
  ): Promise<null | Session> {
    const res = await this._httpConnection.makeRequest({
      url: "auth/login-as-staff-member",
      method: "post",
      data: { email, password },
    });

    const session = res.session ? Session.unserialize(res.session) : null;
    this.setSession(session);
    return session;
  }

  public async loginAsApp(accessCode: string): Promise<null | Session> {
    const res = await this._httpConnection.makeRequest({
      url: "auth/login-as-app",
      method: "post",
      data: { accessCode },
    });
    const session: null | Session = res.session
      ? Session.unserialize(res.session)
      : null;
    this.setSession(session);

    return session;
  }

  public async checkPasswordStrength(
    userType: "Patient" | "StaffMember",
    password: string,
  ): Promise<boolean> {
    const res = await this._httpConnection.makeRequest({
      url: "auth/check-password-strength",
      method: "post",
      data: { userType, password },
    });
    if (userType !== "Patient" && userType !== "StaffMember") {
      throw new Error("Unrecognised user type");
    }

    return res.strongPassword;
  }
}
