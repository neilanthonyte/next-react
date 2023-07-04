import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { IconCtrl } from "../../Icon/_tests/index.ctrl";

export class ButtonCtrl {
  private button: Selector;
  private optionsDecoration: IconCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.button = this.selector.find(toTestSelector("button"));
    this.optionsDecoration = new IconCtrl(
      this.selector.find(toTestSelector("options-decoration")),
      t,
    );
  }

  public async exists(): Promise<boolean> {
    return await this.button.exists;
  }

  public async click() {
    await this.t.click(this.button);
  }

  public async expectLabel(label: string) {
    await this.t.expect(this.selector.innerText).eql(label);
  }

  public async getLabel(): Promise<string> {
    return this.selector.innerText;
  }

  public async isMode(targetMode: string): Promise<boolean> {
    const currentMode = await this.button.getAttribute("data-test-mode");
    return currentMode === targetMode;
  }

  public async isBlock(value: boolean) {
    const isBlock: string = await this.button().getAttribute(
      "data-test-is-block",
    );
    const expected = value ? "true" : "false";
    await this.t.expect(isBlock).eql(expected);
  }

  public async expectDisabled() {
    await this.t.expect(this.button.hasAttribute("disabled")).ok();
  }

  public async expectOptionsDecoration() {
    await this.t.expect(this.optionsDecoration.selector.exists).ok();
  }

  public async clickOptionsDecoration() {
    await this.optionsDecoration.click();
  }
}
