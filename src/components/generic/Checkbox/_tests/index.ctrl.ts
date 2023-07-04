import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ECheckboxStatus } from "..";
import { IconCtrl } from "../../Icon/_tests/index.ctrl";

export class CheckboxCtrl {
  public element: Selector;
  public icon: IconCtrl;

  constructor(public selector: Selector, private t: TestController) {
    this.element = this.selector.find(toTestSelector("checkbox"));
    this.icon = new IconCtrl(selector, t);
  }

  public async exists(): Promise<void> {
    await this.t.expect(this.element.exists).ok();
  }

  public async click(): Promise<void> {
    await this.icon.click();
  }

  public async expectStatus(status: ECheckboxStatus): Promise<boolean> {
    const statusAttribute = await this.element.getAttribute("data-test-status");
    return await this.t.expect(statusAttribute).eql(status);
  }
}
