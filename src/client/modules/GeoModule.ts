import { inject, injectable } from "inversify";
import { IGeo } from "next-shared/src/types/IGeo";

import { IHttpConnection } from "../connections/HttpConnection";

export interface IGeoModule {
  getLatLngByPostcode(postcode: string): Promise<IGeo>;
}

/**
 * GeometryModule
 */
@injectable()
export class GeoModule implements IGeoModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async getLatLngByPostcode(postcode: string): Promise<IGeo> {
    return await this._httpConnection.makeRequest({
      url: `geo/latLng`,
      method: "get",
      params: {
        postcode,
      },
    });
  }
}
