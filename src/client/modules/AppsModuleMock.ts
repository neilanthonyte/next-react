import { inject, injectable } from "inversify";
import * as uuid from "uuid";
import * as _ from "lodash";

import { App } from "next-shared/src/models/App";
import { ISyncMetadata } from "next-shared/src/types/ISyncMetadata";
import { cloneModelObject } from "next-shared/src/helpers/cloneModelObject";

import { IHttpConnection } from "../connections/HttpConnection";
import { IAppsModule } from "../modules/AppsModule";
import { roomWithMedicalStaffMember } from "next-shared/src/mockData/mockScopes";

const generateRandomAccessCode = (): string => {
  return _.random(10000000, 20000000).toString();
};

export const appCompanion = App.unserialize({
  appId: "8795661a-0123-4281-b48c-8b8ef49db890",
  label: "Blue device",
  accessCode: generateRandomAccessCode(),
  accessCodeExpiry: 12312313,
  type: "companion",
  scopeId: "4795691a-0108-4281-a48e-3b3ef49db890",
});

export const appDashboard = App.unserialize({
  appId: uuid.v4(),
  label: "Dashboard",
  accessCode: generateRandomAccessCode(),
  accessCodeExpiry: 12312313,
  type: "dashboard",
  scopeId: roomWithMedicalStaffMember.scopeId,
});

export let apps = [appCompanion, appDashboard];

@injectable()
export class MockAppsModule implements IAppsModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async retrieveApp(appId: string): Promise<null | App> {
    return apps.find((a) => {
      a.appId === appId;
    });
  }

  public retrieveSyncedAppsForScope(scopeId: string): ISyncMetadata<App[]> {
    return null;
  }

  public async retrieveAppsForScope(scopeId: string): Promise<App[]> {
    return apps.filter((a) => a.scopeId === scopeId);
  }

  public async createApp(app: App): Promise<App> {
    const newApp = cloneModelObject(app);
    newApp.appId = uuid.v4();
    newApp.accessCode = generateRandomAccessCode();
    apps = apps.concat(newApp);
    return newApp;
  }

  public async createCompanion(label: string): Promise<App> {
    return null;
  }

  public async deleteApp(appId: string): Promise<void> {
    apps = apps.filter((a) => a.appId !== appId);
    return null;
  }

  public async resetAppAccessCode(appId: string): Promise<App> {
    const app = apps.find((a) => a.appId === appId);
    app.accessCode = generateRandomAccessCode();
    apps.filter((a) => a.appId !== appId).concat(app);
    return null;
  }
}
