import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class WellCtrl {
  public element: Selector;
  public options: Selector;
  public content: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.element = this.selector.find(toTestSelector("well"));
    this.options = this.selector.find(toTestSelector("options"));
    this.content = this.selector.find(toTestSelector("content"));
  }

  public async exists() {
    await this.t.expect(this.element.exists).ok();
    await this.t.expect(this.content.exists).ok();
  }

  public async expectOptions() {
    await this.t.expect(this.options.exists).ok();
  }
}
