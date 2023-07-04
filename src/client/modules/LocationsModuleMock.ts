import { injectable } from "inversify";

import { ILocationsModule } from "../modules/LocationsModule";
import { Hcp } from "next-shared/src/models/Hcp";
import { mockNextLocations } from "next-shared/src/mockData/mockLocations";
import { delay } from "../../helpers/delay";
import { mockHcps } from "next-shared/src/mockData/mockHcps";

@injectable()
export class MockLocationsModule implements ILocationsModule {
  public async retrieveLocationHcpsByRole(
    locationSlug: string,
    role: string,
  ): Promise<Hcp[]> {
    return mockHcps;
  }

  public async retrieveAllLocations() {
    await delay(500);
    return mockNextLocations;
  }

  public async retrieveLocationByEhrId(ehrId: string) {
    await delay(500);
    return mockNextLocations.find((loc) => loc.ehrId === ehrId);
  }

  public async retrieveLocationBySlug(slug: string) {
    await delay(500);
    return mockNextLocations.find((loc) => loc.slug === slug);
  }
}
