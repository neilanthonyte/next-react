import { inject, injectable } from "inversify";

import {
  ArticlePreview,
  IArticlePreview,
  BlogArticle,
  BlogArticlePreview,
  IBlogArticlePreview,
} from "next-shared/src/models/Article";
import { IBlogFilter } from "next-shared/src/types/blog";

import { IHttpConnection } from "../connections/HttpConnection";

export interface IRetrieveBlogArticlesParameters {
  location?: string;
  target?: string;
}

export interface IBlogArticlesModule {
  retrieveBlogArticles(filter?: IBlogFilter): Promise<BlogArticlePreview[]>;
  retrieveBlogArticle(articleSlug: string): Promise<null | BlogArticle>;
}

@injectable()
export class BlogArticlesModule implements IBlogArticlesModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async retrieveBlogArticles(
    filter: IBlogFilter = {},
  ): Promise<BlogArticlePreview[]> {
    const filterParams: { [key: string]: string } = {};

    if (filter.target !== undefined) filterParams.target = filter.target;
    if (typeof filter.includeShared === "boolean")
      filterParams.includeShared = filter.includeShared ? "true" : "false";
    if (filter.locationSlug !== undefined)
      filterParams.locationSlug = filter.locationSlug;

    const res = await this._httpConnection.makeRequest({
      url: "blog",
      method: "get",
      params: filterParams,
    });

    if (!res.articles) {
      console.warn("missing blog articles");
      return null;
    }

    const articles: BlogArticlePreview[] = res.articles.map(
      (a: IBlogArticlePreview) => BlogArticlePreview.unserialize(a),
    );
    // filter out broken articles
    articles.filter((a) => {
      try {
        a.validate();
      } catch {
        console.warn(`Invalid blog article (${a.slug}) - skipping`);
        return false;
      }
      return true;
    });

    return articles;
  }

  public async retrieveBlogArticle(
    articleSlug: string,
  ): Promise<null | BlogArticle> {
    const res = await this._httpConnection.makeRequest({
      url: `blog/${articleSlug}`,
      method: "get",
      allow404: true,
    });

    if (!res.article) {
      console.warn("expected a blog article");
      return null;
    }

    const article = BlogArticle.unserialize(res.article);
    article.validate();
    return article;
  }
}
