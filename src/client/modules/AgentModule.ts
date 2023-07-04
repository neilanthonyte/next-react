import { inject, injectable, interfaces } from "inversify";
import { NextLocation } from "next-shared/src/models/NextLocation";
import { IHttpConnection } from "../connections/HttpConnection";

export interface IAgentModule {
  generateJWT(email: string, password: string): Promise<null | string>;
}

@injectable()
export class AgentModule implements IAgentModule {
  constructor(
    @inject("HttpConnection") protected _httpConnection: IHttpConnection,
    @inject("interfaces.Newable<Location>")
    protected GenericLocationCls: interfaces.Newable<NextLocation> &
      typeof NextLocation,
  ) {}

  // different to other login methods:
  // used to create a JWT token for a given clinic which can then be used to authenticate against IRIS
  public async generateJWT(
    email: string,
    password: string,
  ): Promise<null | string> {
    const res = await this._httpConnection.makeRequest({
      url: "agent/generate-jwt",
      method: "post",
      data: { email, password },
    });

    return res.token;
  }
}
