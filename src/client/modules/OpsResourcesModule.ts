import { inject, injectable } from "inversify";
import { ICompanyHelpers } from "../CompanyHelpers";

import { IHttpConnection } from "../connections/HttpConnection";
import {
  FilesResource,
  IFilesResource,
} from "next-shared/src/models/FilesResource";

export interface IOpsResourcesModule {
  retrieveOpsResources(): Promise<FilesResource[]>;
}

/**
 * ops resources module
 */
@injectable()
export class OpsResourcesModule implements IOpsResourcesModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
    @inject("CompanyHelpers") private _companyHelpers: ICompanyHelpers,
  ) {}

  /**
   * Fetches the ops resources for a location.
   */
  public async retrieveOpsResources(
    noCache: boolean = false,
  ): Promise<FilesResource[]> {
    const locationId = this._companyHelpers.getActiveLocationId();

    if (!locationId) {
      console.warn("no location ID for ops resources");
      return null;
    }

    const res = await this._httpConnection.makeRequest({
      url: `ops-resources`,
      method: "get",
      params: {
        locationId,
      },
    });

    if (!Array.isArray(res.resources)) {
      console.warn("expecting resources", res);
      return null;
    }

    const resources: FilesResource[] = res.resources.map((a: IFilesResource) =>
      FilesResource.unserialize(a),
    );
    // filter out broken resources
    resources.filter((a) => {
      try {
        a.validate();
      } catch {
        console.warn(`invalid ops resource: ${a.title}`);
        return false;
      }
      return true;
    });

    return resources;
  }
}
