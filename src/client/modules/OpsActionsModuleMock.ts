import { injectable } from "inversify";
import * as _ from "lodash";

import { IOpsActionsModule } from "../modules/OpsActionsModule";
import { mockOpsActions } from "next-shared/src/mockData/mockOpsActions";
import {
  IActionMetricsByLocationId,
  IActionMetricsSerialized,
} from "next-shared/src/types/IActionMetricsSerialized";
import { OpsAction } from "next-shared/src/models/OpsAction";
import { mockNextLocations } from "next-shared/src/mockData/mockLocations";

@injectable()
export class MockOpsActionsModule implements IOpsActionsModule {
  public async insertAction(action: OpsAction): Promise<{
    insertedOpsAction: OpsAction;
    opsActionMetrics: IActionMetricsSerialized;
  }> {
    return {
      insertedOpsAction: action,
      opsActionMetrics: {
        outstanding: 5,
        raisedToday: 2,
        solvedToday: 3,
      },
    };
  }
  public async updateAction(action: OpsAction): Promise<{
    updatedOpsAction: OpsAction;
    opsActionMetrics: IActionMetricsSerialized;
  }> {
    return {
      updatedOpsAction: action,
      opsActionMetrics: {
        outstanding: 5,
        raisedToday: 2,
        solvedToday: 3,
      },
    };
  }

  public async getActionMetricsForAllAvailableLocations() {
    const data: IActionMetricsByLocationId = {};
    _.times(mockNextLocations.length, (i) => {
      data[(i + 1).toString()] = {
        outstanding: _.random(0, 5),
        raisedToday: _.random(0, 5),
        solvedToday: _.random(0, 5),
      };
    });
    return data;
  }

  public async getActionMetricsForLocations(locationIds: string[]) {
    const data: IActionMetricsByLocationId = {};
    _.times(mockNextLocations.length, (i) => {
      data[(i + 1).toString()] = {
        outstanding: _.random(0, 5),
        raisedToday: _.random(0, 5),
        solvedToday: _.random(0, 5),
      };
    });
    return data;
  }

  public async getActions(): Promise<any> {
    return {
      actions: mockOpsActions,
      actionMetrics: {
        outstanding: 5,
        raisedToday: 2,
        solvedToday: 3,
      },
    };
  }
}
