import { inject, injectable } from "inversify";
import { IHttpConnection } from "../connections/HttpConnection";

export interface ICacheModule {
  clearEntireCache(): Promise<void>;
}

@injectable()
export class CacheModule implements ICacheModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async clearEntireCache(): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `cache/clearEntireCache`,
      method: "get",
    });
  }
}
