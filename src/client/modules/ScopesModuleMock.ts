import { inject, injectable } from "inversify";
import * as uuid from "uuid";
import "reflect-metadata";

import { SimpleEventEmitter } from "next-shared/src/lib/SimpleEventEmitter";
import { Scope } from "next-shared/src/models/Scope";
import { ISyncMetadata } from "next-shared/src/types/ISyncMetadata";
import { mockScopes, emptyRoom } from "next-shared/src/mockData/mockScopes";
import { mockMedicalStaffMembers } from "next-shared/src/mockData/mockMedicalStaffMembers";
import { cloneModelObject } from "next-shared/src/helpers/cloneModelObject";

import { IHttpConnection } from "../connections/HttpConnection";
import { IScopesModule } from "../modules/ScopesModule";
import { delay } from "../../helpers/delay";
import { MockDataCacheModule } from "./MockDataCacheModule";
import { SYNC_DATA } from "../../types/sync";
import { IScopeUsers } from "next-shared/src/types/IScopeUsers";

@injectable()
export class MockScopesModule implements IScopesModule {
  private _mockScopes: Scope[];

  private _locationEmitters: { [locationId: string]: SimpleEventEmitter };
  private _scopeEmitters: { [scopeId: string]: SimpleEventEmitter };

  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
    @inject("MockDataCacheModule")
    private _mockDataCacheModule: MockDataCacheModule,
  ) {
    this._mockScopes = [...mockScopes];
    this._locationEmitters = {};
    this._scopeEmitters = {};
  }

  public retrieveSyncedScopesForLocation(
    locationId: string,
  ): ISyncMetadata<Scope[]> {
    if (!this._locationEmitters[locationId]) {
      this._locationEmitters[locationId] = new SimpleEventEmitter();
      console.warn(`creating emitter for ${locationId}`);

      // send initial data
      setTimeout(() => {
        this._locationEmitters[locationId].emit(SYNC_DATA, {
          scopes: this._mockScopes,
        });
      }, 500);
    }

    return {
      endpoint: "locations",
      action: "getLocationScopes",
      parameters: {
        locationId,
      },
      unseralizeData: (data: any) =>
        data.scopes.map((s: any) => Scope.unserialize(s)),
      emitter: this._locationEmitters[locationId],
    };
  }

  public retrieveSyncedScope(scopeId: string): ISyncMetadata<Scope> {
    if (!this._scopeEmitters[scopeId]) {
      this._scopeEmitters[scopeId] = new SimpleEventEmitter();
      console.warn(`creating emitter for ${scopeId}`);

      // send initial data
      setTimeout(() => {
        this._scopeEmitters[scopeId].emit(
          SYNC_DATA,
          this._mockScopes.find((s) => s.scopeId === scopeId),
        );
      }, 500);
    }

    return {
      endpoint: "locations",
      action: "getScope",
      parameters: {
        scopeId,
      },
      unseralizeData: (data: any) => (data ? Scope.unserialize(data) : null),
      emitter: this._scopeEmitters[scopeId],
    };
  }

  public async retrieveScope(scopeId: string): Promise<null | Scope> {
    const scope = this._mockScopes.find((s) => s.scopeId == scopeId);
    return scope;
  }

  public async retrieveScopesForLocation(
    locationSlug: string,
    type?: "room" | "companion",
  ): Promise<Scope[]> {
    return Object.values(this._mockScopes);
  }

  public async updateScope(scope: Scope): Promise<void> {
    console.warn("unimplemented");
  }

  public async updateScopeAppState(
    scopeId: string,
    newState: any,
  ): Promise<void> {
    delay(500);
    const n = this._mockScopes.findIndex((s) => s.scopeId == scopeId);
    const updatedScope = cloneModelObject(this._mockScopes[n]);
    updatedScope.state = newState;
    this._mockScopes[n] = updatedScope;
    this._scopeEmitters[scopeId].emit(SYNC_DATA, updatedScope);
  }

  public async touchScope(scopeId: string): Promise<void> {
    console.warn("unimplemented");
  }

  public async createScope(scope: Scope): Promise<Scope> {
    const newScope = { ...emptyRoom, scopeId: uuid.v4() };
    return Scope.unserialize({ ...newScope });
  }
  public async deleteScope(scopeId: string): Promise<void> {
    console.warn("unimplemented");
  }

  public async setScopeUsers(
    scopeId: string,
    users: IScopeUsers,
  ): Promise<Scope> {
    const { patientId, ehrPatientId, staffMemberId } = users;

    const n = this._mockScopes.findIndex((s) => s.scopeId == scopeId);
    const updatedScope = cloneModelObject(this._mockScopes[n]);

    if (ehrPatientId) {
      const { data: ehrPatient } = this._mockDataCacheModule.findEhrPatient(
        updatedScope.ehrId,
        ehrPatientId,
      );
      updatedScope.ehrPatient = ehrPatient;

      // look for any linked patient
      if (ehrPatient.association.patientId) {
        const { data: nextPatient } = this._mockDataCacheModule.findPatient(
          ehrPatient.association.patientId,
        );
        updatedScope.patient = nextPatient || null;
        updatedScope.patientId = nextPatient?.patientId || null;
      }
    } else if (ehrPatientId !== undefined) {
      updatedScope.ehrPatient = null;
      updatedScope.ehrPatientId = null;
    }

    if (patientId) {
      const { data: patient } =
        this._mockDataCacheModule.findPatient(patientId);
      updatedScope.patient = patient;
      updatedScope.patientId = patient.patientId;
    } else if (patientId !== undefined) {
      updatedScope.patient = null;
      updatedScope.patientId = null;
    }

    if (staffMemberId) {
      const staffMember = mockMedicalStaffMembers.find(
        (m) => m.staffMemberId == staffMemberId,
      );
      updatedScope.staffMemberId = staffMemberId;
      updatedScope.staffMember = staffMember;
    } else if (staffMemberId !== undefined) {
      updatedScope.staffMemberId = null;
      updatedScope.staffMember = null;
    }

    this._mockScopes[n] = updatedScope;
    this._scopeEmitters[scopeId].emit(SYNC_DATA, updatedScope);

    return updatedScope;
  }

  public async clearCurrentScopeOnDisconnect(): Promise<void> {
    console.warn("unimplemented");
  }

  public async dontClearCurrentScopeOnDisconnect(): Promise<void> {
    console.warn("unimplemented");
  }
}
