import * as _ from "lodash";
import { inject, injectable } from "inversify";

import { ArticlePreview, OpsArticle } from "next-shared/src/models/Article";
import {
  mockOpsArticlePreviews,
  mockOpsArticles,
} from "next-shared/src/mockData/mockOpsArticles";

import { IHttpConnection } from "../connections/HttpConnection";
import { IOpsArticlesModule } from "../modules/OpsArticlesModule";
import { delay } from "../../helpers/delay";

@injectable()
export class MockOpsArticlesModule implements IOpsArticlesModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async retrieveOpsArticles(): Promise<ArticlePreview[]> {
    await delay(500);
    return mockOpsArticlePreviews;
  }

  public async retrieveOpsArticle(
    articleSlug: string,
  ): Promise<null | OpsArticle> {
    const article = _.find(mockOpsArticles, (a) => a.slug === articleSlug);
    if (!article) {
      console.warn(`unknown article: ${articleSlug}`);
      return null;
    }
    return article;
  }
}
