import * as _ from "lodash";
import { inject, injectable } from "inversify";

import { ArticlePreview, MedicalArticle } from "next-shared/src/models/Article";
import {
  mockMedicalArticlePreviews,
  mockMedicalArticles,
} from "next-shared/src/mockData/mockMedicalArticles";

import { IHttpConnection } from "../connections/HttpConnection";
import { delay } from "../../helpers/delay";
import { IMedicalArticlesModule } from "./MedicalArticlesModule";

@injectable()
export class MockMedicalArticlesModule implements IMedicalArticlesModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async retrieveMedicalArticles(): Promise<ArticlePreview[]> {
    await delay(500);
    return mockMedicalArticlePreviews;
  }

  public async retrieveMedicalArticle(
    articleSlug: string,
  ): Promise<null | MedicalArticle> {
    const article = _.find(mockMedicalArticles, (a) => a.slug === articleSlug);
    if (!article) {
      console.warn(`unknown article: ${articleSlug}`);
      return null;
    }
    return article;
  }
}
