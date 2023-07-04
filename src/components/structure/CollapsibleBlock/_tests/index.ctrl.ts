import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class CollapsibleBlockCtrl {
  public element: Selector;
  public body: Selector;
  public header: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.element = this.selector.find(toTestSelector("collapsible-block"));
    this.header = this.element.find(toTestSelector("collapsible-block-header"));
    this.body = this.element.find(toTestSelector("collapsible-block-body"));
  }

  public async exists() {
    await this.t.expect(this.element.exists).ok();
  }

  public async clickHeader() {
    await this.t.click(this.header);
  }

  public async isOpen(): Promise<boolean> {
    return await this.body.exists;
  }

  public async expectDisabledState(isDisabled: boolean) {
    return await this.t
      .expect(this.header.hasClass(".-isDisabled"))
      .eql(isDisabled);
  }
}
