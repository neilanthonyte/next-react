import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class ErrorHandlerCtrl {
  public retryButton: ButtonCtrl;

  constructor(public selector: Selector, private t: TestController) {
    this.selector = selector;
    this.retryButton = new ButtonCtrl(
      this.selector.find(toTestSelector("retry-btn")),
      t,
    );
  }

  public async clickRetry(): Promise<void> {
    await this.retryButton.click();
  }
}
