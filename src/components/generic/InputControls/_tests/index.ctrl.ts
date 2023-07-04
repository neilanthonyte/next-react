import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class InputControlsCtrl {
  private clear: Selector;
  private errors: Selector;

  constructor(selector: Selector, private t: TestController) {
    this.clear = selector.find(toTestSelector("clear"));
    this.errors = selector.find(toTestSelector("error"));
  }

  async clickClear() {
    await this.t.click(this.clear);
  }

  async getErrorCount() {
    return await this.errors.count;
  }

  async expectErrors(count: number = 0) {
    await this.t.expect(await this.getErrorCount()).eql(count);
  }

  async expectClearButtonActive(isActive: boolean = false) {
    const style = await this.clear.getAttribute("data-test-active");
    await this.t.expect(style).eql(isActive ? "active" : "inactive");
  }
}
