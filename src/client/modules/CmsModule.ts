import { inject, injectable } from "inversify";
import { IHttpConnection } from "../connections/HttpConnection";

export interface ICmsModule {
  /**
   * Used to get raw content from the cms.
   * Services should implement a method that understands the type and typeId associations and return data
   * in a format that the form will understand.
   *
   * @param type e.g. "articles"
   * @param slug e.g. if type is article, then slug might be the slug of an already existing article "good-gut-health"
   */
  getContent(type: string, slug: string): Promise<any>;
  /**
   * Updates an entry in the the CMS
   *
   * @param type e.g. "articles"
   * @param slug e.g. if type is article, then slug might be the slug of an already existing article "good-gut-health"
   * @param content the actual content for the update
   */
  updateCmsEntry(type: string, slug: string, content: any): Promise<void>;

  createCmsEntry(type: string, entry: any): Promise<void>;
}

@injectable()
export class CmsModule implements ICmsModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async getContent(type: string, slug: string): Promise<any> {
    // direct CMS request, rather than using each module
    const response = await this._httpConnection.makeRequest({
      url: `${type}/${slug}`,
      method: "get",
    });

    // HACK assumes all responses are located at article - should either omit key (why
    // is the key necessary?) or base the key on the requested type
    return response.article;
  }

  // add in a new creation endpoint

  public async createCmsEntry(type: string, entry: string): Promise<void> {
    return await this._httpConnection.makeRequest({
      url: `cms-content/${type}`,
      method: "post",
      data: entry,
    });
  }

  public async updateCmsEntry(
    type: string,
    slug: string,
    content: any,
  ): Promise<void> {
    return await this._httpConnection.makeRequest({
      url: `cms-content/${type}/${slug}`,
      method: "put",
      data: content,
    });
  }
}
