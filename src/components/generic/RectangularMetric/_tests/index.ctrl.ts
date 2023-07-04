import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class RectangularMetricCtrl {
  public metric: Selector;

  constructor(public selector: Selector, private t: TestController) {
    this.metric = this.selector.find(toTestSelector("metric"));
  }

  public async expectToSeeContent(metric: string) {
    await this.t.expect(this.metric.innerText).eql(metric);
  }
}
