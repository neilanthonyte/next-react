import moment from "moment";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";

export class BookingCalendarCtrl {
  constructor(private selector: Selector, private t: TestController) {}

  public async clickDate(dayOfMonth: string) {
    // build a selector on the fly
    const button: ButtonCtrl = new ButtonCtrl(
      this.selector.find(toTestSelector(`day-${dayOfMonth}`)),
      this.t,
    );
    await button.click();
  }

  public async clickToday() {
    const today = moment();
    const todayDateStr = today.date().toString();
    await this.clickDate(todayDateStr);
    return todayDateStr;
  }
}
