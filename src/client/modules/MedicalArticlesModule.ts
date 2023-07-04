import { inject, injectable } from "inversify";

import {
  ArticlePreview,
  IArticlePreview,
  MedicalArticle,
} from "next-shared/src/models/Article";

import { IHttpConnection } from "../connections/HttpConnection";

export interface IMedicalArticlesModule {
  retrieveMedicalArticles(): Promise<ArticlePreview[]>;
  retrieveMedicalArticle(articleSlug: string): Promise<null | MedicalArticle>;
}

@injectable()
export class MedicalArticlesModule implements IMedicalArticlesModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async retrieveMedicalArticles(): Promise<ArticlePreview[]> {
    const res = await this._httpConnection.makeRequest({
      url: "medical-articles",
      method: "get",
    });

    if (!res.medicalArticles) {
      console.warn("missing blog articles");
      return null;
    }

    const articles: ArticlePreview[] = res.medicalArticles.map(
      (a: IArticlePreview) => ArticlePreview.unserialize(a),
    );
    // filter out broken articles
    articles.filter((a) => {
      try {
        a.validate();
      } catch {
        console.warn(`invalid medical article: ${a.slug}`);
        return false;
      }
      return true;
    });
    return articles;
  }

  public async retrieveMedicalArticle(
    articleSlug: string,
  ): Promise<null | MedicalArticle> {
    const res = await this._httpConnection.makeRequest({
      url: `medical-articles/${articleSlug}`,
      method: "get",
      allow404: true,
    });

    if (!res.medicalArticle) {
      console.warn("expected a medical article");
      return null;
    }

    const article = MedicalArticle.unserialize(res.medicalArticle);
    article.validate();
    return article;
  }
}
