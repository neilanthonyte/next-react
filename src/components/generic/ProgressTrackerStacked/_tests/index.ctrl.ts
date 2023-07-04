import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class ProgressTrackerStackedCtrl {
  private wrapper: Selector;
  private items: Selector;

  constructor(public selector: Selector, private t: TestController) {
    this.wrapper = selector.find(toTestSelector("progress-tracker-stacked"));
    this.items = this.wrapper.find(toTestSelector("progress-tracker-item"));
  }

  public async exists() {
    await this.wrapper();
    return await this.wrapper.exists;
  }

  public async click(index: number) {
    return await this.t.click(this.items.nth(index));
  }
}
