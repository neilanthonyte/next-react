import { IconCtrl } from "../../Icon/_tests/index.ctrl";

export class CircularIconCtrl {
  private icon: IconCtrl;
  constructor(public selector: Selector, private t: TestController) {
    this.selector = selector;
    this.icon = new IconCtrl(selector, t);
  }

  public async click() {
    await this.icon.click();
  }

  public async expectDisabled() {
    return this.t
      .expect(
        (await this.icon.selector.classNames).some((c) =>
          c.includes("disabled"),
        ),
      )
      .ok();
  }
}
