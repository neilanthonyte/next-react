import * as _ from "lodash";
import { inject, injectable } from "inversify";

import {
  BlogArticle,
  BlogArticlePreview,
} from "next-shared/src/models/Article";
import {
  mockBlogArticlePreviews,
  mockBlogArticles,
} from "next-shared/src/mockData/mockBlogArticles";

import { IHttpConnection } from "../connections/HttpConnection";
import { delay } from "../../helpers/delay";
import { IBlogArticlesModule } from "./BlogArticlesModule";

@injectable()
export class MockBlogArticlesModule implements IBlogArticlesModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async retrieveBlogArticles(): Promise<BlogArticlePreview[]> {
    await delay(500);
    return mockBlogArticlePreviews;
  }

  public async retrieveBlogArticle(
    articleSlug: string,
  ): Promise<null | BlogArticle> {
    const article = _.find(mockBlogArticles, (a) => a.slug === articleSlug);
    if (!article) {
      console.warn(`unknown article: ${articleSlug}`);
      return null;
    }
    return article;
  }
}
