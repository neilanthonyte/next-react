import { inject, injectable } from "inversify";

import { IHttpConnection } from "../connections/HttpConnection";
import { ICmsTermsAndConditions } from "next-shared/src/types/ICmsTerms";
import { ILegalsModule } from "next-shared/src/types/ILegalsModule";

@injectable()
export class LegalsModule implements ILegalsModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async retrieveTermsAndConditions(): Promise<ICmsTermsAndConditions> {
    const res = await this._httpConnection.makeRequest({
      url: "legals/terms-and-conditions",
      method: "get",
    });

    return res as ICmsTermsAndConditions;
  }
}
