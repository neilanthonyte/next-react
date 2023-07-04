import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class FlowSummaryCtrl {
  public header: Selector;
  public content: Selector;
  public footer: Selector;

  constructor(public selector: Selector, private t: TestController) {
    this.selector = selector;
    this.header = this.selector.find(toTestSelector("desktop-header"));
    this.content = this.selector.find(toTestSelector("expanded-summary"));
    this.footer = this.selector.find(toTestSelector("inline-summary"));
  }

  public async clickToggle(): Promise<void> {
    const toggleButton = this.footer.find("button").nth(0);
    await this.t.click(toggleButton);
  }
}
