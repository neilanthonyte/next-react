import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class CameraFeedCustomCtrl {
  private wrapper: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.wrapper = this.selector.find(toTestSelector("custom-feed-wrapper"));
  }

  public async exists() {
    return await this.wrapper.exists;
  }

  public async isRound() {
    return await this.wrapper.hasClass("round");
  }
}
