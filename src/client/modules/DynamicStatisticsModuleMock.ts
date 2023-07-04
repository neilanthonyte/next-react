import { inject, injectable } from "inversify";
import * as _ from "lodash";

import {
  IDynamicStatisticsQuery,
  TDynamicStatisticsResponse,
} from "next-shared/src/types/IDynamicStatisticsQuery";
import { IHttpConnection } from "../connections/HttpConnection";
import { IDynamicStatisticsModule } from "../modules/DynamicStatisticsModule";

@injectable()
export class MockDynamicStatisticsModule implements IDynamicStatisticsModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async query(
    query: IDynamicStatisticsQuery,
  ): Promise<TDynamicStatisticsResponse> {
    if (!!query.windowing && query.groupByField === undefined) {
      return [
        {
          windowStart: 1600325221,
          value: 1,
        },
        {
          windowStart: 1600325221 + 3600 * 1,
          value: 2,
        },
        {
          windowStart: 1600325221 + 3600 * 2,
          value: 4,
        },
        {
          windowStart: 1600325221 + 3600 * 3,
          value: 3,
        },
      ];
    }

    if (!!query.windowing && query.groupByField) {
      return _.times(20, (i) => ({
        windowStart: 1600325221 + 3600 * i,
        value: {
          Tool: _.random(80, 100),
          "Queens of the Stone Age": _.random(0, 20),
          "Nine Inch Nails": _.random(60, 80),
          "Rage Against the Machine": _.random(0, 20) + i * 5,
          "Foo Fighters": _.random(10, 50),
        },
      }));
    }

    if (query.groupByField) {
      return {
        Tool: 4,
        "Queens of the Stone Age": 6,
        "Nine Inch Nails": 1,
        "Rage Against the Machine": 6,
        "Foo Fighters": 0,
      };
    }

    return 2;
  }
}
