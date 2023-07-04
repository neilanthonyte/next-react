import { inject, injectable } from "inversify";
import { IHttpConnection } from "../connections/HttpConnection";
import {
  IDynamicStatisticsQuery,
  TDynamicStatisticsResponse,
} from "next-shared/src/types/IDynamicStatisticsQuery";

export interface IDynamicStatisticsModule {
  query(query: IDynamicStatisticsQuery): Promise<TDynamicStatisticsResponse>;
}

@injectable()
export class DynamicStatisticsModule implements IDynamicStatisticsModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async query(
    query: IDynamicStatisticsQuery,
  ): Promise<TDynamicStatisticsResponse> {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const res = await this._httpConnection.makeRequest({
      url: `dynamic-statistics/query`,
      method: "post",
      data: { query, timezone },
    });

    return res.result;
  }
}
