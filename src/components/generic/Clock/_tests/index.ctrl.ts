import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import moment from "moment-timezone";

export class Clock {
  private label: Selector;
  private clock: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.label = this.selector.find(toTestSelector("label"));
    this.clock = this.selector.find(toTestSelector("clock"));
  }

  public async expectLabelValue(label: string) {
    await this.t.expect(this.label.innerText).eql(label);
  }

  public async expectClockValue() {
    await this.t.expect(this.clock.innerText).eql(moment().format("h:mmA"));
  }
}
