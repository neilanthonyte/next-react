import { inject, injectable } from "inversify";

import {
  ArticlePreview,
  IArticlePreview,
  NewsArticle,
} from "next-shared/src/models/Article";
import { newsPaths } from "../../components/views/newsPaths";

import { IHttpConnection } from "../connections/HttpConnection";

export interface INewsArticlesModule {
  retrieveNewsArticles(): Promise<ArticlePreview[]>;
  retrieveNewsArticle(articleSlug: string): Promise<null | NewsArticle>;
}

@injectable()
export class NewsArticlesModule implements INewsArticlesModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async retrieveNewsArticles(): Promise<ArticlePreview[]> {
    const res = await this._httpConnection.makeRequest({
      url: "news",
      method: "get",
    });

    // HACK should be lowercase
    if (!Array.isArray(res?.newsArticles)) {
      console.error("missing news articles", res);
      return null;
    }

    const articles: ArticlePreview[] = res.newsArticles.map(
      (a: IArticlePreview) =>
        ArticlePreview.unserialize({
          ...a,
          // localise the URL
          url: `${newsPaths.news}/${a.slug}`,
        }),
    );

    // filter out broken articles
    articles.filter((a) => {
      try {
        a.validate();
      } catch {
        console.warn(`invalid news article: ${a.slug}`);
        return false;
      }
      return true;
    });
    return articles;
  }

  public async retrieveNewsArticle(
    articleSlug: string,
  ): Promise<null | NewsArticle> {
    const res = await this._httpConnection.makeRequest({
      url: `news/${articleSlug}`,
      method: "get",
      allow404: true,
    });

    if (!res.newsArticle) {
      console.warn("expected a news article");
      return null;
    }

    const article = NewsArticle.unserialize(res.newsArticle);
    article.validate();
    return article;
  }
}
