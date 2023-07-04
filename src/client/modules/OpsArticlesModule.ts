import { inject, injectable } from "inversify";

import {
  ArticlePreview,
  IArticlePreview,
  OpsArticle,
} from "next-shared/src/models/Article";

import { ICompanyHelpers } from "../CompanyHelpers";
import { IHttpConnection } from "../connections/HttpConnection";

/**
 * Provides access to operational articles.
 */
export interface IOpsArticlesModule {
  retrieveOpsArticles(): Promise<ArticlePreview[]>;
  retrieveOpsArticle(slug: string): Promise<OpsArticle>;
}

@injectable()
export class OpsArticlesModule implements IOpsArticlesModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
    @inject("CompanyHelpers") private _companyHelpers: ICompanyHelpers,
  ) {}

  public async retrieveOpsArticles(): Promise<ArticlePreview[]> {
    const locationId = this._companyHelpers.getActiveLocationId();

    if (!locationId) {
      console.warn("no location currently set when fetching ops articles");
      return null;
    }

    const res = await this._httpConnection.makeRequest({
      url: `ops-articles`,
      method: "get",
      params: {
        locationId,
      },
    });

    if (!Array.isArray(res.articles)) {
      console.error("expecting articles", res);
      return null;
    }

    const articles: ArticlePreview[] = res.articles.map((a: IArticlePreview) =>
      ArticlePreview.unserialize(a),
    );
    // filter out broken articles
    articles.filter((a) => {
      try {
        a.validate();
      } catch {
        console.warn(`invalid ops article: ${a.slug}`);
        return false;
      }
      return true;
    });

    return articles;
  }

  public async retrieveOpsArticle(slug: string): Promise<OpsArticle> {
    const locationId = this._companyHelpers.getActiveLocationId();

    if (!locationId) {
      console.warn("no location currently set when fetching ops articles");
      return null;
    }

    const res = await this._httpConnection.makeRequest({
      url: `ops-articles/${slug}`,
      method: "get",
      params: {
        locationId,
      },
    });

    if (!res.article) {
      console.warn("expected an ops article");
      return null;
    }

    const article = OpsArticle.unserialize(res.article);
    article.validate();
    return article;
  }
}
