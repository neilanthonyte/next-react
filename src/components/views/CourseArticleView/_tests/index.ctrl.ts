import { ArticleCtrl } from "../../../articles/Article/_tests/index.ctrl";

export class CourseArticleViewCtrl {
  public article: ArticleCtrl;

  constructor(public selector: Selector, private t: TestController) {
    this.article = new ArticleCtrl(selector, t);
  }

  public async exists() {
    return await this.article.exists();
  }
}
