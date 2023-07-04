import { inject, injectable } from "inversify";
import { IAuthModule } from "./modules/AuthModule";
import { ICompanyHelpers } from "./CompanyHelpers";

// TODO these session lookups need to be replaced or deleted

@injectable()
export class NextCompanyHelpers implements ICompanyHelpers {
  constructor(@inject("AuthModule") private _authModule: IAuthModule) {}

  public getActiveLocationId(): string {
    const session = this._authModule.session;
    if (session === null) {
      return null;
    }

    const locationSlug = session.staffMember?.cmsLocationSlug;

    if (!locationSlug) {
      return null;
    }

    return session.availableLocations.find((x) => x.slug === locationSlug).id;
  }

  public getActiveLocationSlug(): string {
    const session = this._authModule.session;
    if (session === null) {
      return null;
    }

    const locationSlug = session.staffMember?.cmsLocationSlug;

    return locationSlug || null;
  }

  public getAllAvailableLocationIds(): string[] {
    const session = this._authModule.session;
    if (session === null) {
      return null;
    }

    return session.availableLocations.map((location) => location.id);
  }
}
