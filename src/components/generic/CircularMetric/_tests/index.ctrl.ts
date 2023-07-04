import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class CircularMetricCtrl {
  constructor(public selector: Selector, private t: TestController) {
    this.selector = selector;
  }

  public async expectToSeeContent(metric: string) {
    const value = this.selector.find(toTestSelector("metric-value"));

    await this.t.expect(value.innerText).eql(metric);
  }

  public async expectToHaveSizeClass(size: string) {
    const classNames = this.selector.find(
      toTestSelector("metric-value"),
    ).classNames;
    await this.t.expect(classNames).contains(`-${size}`);
  }
}
