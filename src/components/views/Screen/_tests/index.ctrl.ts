import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class Screen {
  private screen: Selector;
  private details: Selector;

  constructor(public selector: Selector, private t: TestController) {
    this.screen = this.selector.find(toTestSelector("screen"));
    this.details = this.selector.find(toTestSelector("details"));
  }

  public async expectDetails(text: string) {
    await this.t.expect(this.details.innerText).eql(text);
  }

  public async expectChildren(children: Selector) {
    await this.t.expect(children.exists).ok();
  }
}
