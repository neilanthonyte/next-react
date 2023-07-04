import { inject, injectable } from "inversify";
import { IHttpConnection } from "../connections/HttpConnection";
import { ICompanyHelpers } from "../CompanyHelpers";
import { Hcp } from "next-shared/src/models/Hcp";
import { NextLocation } from "next-shared/src/models/NextLocation";

export interface ILocationsModule {
  retrieveAllLocations(): Promise<NextLocation[]>;
  retrieveLocationBySlug(locationSlug: string): Promise<null | NextLocation>;
  retrieveLocationByEhrId(ehrId: string): Promise<null | NextLocation>;
  retrieveLocationHcpsByRole(
    locationSlug: string,
    role: string,
  ): Promise<Hcp[]>;
}

@injectable()
export class LocationsModule implements ILocationsModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
    @inject("CompanyHelpers") private _companyHelpers: ICompanyHelpers,
  ) {}

  public async retrieveLocationHcpsByRole(
    locationSlug: string,
    role: string,
  ): Promise<Hcp[]> {
    const req = await this._httpConnection.makeRequest({
      url: `locations/${locationSlug}/hcps-by-role/${role}`,
      method: "get",
    });
    return req.hcps;
  }

  public async retrieveLocationArticlesBySlug(slug: string): Promise<any> {
    const locationSlug = await this._companyHelpers.getActiveLocationSlug();
    const req = await this._httpConnection.makeRequest({
      url: `locations/${locationSlug}/articles/${slug}`,
      method: "get",
    });
    return req.article;
  }

  public async retrieveLocationArticles(
    locationSlug: string = null,
  ): Promise<any> {
    locationSlug =
      locationSlug || (await this._companyHelpers.getActiveLocationSlug());
    const req = await this._httpConnection.makeRequest({
      url: `locations/${locationSlug}/articles`,
      method: "get",
    });

    return req.articles;
  }

  public async retrieveAllLocations(): Promise<NextLocation[]> {
    const req = await this._httpConnection.makeRequest({
      url: "locations",
      method: "get",
    });

    return req.locations.map(
      (x: any) => NextLocation.unserialize(x) as NextLocation,
    );
  }

  public async retrieveLocationBySlug(
    locationSlug: string,
  ): Promise<null | NextLocation> {
    const req = await this._httpConnection.makeRequest({
      url: `locations/${locationSlug}`,
      method: "get",
    });

    return NextLocation.unserialize(req.location as any) as NextLocation;
  }

  public async retrieveLocationByEhrId(
    ehrId: string,
  ): Promise<null | NextLocation> {
    const req = await this._httpConnection.makeRequest({
      url: `location-by-ehr-id/${ehrId}`,
      method: "get",
    });

    return NextLocation.unserialize(req.location as any) as NextLocation;
  }
}
