import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class ArticleCardCtrl {
  private wrapper: Selector;
  private header: Selector;
  private description: Selector;
  private author: Selector;
  private posterImage: Selector;
  private icons: Selector;
  private actions: Selector;

  constructor(public article: Selector, private t: TestController) {
    this.wrapper = this.article.find(toTestSelector("card-wrapper"));
    this.header = this.article.find(toTestSelector("cell-header"));
    this.description = this.article.find(toTestSelector("cell-description"));
    this.author = this.article.find(toTestSelector("author-name"));
    this.posterImage = this.article.find(toTestSelector("img-block"));
    this.icons = this.article.find(toTestSelector("icon"));
    this.actions = this.article.find(toTestSelector("card-actions"));
  }

  async exists() {
    return await this.wrapper.exists;
  }

  async expectHeader(value: string) {
    await this.t.expect(await this.header.innerText).eql(value);
  }

  async expectUrl(value: string) {
    await this.t.expect(await this.wrapper.getAttribute("href")).eql(value);
  }

  async expectHasDescription() {
    await this.t.expect(await this.description.innerText).ok();
  }

  async expectHasAuthor(value: boolean) {
    await this.t.expect(this.author.exists).eql(value);
  }

  async expectPosterImage(value: boolean) {
    await this.t.expect(this.posterImage.exists).eql(value);
  }

  async expectIcons(value: boolean) {
    await this.t.expect(this.icons.exists).eql(value);
  }

  async expectActions(value: boolean, num?: number) {
    await this.t.expect(this.actions.exists).eql(value);
    if (value) await this.t.expect(this.icons.count).eql(num);
  }

  async click() {
    return await this.t.click(this.wrapper);
  }
}
