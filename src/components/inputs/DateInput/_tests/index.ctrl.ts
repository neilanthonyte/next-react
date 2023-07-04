import { IInputCtrl } from "../../BaseInput/_tests/IInputCtrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { SingleOptionsInputCtrl } from "../../SingleOptionsInput/_tests/index.ctrl";
import { dateStringToObject } from "../helpers/dateStringToObject";

export class DateInputCtrl implements IInputCtrl<string> {
  public date: Selector;
  public inputDay: Selector;
  public inputMonth: Selector;
  public inputYear: Selector;
  public dayCtrl: SingleOptionsInputCtrl;
  public monthCtrl: SingleOptionsInputCtrl;
  public yearCtrl: SingleOptionsInputCtrl;
  constructor(private selector: Selector, private t: TestController) {
    this.date = selector.find(toTestSelector("date-input"));
    this.inputDay = selector.find(toTestSelector("date-input-day"));
    this.inputMonth = selector.find(toTestSelector("date-input-month"));
    this.inputYear = selector.find(toTestSelector("date-input-year"));

    this.dayCtrl = new SingleOptionsInputCtrl(this.inputDay, t);
    this.monthCtrl = new SingleOptionsInputCtrl(this.inputMonth, t);
    this.yearCtrl = new SingleOptionsInputCtrl(this.inputYear, t);
  }

  async setValue(value: string) {
    const dateFormatString = await this.date.getAttribute(
      "data-test-date-format",
    );
    const parsedDateValue = dateStringToObject(value, dateFormatString);

    if (await this.inputYear.exists) {
      await this.yearCtrl.setValue(parsedDateValue.year);
    }
    if (await this.inputMonth.exists) {
      await this.monthCtrl.setValue(parsedDateValue.month);
    }
    if (await this.inputDay.exists) {
      await this.dayCtrl.setValue(parsedDateValue.day);
    }
  }

  async appendRandom() {
    let dateArray = [];
    if (await this.inputYear.exists) {
      dateArray.push(await this.yearCtrl.appendRandom());
    }
    if (await this.inputMonth.exists) {
      dateArray.push(await this.monthCtrl.appendRandom());
    }
    if (await this.inputDay.exists) {
      dateArray.push(await this.dayCtrl.appendRandom());
    }
    dateArray = dateArray.filter((x) => x);
    return dateArray.join("-");
  }

  async expectValue(value: string) {
    await this.t.expect(await this.getValue()).eql(value);
  }

  async appendValue(value: string) {
    this.setValue(value);
  }

  async getValue() {
    let dateArray = [];
    if (await this.inputYear.exists) {
      const year = await this.yearCtrl.getValue();
      dateArray.push(year);
    }
    if (await this.inputMonth.exists) {
      const month = await this.monthCtrl.getValue();
      dateArray.push(month);
    }
    if (await this.inputDay.exists) {
      const day = await this.dayCtrl.getValue();
      dateArray.push(day);
    }

    dateArray = dateArray.filter((x) => x);

    return dateArray.join("-");
  }
}
