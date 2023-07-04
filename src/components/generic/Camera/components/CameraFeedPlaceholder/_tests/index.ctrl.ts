import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { IconCtrl } from "../../../../Icon/_tests/index.ctrl";

export class CameraFeedPlaceholderCtrl {
  private placeholder: Selector;
  public placeholderIcon: IconCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.placeholder = this.selector.find(toTestSelector("placeholder"));
    this.placeholderIcon = new IconCtrl(this.placeholder, t);
  }

  public async exists() {
    return await this.placeholder().exists;
  }

  public async click() {
    await this.t.click(this.placeholder);
  }

  public async isRound() {
    return !!(await this.placeholder().getAttribute("data-test-is-round"));
  }
}
