import { CellCtrl } from "../../../structure/Cell/_tests/index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

// TODO update controller to work with modified DOM structure
export class FeedbackMetricCtrl {
  private feedbackMetric: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.feedbackMetric = this.selector.find(toTestSelector("feedback-metric"));
  }

  public async getValue() {
    const cell = new CellCtrl(this.feedbackMetric, this.t);
    const value = await cell.getMetricValue();
    return value;
  }

  public async checkValue(expected: string) {
    const val = await this.getValue();
    await this.t.expect(expected).eql(val);
  }

  public async getLabel() {
    const cell = new CellCtrl(this.feedbackMetric, this.t);
    const label = await cell.getMetricLabel();

    return label;
  }

  public async checkLabel(expected: string) {
    const val = await this.getLabel();
    await this.t.expect(expected).eql(val);
  }
}
