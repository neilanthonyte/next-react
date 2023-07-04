import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ArticleCardCtrl } from "../../../articles/ArticleCard/_tests/index.ctrl";

export class CourseViewCtrl {
  private articleCards: Promise<ArticleCardCtrl[]>;
  private cards: Selector;

  constructor(public selector: Selector, private t: TestController) {
    this.cards = this.selector.find(
      toTestSelector("course-view-article-cards"),
    );
    this.articleCards = this.toCtrlArray(this.cards);
  }

  private async toCtrlArray(selector: Selector) {
    const arr: ArticleCardCtrl[] = [];
    await this.t.expect(selector.exists).ok();

    const tmp = selector.find(toTestSelector("course-view-article-card"));
    await this.t.expect(await tmp.exists).ok();

    for (let i = 0; i < (await selector.count); i++) {
      const nthI = tmp.nth(i);
      const x = new ArticleCardCtrl(nthI, this.t);
      await this.t.expect(await x.exists()).ok();
      arr.push(x);
    }

    return arr;
  }

  public async click(index: number) {
    const aC = await this.articleCards;
    await aC[index].click();
  }
}
