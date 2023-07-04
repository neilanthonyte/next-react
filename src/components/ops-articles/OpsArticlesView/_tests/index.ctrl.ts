import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { delay } from "../../../../helpers/delay";
import { LoaderCtrl } from "../../../generic/Loader/_tests/index.ctrl";

export class OpsArticlesViewCtrl {
  private articles: Selector;
  private header: Selector;
  private body: Selector;

  constructor(private view: Selector, private t: TestController) {
    this.articles = view.find(toTestSelector("cell-header"));
    this.header = view
      .find(toTestSelector("header"))
      .find(toTestSelector("title"));
    this.body = view.find(toTestSelector("body"));
  }

  async getCommonArticlesNum() {
    const articlesCount = await this.articles.count;
    return articlesCount;
  }

  async expectHeader(value: string) {
    await this.t.expect(this.header.innerText).eql(value);
  }

  async expectChapterHeader(value: string) {
    const header: string = await this.body.find(toTestSelector("title"))
      .innerText;
    await this.t.expect(header).eql(value);
  }

  async expectHasArticles() {
    await this.t
      .expect(this.view.find(toTestSelector("card-wrapper")).exists)
      .eql(true);
  }

  async expectOnlyCommonArticles(value: boolean) {
    const articlesCount = await this.articles.count;
    const titles: string[] = [];
    for (let i = 0; i < articlesCount; i++) {
      const type: string = (await this.articles.nth(i).innerText).split(" ")[0];
      titles.push(type);
    }
    if (value) {
      await this.t.expect(titles).notContains("Notcommon");
    } else {
      await this.t.expect(titles).contains("Notcommon");
    }
  }

  async expectCommonArticlesPreserved(num: number) {
    const articlesCount = await this.articles.count;
    const titles: string[] = [];
    for (let i = 0; i < articlesCount; i++) {
      const type: string = (await this.articles.nth(i).innerText).split(" ")[0];
      titles.push(type);
    }
    const commonTitles: string[] = titles.filter((t) => t == "Common");
    await this.t.expect(commonTitles.length).eql(num);
  }

  async expectLoaderOnDelay(ms: number) {
    const loaderBlock = this.view.find(toTestSelector("fallback"));
    const loader = new LoaderCtrl(loaderBlock, this.t);

    await loader.expectLoader(true);
    await delay(ms);
    await loader.expectLoader(false);
  }
}
