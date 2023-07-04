import { inject, injectable } from "inversify";

import { IHttpConnection } from "../connections/HttpConnection";
import { IAuthModule } from "./AuthModule";
import { IWebSocketConnection } from "../connections/WebSocketConnection";
import {
  ISerializedOpsAction,
  OpsAction,
} from "next-shared/src/models/OpsAction";
import { ICompanyHelpers } from "../CompanyHelpers";
import {
  IActionMetricsSerialized,
  IActionMetricsByLocationId,
} from "next-shared/src/types/IActionMetricsSerialized";
import { IOpsActionsWithMetrics } from "next-shared/src/types/IOpsActionsWithMetrics";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";

export interface IOpsActionsModule {
  insertAction(action: OpsAction): Promise<{
    insertedOpsAction: OpsAction;
    opsActionMetrics: IActionMetricsSerialized;
  }>;
  updateAction(action: OpsAction): Promise<{
    updatedOpsAction: OpsAction;
    opsActionMetrics: IActionMetricsSerialized;
  }>;
  getActions(): Promise<IOpsActionsWithMetrics>;
  getActionMetricsForAllAvailableLocations(): Promise<IActionMetricsByLocationId>;
  getActionMetricsForLocations(
    locationIds: string[],
  ): Promise<IActionMetricsByLocationId>;
}

@injectable()
export class OpsActionsModule implements IOpsActionsModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
    @inject("CompanyHelpers") private _companyHelpers: ICompanyHelpers,
    @inject("AuthModule")
    private _authModule: IAuthModule,
    @inject("WebSocketConnection")
    protected _webSocketConnection: IWebSocketConnection,
  ) {}

  public async getActionMetricsForLocations(
    locationIds: string[],
  ): Promise<IActionMetricsByLocationId> {
    const formattedLocationIds = locationIds.join(",");

    const response: {
      actionMetrics: IActionMetricsByLocationId;
    } = await this._httpConnection.makeRequest({
      url: `opsActionsMetrics/locations/${formattedLocationIds}`,
      method: "get",
    });

    return response.actionMetrics;
  }

  public async insertAction(opsAction: OpsAction): Promise<{
    insertedOpsAction: OpsAction;
    opsActionMetrics: IActionMetricsSerialized;
  }> {
    const locationId = await this._companyHelpers.getActiveLocationId();
    const response: {
      insertedOpsAction: ISerializedOpsAction;
      opsActionMetrics: IActionMetricsSerialized;
    } = await this._httpConnection.makeRequest({
      url: `opsActions/${locationId}`,
      method: "post",
      data: { opsAction: opsAction.serialize() },
    });

    return {
      insertedOpsAction: OpsAction.unserialize(response.insertedOpsAction),
      opsActionMetrics: response.opsActionMetrics,
    };
  }

  public async updateAction(opsAction: OpsAction): Promise<{
    updatedOpsAction: OpsAction;
    opsActionMetrics: IActionMetricsSerialized;
  }> {
    const locationId = await this._companyHelpers.getActiveLocationId();
    opsAction.locationId = locationId;

    if (opsAction.resolved) {
      opsAction.resolvedAt = currentUnixTimestamp();
    }

    const response: {
      updatedOpsAction: ISerializedOpsAction;
      opsActionMetrics: IActionMetricsSerialized;
    } = await this._httpConnection.makeRequest({
      url: `opsActions/${locationId}`,
      method: "put",
      data: { opsAction },
    });

    return {
      updatedOpsAction: OpsAction.unserialize(response.updatedOpsAction),
      opsActionMetrics: response.opsActionMetrics,
    };
  }

  public async getActions(): Promise<IOpsActionsWithMetrics> {
    const locationId = await this._companyHelpers.getActiveLocationId();
    const response: {
      actions: ISerializedOpsAction[];
      actionMetrics: IActionMetricsSerialized;
    } = await this._httpConnection.makeRequest({
      url: `opsActions/${locationId}`,
      method: "get",
    });

    return {
      actions: response.actions.map((a) => OpsAction.unserialize(a)),
      actionMetrics: response.actionMetrics,
    };
  }

  public async getActionMetricsForAllAvailableLocations(): Promise<IActionMetricsByLocationId> {
    const availableLocationIds =
      await this._companyHelpers.getAllAvailableLocationIds();
    const formattedLocationIds = availableLocationIds.join(",");

    const response: {
      actionMetrics: IActionMetricsByLocationId;
    } = await this._httpConnection.makeRequest({
      url: `opsActionsMetrics/locations/${formattedLocationIds}`,
      method: "get",
    });

    return response.actionMetrics;
  }
}
