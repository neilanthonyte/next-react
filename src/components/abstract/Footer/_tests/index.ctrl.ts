import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";

export class FooterCtrl {
  public element: Selector;
  public acceptButton: ButtonCtrl;
  public cancelButton: ButtonCtrl;
  public actions: Selector;
  public content: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.element = selector.find(toTestSelector("dialog-footer"));
    this.actions = selector.find(toTestSelector("actions"));
    this.content = selector.find(toTestSelector("content"));
    this.acceptButton = new ButtonCtrl(
      this.selector.find(toTestSelector("accept")),
      this.t,
    );
    this.cancelButton = new ButtonCtrl(
      this.selector.find(toTestSelector("cancel")),
      this.t,
    );
  }

  public async exists() {
    return await this.t.expect(this.element.exists).ok();
  }

  public async expectContent() {
    return await this.t.expect(this.content.exists).ok();
  }

  public async clickAccept() {
    await this.acceptButton.click();
  }

  public async clickCancel() {
    await this.cancelButton.click();
  }

  public async clickAction(actionIndex: number) {
    const actionSelector = await this.actions.nth(actionIndex);
    const actionCtrl = new ButtonCtrl(actionSelector, this.t);
    await actionCtrl.click();
  }

  public async getAction(actionIndex: number) {
    const actionSelector = await this.actions.nth(actionIndex);
    return new ButtonCtrl(actionSelector, this.t);
  }
}
