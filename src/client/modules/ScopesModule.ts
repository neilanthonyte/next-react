import { inject, injectable } from "inversify";

import { Scope, TScopeType } from "next-shared/src/models/Scope";
import { ISyncMetadata } from "next-shared/src/types/ISyncMetadata";
import { IScopeUsers } from "next-shared/src/types/IScopeUsers";

import { IHttpConnection } from "../connections/HttpConnection";
import { ICompanyHelpers } from "../CompanyHelpers";
import { IWebSocketConnection } from "../connections/WebSocketConnection";

export interface IScopesModule {
  retrieveScope(scopeId: string): Promise<null | Scope>;
  retrieveSyncedScope(scopeId: string): ISyncMetadata<Scope>;

  retrieveScopesForLocation(
    locationSlug: string,
    type?: TScopeType,
  ): Promise<Scope[]>;
  retrieveSyncedScopesForLocation(
    locationSlug: string,
    type?: TScopeType,
  ): ISyncMetadata<Scope[]>;

  // UPDATE METHODS
  touchScope(scopeId: string): Promise<void>;
  updateScopeAppState(scopeId: string, newState: any): Promise<void>;
  setScopeUsers(scopeId: string, users: IScopeUsers): Promise<Scope>;

  createScope(scope: Scope): Promise<Scope>;
  deleteScope(scopeId: string): Promise<void>;

  clearCurrentScopeOnDisconnect(): Promise<void>;
  dontClearCurrentScopeOnDisconnect(): Promise<void>;
}

@injectable()
export class ScopesModule implements IScopesModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
    @inject("WebSocketConnection")
    private _webSocketConnection: IWebSocketConnection,
    @inject("CompanyHelpers") private _companyHelpers: ICompanyHelpers,
  ) {}

  public async retrieveScope(scopeId: string): Promise<null | Scope> {
    const res = await this._httpConnection.makeRequest({
      url: `scopes/${scopeId}`,
      method: "get",
      allow404: true,
    });

    return res.scope ? Scope.unserialize(res.scope) : null;
  }

  public retrieveSyncedScope(scopeId: string): ISyncMetadata<Scope> {
    return {
      endpoint: "scopes",
      action: "retrieveSyncedScope",
      parameters: {
        scopeId,
      },
      unseralizeData: (data: any) => Scope.unserialize(data.scope),
    };
  }

  public async retrieveScopesForLocation(
    locationSlug: string,
    type?: TScopeType,
  ): Promise<Scope[]> {
    const res = await this._httpConnection.makeRequest({
      url: `locations/${locationSlug}/scopes`,
      method: "get",
      params: { type },
    });

    return res.scopes.map(Scope.unserialize);
  }

  public retrieveSyncedScopesForLocation(
    locationSlug: string,
    type?: TScopeType,
  ): ISyncMetadata<Scope[]> {
    return {
      endpoint: "locations",
      action: "retrieveSyncedScopesForLocation",
      parameters: {
        locationSlug,
        type,
      },
      unseralizeData: (data: any) =>
        data.scopes.map((s: any) => Scope.unserialize(s)),
    };
  }

  public async updateScope(scope: Scope): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `scopes/${scope.scopeId}/`,
      method: "put",
      data: {
        scope: scope.serialize(),
      },
    });
  }

  public async updateScopeAppState(scopeId: string, state: any): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `scopes/${scopeId}/update-app-state`,
      method: "post",
      data: { state },
    });
  }

  public async touchScope(scopeId: string): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `scopes/${scopeId}/touch`,
      method: "post",
    });
  }

  public async createScope(scope: Scope): Promise<Scope> {
    const res = await this._httpConnection.makeRequest({
      url: `scopes`,
      method: "post",
      data: {
        scope: scope.serialize(),
      },
    });

    return Scope.unserialize(res.scope);
  }

  public async deleteScope(scopeId: string): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `scopes/${scopeId}`,
      method: "delete",
    });
  }

  public async setScopeUsers(
    scopeId: string,
    users: IScopeUsers,
  ): Promise<Scope> {
    const res = await this._httpConnection.makeRequest({
      url: `scopes/${scopeId}/set-users`,
      method: "post",
      data: users,
    });
    return res.scope ? Scope.unserialize(res.scope) : null;
  }

  public async clearCurrentScopeOnDisconnect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._webSocketConnection.emit(
        "clear-scope-on-disconnect",
        this._webSocketConnection.sessionToken,
        (success: boolean) => {
          if (!success) {
            reject();
            return;
          }

          resolve();
          return;
        },
      );
    });
  }

  public async dontClearCurrentScopeOnDisconnect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._webSocketConnection.emit(
        "clear-scope-on-disconnect",
        null,
        (success: boolean) => {
          if (!success) {
            reject();
            return;
          }

          resolve();
          return;
        },
      );
    });
  }
}
