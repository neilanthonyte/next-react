import { inject, injectable } from "inversify";
import { IHttpConnection } from "../connections/HttpConnection";

export interface IStorageModule {
  createUrl(): Promise<any>;
  getUrl(fileReference: string): Promise<string>; // returns signed url
  getUrlForImgTag(fileReference: string): string; // returns auto signing url (uses redirect in services)
}

@injectable()
export class StorageModule implements IStorageModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async createUrl(): Promise<any> {
    const res = await this._httpConnection.makeRequest({
      url: `storage/create-url`,
      method: "post",
    });

    return res;
  }

  public async getUrl(fileReference: string): Promise<string> {
    const res = await this._httpConnection.makeRequest({
      url: "storage/get-url",
      method: "get",
      params: { fileReference },
      allow404: true,
    });

    return res.url;
  }

  public getUrlForImgTag(fileReference: string): string {
    return (
      this._httpConnection.url +
      "storage/redirect-to?fileReference=" +
      encodeURIComponent(fileReference) +
      "&overrideBearerToken=" +
      encodeURIComponent(this._httpConnection.bearerToken)
    );
  }
}
