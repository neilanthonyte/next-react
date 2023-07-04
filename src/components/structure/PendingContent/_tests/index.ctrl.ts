import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class PendingContentCtrl {
  private content: Selector;
  private fallback: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.content = this.selector.find(toTestSelector("content"));
    this.fallback = this.selector.find(toTestSelector("fallback"));
  }

  public async expectFallbackShowing() {
    await this.t.expect(await this.fallback.exists).eql(true);
    await this.t.wait(500);
    await this.t.expect(await this.content.exists).eql(false);
  }

  public async expectContentShowing() {
    await this.t.expect(await this.fallback.exists).eql(false);
    await this.t.wait(500);
    await this.t.expect(await this.content.exists).eql(true);
  }
}
