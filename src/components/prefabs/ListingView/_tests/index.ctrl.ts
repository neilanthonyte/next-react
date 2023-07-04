import { Selector } from "testcafe";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class PrefabArticlesCtrl {
  constructor(public listing: Selector, private t: TestController) {}

  async expectHasMenu() {
    await this.t
      .expect(
        this.listing.find(toTestSelector("PrefabArticle-menu-container"))
          .exists,
      )
      .eql(true);
  }

  async expectMenuHasHeader(value: string) {
    const header: string = await this.listing
      .find(toTestSelector("title"))
      .child().innerText;
    await this.t.expect(header).eql(value);
  }

  async expectHasListing() {
    await this.t
      .expect(
        this.listing.find(toTestSelector("PrefabArticle-listing-container"))
          .exists,
      )
      .eql(true);
  }

  async expectFiter(value: boolean) {
    const filtersNum: number = await this.listing
      .find(toTestSelector("filter-control"))
      .child().count;

    if (value) {
      await this.t.expect(filtersNum).notEql(1);
    } else {
      await this.t.expect(filtersNum).eql(1);
    }
  }

  async expectOnlyCommonArticles(value: boolean) {
    const articles: Selector = this.listing.find(toTestSelector("cell-header"));
    const articlesCount = await articles.count;
    const titles: string[] = [];
    for (let i = 0; i < articlesCount; i++) {
      titles.push((await articles.nth(i).innerText).split(" ")[0]);
    }
    if (value) {
      await this.t.expect(titles).notContains("Notcommon");
    } else {
      await this.t.expect(titles).contains("Notcommon");
    }
  }
}
