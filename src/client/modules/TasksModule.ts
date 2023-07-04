import { inject, injectable } from "inversify";
import { Checklist } from "next-shared/src/models/Checklist";
import {
  ChecklistDayPreview,
  ISerializedChecklistDayPreview,
} from "next-shared/src/models/ChecklistDayPreview";
import {
  ChecklistTask,
  ISerializedChecklistTask,
} from "next-shared/src/models/ChecklistTask";
import { ISODate, unixTimestamp } from "next-shared/src/types/dateTypes";
import { ISyncMetadata } from "next-shared/src/types/ISyncMetadata";

import { ICompanyHelpers } from "../CompanyHelpers";

import { IHttpConnection } from "../connections/HttpConnection";
import { IWebSocketConnection } from "../connections/WebSocketConnection";
import { IAuthModule } from "./AuthModule";

export interface ITasksModule {
  updateTask(checklistTask: ChecklistTask): Promise<void>;

  retrieveTasksBetweenDatesForFrequency(
    frequency: string,
    startDate: ISODate,
    endDate: ISODate,
  ): Promise<ChecklistTask[]>;

  retrieveTasks(date: ISODate): Promise<Checklist | null>;

  retrieveDailyTaskSummariesBetweenDatesForAvailableLocations(
    startDate: ISODate,
    endDate: ISODate,
  ): Promise<ChecklistDayPreview[]>;

  retrieveDailyTaskSummariesBetweenDatesForLocations(
    startDate: ISODate,
    endDate: ISODate,
    locationIds: string[],
  ): Promise<ChecklistDayPreview[]>;

  retrieveDailyTaskSummariesBetweenDates(
    startDate: ISODate,
    endDate: ISODate,
  ): Promise<ChecklistDayPreview[]>;

  retrieveSyncedTasks(date: unixTimestamp): ISyncMetadata<Checklist>;
}

@injectable()
export class TasksModule implements ITasksModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
    @inject("CompanyHelpers") private _companyHelpers: ICompanyHelpers,
    @inject("AuthModule")
    private _authModule: IAuthModule,
    @inject("WebSocketConnection")
    protected _webSocketConnection: IWebSocketConnection,
  ) {}

  public async retrieveTasksBetweenDatesForFrequency(
    frequency: string,
    startDate: ISODate,
    endDate: ISODate,
  ): Promise<ChecklistTask[]> {
    const locationId = await this._companyHelpers.getActiveLocationId();

    const checklistDayPreviewsResponse: {
      checklistTasks: ISerializedChecklistTask[];
    } = await this._httpConnection.makeRequest({
      url: "tasks/historic",
      params: {
        locationId,
        frequency,
        startDate,
        endDate,
      },
      method: "get",
    });

    return checklistDayPreviewsResponse.checklistTasks.map((checklistTask) =>
      ChecklistTask.unserialize(checklistTask),
    );
  }

  public async retrieveDailyTaskSummariesBetweenDatesForLocations(
    startDate: ISODate,
    endDate: ISODate,
    locationIds: string[],
  ): Promise<ChecklistDayPreview[]> {
    const formattedLocationIds = locationIds.join(",");

    const checklistDayPreviewsResponse: {
      checklistDayPreviews: ISerializedChecklistDayPreview[];
    } = await this._httpConnection.makeRequest({
      url: "dailyTaskSummaries",
      params: {
        locationIds: formattedLocationIds,
        startDate: String(startDate),
        endDate: String(endDate),
      },
      method: "get",
    });

    return checklistDayPreviewsResponse.checklistDayPreviews.map(
      (checklistDayPreview) =>
        ChecklistDayPreview.unserialize(checklistDayPreview),
    );
  }

  public async retrieveDailyTaskSummariesBetweenDatesForAvailableLocations(
    startDate: ISODate,
    endDate: ISODate,
  ): Promise<ChecklistDayPreview[]> {
    const availableLocationIds =
      this._companyHelpers.getAllAvailableLocationIds();
    const formattedLocationIds = availableLocationIds.join(",");

    const checklistDayPreviewsResponse: {
      checklistDayPreviews: ISerializedChecklistDayPreview[];
    } = await this._httpConnection.makeRequest({
      url: "dailyTaskSummaries",
      params: {
        locationIds: formattedLocationIds,
        startDate: String(startDate),
        endDate: String(endDate),
      },
      method: "get",
    });

    return checklistDayPreviewsResponse.checklistDayPreviews.map(
      (checklistDayPreview) =>
        ChecklistDayPreview.unserialize(checklistDayPreview),
    );
  }

  public async retrieveDailyTaskSummariesBetweenDates(
    startDate: ISODate,
    endDate: ISODate,
  ): Promise<ChecklistDayPreview[]> {
    const locationId = this._companyHelpers.getActiveLocationId();

    const {
      checklistDayPreviews,
    }: {
      checklistDayPreviews: ISerializedChecklistDayPreview[];
    } = await this._httpConnection.makeRequest({
      url: "dailyTaskSummaries",
      params: {
        locationIds: locationId,
        startDate: String(startDate),
        endDate: String(endDate),
      },
      method: "get",
    });

    return checklistDayPreviews.map((checklistDayPreview) =>
      ChecklistDayPreview.unserialize(checklistDayPreview),
    );
  }

  public async updateTask(checklistTask: ChecklistTask): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `tasks/${checklistTask.id}`,
      method: "put",
      data: { checklistTask: checklistTask.serialize() },
    });
  }

  public async retrieveTasks(date: ISODate): Promise<Checklist | null> {
    const locationId = this._companyHelpers.getActiveLocationId();

    const res = await this._httpConnection.makeRequest({
      url: "tasks/report",
      params: { date, locationId },
      method: "get",
    });

    return res.checklist ? Checklist.unserialize(res.checklist) : null;
  }

  public retrieveSyncedTasks(date: unixTimestamp): ISyncMetadata<Checklist> {
    const locationId = this._authModule.activeLocation?.id;

    return {
      endpoint: "tasks",
      action: "retrieveSyncedTasks",
      parameters: {
        locationId,
        date,
      },
      unseralizeData: (data: any) => Checklist.unserialize(data.checklist),
    };
  }
}
