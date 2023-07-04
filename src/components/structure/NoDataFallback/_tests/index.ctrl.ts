import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class NoDataFallbackCtrl {
  public content: Selector;
  public fallback: Selector;
  public message: Selector;
  public actions: Selector;

  constructor(public selector: Selector, private t: TestController) {
    this.content = selector.find(toTestSelector("content"));
    this.fallback = selector.find(toTestSelector("fallback"));
    this.message = this.fallback.find(toTestSelector("message"));
    this.actions = this.fallback.find(toTestSelector("actions"));
  }

  public async checkAction(buttonIndex: number) {
    const actionBtnSelector = this.actions.find(
      toTestSelector(`action-${buttonIndex}`),
    );
    const buttonCtrl = new ButtonCtrl(actionBtnSelector, this.t);
    await buttonCtrl.expectLabel("Add");
  }

  public async expectToShowFallback(message: string | boolean = false) {
    await this.t.expect(await this.fallback.exists).ok();
    if (typeof message === "string") {
      await this.t.expect(this.message.innerText).eql(message);
    }
  }

  /**
   * Checks if custom content is showing and whether it contains some provided text.
   */
  public async expectToShowContent(message: string | boolean = false) {
    await this.t.expect(this.content.exists).ok();
    if (typeof message === "string") {
      await this.t.expect(this.content.innerText).contains(message);
    }
  }
}
