import * as _ from "lodash";
import { injectable } from "inversify";

import { ITasksModule } from "../modules/TasksModule";
import { delay } from "../../helpers/delay";
import { mockChecklist } from "next-shared/src/mockData/mockChecklist";
import { generateMockDayPreviews } from "next-shared/src/mockData/mockChecklistSummaries";

import { Checklist } from "next-shared/src/models/Checklist";
import { ChecklistScore } from "next-shared/src/models/CheckListScore";
import { ChecklistTask } from "next-shared/src/models/ChecklistTask";
import { ISODate, unixTimestamp } from "next-shared/src/types/dateTypes";
import { ISyncMetadata } from "next-shared/src/types/ISyncMetadata";
import {
  ChecklistDayPreview,
  ISerializedChecklistDayPreview,
} from "next-shared/src/models/ChecklistDayPreview";
import { mockNextLocations } from "next-shared/src/mockData/mockLocations";

@injectable()
export class MockTasksModule implements ITasksModule {
  private scores: ChecklistScore[] = [];

  public async retrieveTasksBetweenDatesForFrequency(
    frequency: string,
    startDate: string,
    endDate: string,
  ): Promise<ChecklistTask[]> {
    await delay(500);
    return mockChecklist.checklistTasks;
  }

  public async retrieveTasks() {
    await delay(500);

    return {
      checklistTasks: mockChecklist.checklistTasks,
      dayPreview: mockChecklist.dayPreview,
    } as Checklist;
  }

  public async updateTask(newTask: ChecklistTask) {
    // update tasks
    mockChecklist.checklistTasks = mockChecklist.checklistTasks.filter(
      (task: ChecklistTask) => task.id !== newTask.id,
    );

    // update preview
    const modelTasks = mockChecklist.checklistTasks.map((t) =>
      ChecklistTask.unserialize(t),
    );
    mockChecklist.dayPreview = ChecklistDayPreview.calcDailyScore(
      modelTasks,
      this.scores,
      "678",
      "2019-12-02",
    );
  }

  public async retrieveDailyTaskSummariesBetweenDates(
    startDate: ISODate,
    endDate: ISODate,
  ): Promise<ChecklistDayPreview[]> {
    await delay(500);
    return generateMockDayPreviews(startDate, endDate).map(
      (checklistDayPreview) =>
        ChecklistDayPreview.unserialize(checklistDayPreview),
    );
  }

  public async retrieveDailyTaskSummariesBetweenDatesForAvailableLocations(
    startDate: ISODate,
    endDate: ISODate,
  ): Promise<ChecklistDayPreview[]> {
    let previews: ISerializedChecklistDayPreview[] = [];

    _.times(mockNextLocations.length, (i) => {
      previews = previews.concat(
        generateMockDayPreviews(startDate, endDate, (i + 1).toString()),
      );
    });

    return previews.map((checklistDayPreview) =>
      ChecklistDayPreview.unserialize(checklistDayPreview),
    );
  }

  public async retrieveDailyTaskSummariesBetweenDatesForLocations(
    startDate: ISODate,
    endDate: ISODate,
    locationIds: string[],
  ): Promise<ChecklistDayPreview[]> {
    let previews: ISerializedChecklistDayPreview[] = [];

    _.times(mockNextLocations.length, (i) => {
      previews = previews.concat(
        generateMockDayPreviews(startDate, endDate, (i + 1).toString()),
      );
    });

    return previews.map((checklistDayPreview) =>
      ChecklistDayPreview.unserialize(checklistDayPreview),
    );
  }

  public retrieveSyncedTasks(date: unixTimestamp): ISyncMetadata {
    return {
      mockData: mockChecklist,
    } as any;
  }
}
