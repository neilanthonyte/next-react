import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { CircularMetricCtrl } from "../../CircularMetric/_tests/index.ctrl";

export class MetricGroupCtrl {
  private circularMetricCtrl: CircularMetricCtrl;

  constructor(public selector: Selector, private t: TestController) {
    this.selector = selector;
    this.circularMetricCtrl = new CircularMetricCtrl(selector, t);
  }

  public async checkChildrenCount(childrenCount: number) {
    const children = this.selector.find(
      toTestSelector("metric-group"),
    ).childNodeCount;

    return this.t.expect(children).eql(childrenCount);
  }

  public async checkStandardSize(sizeClass: string) {
    return this.circularMetricCtrl.expectToHaveSizeClass(sizeClass);
  }

  public async expectMetricTitleToRender() {
    const metricTitle = this.selector.find(
      toTestSelector("metric-title"),
    ).exists;
    return this.t.expect(metricTitle).ok();
  }

  public async expectMetricTitleToNotRender() {
    const metricTitle = this.selector.find(
      toTestSelector("metric-title"),
    ).exists;
    return this.t.expect(metricTitle).notOk();
  }

  public async expectMetricValueToBe(metricValue: string) {
    return this.circularMetricCtrl.expectToSeeContent(metricValue);
  }
}
