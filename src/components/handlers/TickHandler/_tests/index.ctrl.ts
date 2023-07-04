import moment from "moment";

import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class TickHandler {
  private time: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.time = this.selector.find(toTestSelector("time"));
  }

  public async expectTimePropValue() {
    await this.t
      .expect(moment(await this.time.innerText).unix())
      .within(currentUnixTimestamp() - 3, currentUnixTimestamp());
  }
}
