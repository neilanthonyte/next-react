import { inject, injectable } from "inversify";
import { IHttpConnection } from "../connections/HttpConnection";
import { App } from "next-shared/src/models/App";
import { ISyncMetadata } from "next-shared/src/types/ISyncMetadata";

export interface IAppsModule {
  retrieveApp(appId: string): Promise<null | App>;
  retrieveAppsForScope(scopeId: string): Promise<App[]>;
  retrieveSyncedAppsForScope(scopeId: string): ISyncMetadata<App[]>;

  createApp(app: App): Promise<App>;
  createCompanion(label: string): Promise<App>;

  deleteApp(appId: string): Promise<void>;

  resetAppAccessCode(appId: string): Promise<App>;
}

@injectable()
export class AppsModule implements IAppsModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async retrieveApp(appId: string): Promise<null | App> {
    const res = await this._httpConnection.makeRequest({
      url: `apps/${appId}`,
      method: "get",
      allow404: true,
    });

    return res.app ? App.unserialize(res.app) : null;
  }

  public async retrieveAppsForScope(scopeId: string): Promise<App[]> {
    const res = await this._httpConnection.makeRequest({
      url: `scopes/${scopeId}/apps`,
      method: "get",
      allow404: true,
    });

    return res.apps.map(App.unserialize);
  }

  public retrieveSyncedAppsForScope(scopeId: string): ISyncMetadata<App[]> {
    return {
      endpoint: "scopes",
      action: "getSyncedAppsForScope",
      parameters: {
        scopeId,
      },
      unseralizeData: (data: any) =>
        data.apps.map((a: any) => App.unserialize(a)),
    };
  }

  public async createApp(app: App): Promise<App> {
    const res = await this._httpConnection.makeRequest({
      url: `apps`,
      method: "post",
      data: {
        app: app.serialize(),
      },
    });

    return App.unserialize(res.app);
  }

  public async createCompanion(label: string): Promise<App> {
    const res = await this._httpConnection.makeRequest({
      url: `apps/create-companion`,
      method: "post",
      data: { label },
    });

    return App.unserialize(res.app);
  }

  public async deleteApp(appId: string): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `apps/${appId}`,
      method: "delete",
    });
  }

  public async resetAppAccessCode(appId: string): Promise<App> {
    const res = await this._httpConnection.makeRequest({
      url: `apps/${appId}/reset-access-code`,
      method: "post",
    });

    return App.unserialize(res.app);
  }
}
