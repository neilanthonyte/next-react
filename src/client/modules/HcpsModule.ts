import { inject, injectable } from "inversify";
import { Hcp, IHcp } from "next-shared/src/models/Hcp";
import { IHttpConnection } from "../connections/HttpConnection";

export interface IHcpsModule {
  retrieveAllHcps(): Promise<Hcp[]>;
  retrieveAllHcpsByRole(role: string): Promise<Hcp[]>;
  retrieveHcpsForLocation(locationSlug: string): Promise<Hcp[]>;
  retrieveHcpByNpServicesId(npServicesId: string): Promise<Hcp>;
  retrieveSchedule(staffMemberId: string): Promise<fhir3.Schedule>;
}

@injectable()
export class HcpsModule implements IHcpsModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async retrieveHcpByNpServicesId(npServicesId: string): Promise<Hcp> {
    // HACK - services needs to implement a method to get a particular hcp by their np services id.
    const allHcps = await this.retrieveAllHcps();
    return allHcps.find((h) => h.npServicesId === npServicesId);
  }

  public async retrieveAllHcpsByRole(role: string): Promise<Hcp[]> {
    const req = await this._httpConnection.makeRequest({
      url: `hcps-by-role/${role}`,
      method: "get",
    });

    return req.hcps.map((hcp: IHcp) => Hcp.unserialize(hcp));
  }

  public async retrieveAllHcps(): Promise<Hcp[]> {
    const req = await this._httpConnection.makeRequest({
      url: "hcps",
      method: "get",
    });

    return req.hcps.map((hcp: IHcp) => Hcp.unserialize(hcp));
  }

  public async retrieveHcpsForLocation(locationSlug: string): Promise<Hcp[]> {
    const req = await this._httpConnection.makeRequest({
      url: `locations/${locationSlug}/hcps`,
      method: "get",
    });

    return req.hcps.map((hcp: IHcp) => Hcp.unserialize(hcp));
  }

  public async retrieveSchedule(
    staffMemberId: string,
  ): Promise<fhir3.Schedule> {
    const req = await this._httpConnection.makeRequest({
      url: `hcps/${staffMemberId}/schedule`,
      method: "get",
    });

    return req.schedule;
  }
}
