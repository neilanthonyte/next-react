import { inject, injectable } from "inversify";
import { IHttpConnection } from "../connections/HttpConnection";
import { ICmsAnatomy } from "next-shared/src/types/ICmsAnatomy";

export interface IAnatomiesModule {
  retrieveAnatomies(): Promise<ICmsAnatomy[]>;
  retrieveAnatomy(articleSlug: string): Promise<null | ICmsAnatomy>;
}

@injectable()
export class AnatomiesModule implements IAnatomiesModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async retrieveAnatomies(): Promise<ICmsAnatomy[]> {
    const res = await this._httpConnection.makeRequest({
      url: "anatomies",
      method: "get",
    });

    return res.anatomies as ICmsAnatomy[];
  }

  public async retrieveAnatomy(
    articleSlug: string,
  ): Promise<null | ICmsAnatomy> {
    const res = await this._httpConnection.makeRequest({
      url: `anatomies/${articleSlug}`,
      method: "get",
      allow404: true,
    });

    if (!res.anatomy) {
      return null;
    }

    return res.anatomy as ICmsAnatomy;
  }
}
