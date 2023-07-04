import * as _ from "lodash";
import { inject, injectable } from "inversify";

import { ArticlePreview, NewsArticle } from "next-shared/src/models/Article";
import {
  mockNewsArticlePreviews,
  mockNewsArticles,
} from "next-shared/src/mockData/mockNewsArticles";

import { IHttpConnection } from "../connections/HttpConnection";
import { delay } from "../../helpers/delay";
import { INewsArticlesModule } from "./NewsArticlesModule";

@injectable()
export class MockNewsArticlesModule implements INewsArticlesModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async retrieveNewsArticles(): Promise<ArticlePreview[]> {
    await delay(500);
    return mockNewsArticlePreviews;
  }

  public async retrieveNewsArticle(
    articleSlug: string,
  ): Promise<null | NewsArticle> {
    const article = _.find(mockNewsArticles, (a) => a.slug === articleSlug);
    if (!article) {
      console.warn(`unknown article: ${articleSlug}`);
      return null;
    }
    return article;
  }
}
