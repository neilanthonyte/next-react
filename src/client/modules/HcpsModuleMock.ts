import { injectable } from "inversify";

import { IHcpsModule } from "../modules/HcpsModule";
import { Hcp } from "next-shared/src/models/Hcp";
import { mockHcps } from "next-shared/src/mockData/mockHcps";
import { mockNextLocationsSerialized } from "next-shared/src/mockData/mockLocations";

@injectable()
export class MockHcpsModule implements IHcpsModule {
  public async retrieveHcpByNpServicesId(npServicesId: string) {
    const matchingHcp = mockHcps.find(
      (h: any) => h.npServicesId === npServicesId,
    );
    return matchingHcp;
  }

  public async retrieveAllHcpsByRole(role: string): Promise<Hcp[]> {
    return mockHcps.filter((h: Hcp) => h.type === role);
  }

  public async retrieveAllHcps(): Promise<Hcp[]> {
    return mockHcps;
  }

  public async retrieveHcpsForLocation(locationSlug: string): Promise<Hcp[]> {
    const location = mockNextLocationsSerialized.find(
      (l) => l.slug === locationSlug,
    );
    return mockHcps.filter(
      (h: Hcp) => h.type === "practitioner" && h.worksAt === location.slug,
    );
  }

  public async retrieveSchedule(
    staffMemberId: string,
  ): Promise<fhir3.Schedule> {
    // TODO
    return {} as any;
  }
}
