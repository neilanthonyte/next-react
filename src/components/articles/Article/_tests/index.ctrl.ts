import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ClientFunction } from "testcafe";

export class ArticleCtrl {
  private article: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.article = this.selector.find(toTestSelector("article"));
  }

  public async exists() {
    await this.article.exists;
  }

  public async isAnchorInViewport(anchorId: string) {
    return await ClientFunction((id) => {
      const anchor = document.getElementById(id);
      if (!anchor) return false;
      const bounding = anchor.getBoundingClientRect();
      return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    })(anchorId);
  }
}
