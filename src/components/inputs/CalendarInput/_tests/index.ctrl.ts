import dayjs from "dayjs";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import {
  CALENDAR_INPUT_DATE_FORMAT,
  CALENDAR_INPUT_DISABLED_CLASSNAME,
} from "..";
import { PopoverCtrl } from "../../../generic/Popover/_tests/index.ctrl";

// TODO make this implements IInputCtrl and add it to InputCtrlLookup.ts
export class CalendarInputCtrl {
  public element: Selector;
  public calendarPopover: PopoverCtrl;
  public dateField: Selector;

  constructor(protected selector: Selector, protected t: TestController) {
    this.element = selector.find(toTestSelector("calendar-input"));
    this.calendarPopover = new PopoverCtrl(selector, t);
    this.dateField = selector.find(toTestSelector("date-field"));
  }

  public async exists() {
    await this.t.expect(this.element.exists).ok();
  }

  public async expectCalendarPopoverOpen() {
    await this.calendarPopover.exists();
  }

  public async pickDate(date: Date) {
    const dayDataTestAttribute = `day-${dayjs(date).format(
      CALENDAR_INPUT_DATE_FORMAT,
    )}`;
    const dateSelector = await this.calendarPopover.findInBody(
      dayDataTestAttribute,
    );
    await this.t.click(dateSelector);
  }
}

export class CalendarSingleInputCtrl extends CalendarInputCtrl {
  constructor(protected selector: Selector, protected t: TestController) {
    super(selector, t);
  }

  public async openCalendar() {
    await this.t.click(this.dateField);
  }

  public async expectOneDateField() {
    await this.t.expect(await this.dateField.count).eql(1);
  }

  public async expectDate(formattedDateString: string) {
    await this.t
      .expect(await this.dateField.innerText)
      .eql(formattedDateString);
  }

  public async expectDisabledState(isDisabled: boolean) {
    await this.t
      .expect(await this.dateField.hasClass(CALENDAR_INPUT_DISABLED_CLASSNAME))
      .eql(isDisabled);
  }
}

export class CalendarRangeInputCtrl extends CalendarInputCtrl {
  public dateRangeField: Selector;

  constructor(protected selector: Selector, protected t: TestController) {
    super(selector, t);
    this.dateRangeField = selector.find(toTestSelector("calendar-range"));
  }

  public async openCalendar() {
    await this.t.click(this.dateRangeField);
  }

  public async expectTwoDateFields() {
    await this.t.expect(await this.dateField.count).eql(2);
  }

  public async expectFromDate(formattedDateString: string) {
    const fromSelector = await this.dateField.nth(0);
    await this.t.expect(await fromSelector.innerText).eql(formattedDateString);
  }

  public async expectToDate(formattedDateString: string) {
    const toSelector = await this.dateField.nth(1);
    await this.t.expect(await toSelector.innerText).eql(formattedDateString);
  }

  public async expectDisabledState(isDisabled: boolean) {
    const fromDateDisabledState = await this.dateField
      .nth(0)
      .hasClass(CALENDAR_INPUT_DISABLED_CLASSNAME);
    const toDateDisabledState = await this.dateField
      .nth(1)
      .hasClass(CALENDAR_INPUT_DISABLED_CLASSNAME);
    await this.t.expect(fromDateDisabledState).eql(isDisabled);
    await this.t.expect(toDateDisabledState).eql(isDisabled);
  }
}
