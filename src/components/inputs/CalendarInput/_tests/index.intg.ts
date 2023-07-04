import { Selector } from "testcafe";
import dayjs from "dayjs";

import {
  selectComponent,
  selectDemo,
  toTestSelector,
} from "next-shared/src/helpers/toTestSelector";

import { CalendarSingleInputCtrl, CalendarRangeInputCtrl } from "./index.ctrl";
import { CALENDAR_INPUT_DATE_FORMAT } from "..";
import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";
import { CALENDAR_INPUT_TEST_DISABLE_TOGGLE_BTN } from "../readme";

fixture("CalendarInput").page("http://localhost:6060/#/CalendarInput");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/inputs/CalendarInput/index.tsx yarn dev
 * yarn testcafe ./src/components/inputs/CalendarInput/_tests/index.intg.ts
 * ```
 */
test("it picks and shows the correct date when single variant", async (t) => {
  const selector = Selector(selectDemo("CalendarInput", "single"));

  const component = new CalendarSingleInputCtrl(
    selector.find(selectComponent()),
    t,
  );

  await component.exists();
  await component.expectOneDateField();
  await component.openCalendar();
  await component.expectCalendarPopoverOpen();
  const dayjsTest = dayjs();
  const dayjsTestDate = dayjsTest.toDate();
  const dayjsTestFormatted = dayjsTest.format(CALENDAR_INPUT_DATE_FORMAT);

  await component.pickDate(dayjsTestDate);
  await component.expectDate(dayjsTestFormatted);
});

test("it picks and shows the correct date when range variant", async (t) => {
  const selector = Selector(selectDemo("CalendarInput", "range"));

  const component = new CalendarRangeInputCtrl(
    selector.find(selectComponent()),
    t,
  );

  await component.exists();
  await component.expectTwoDateFields();
  await component.openCalendar();
  await component.expectCalendarPopoverOpen();
  const dayjsFromTest = dayjs();
  const dayjsFromTestDate = dayjsFromTest.toDate();
  const dayjsFromTestFormatted = dayjsFromTest.format(
    CALENDAR_INPUT_DATE_FORMAT,
  );

  await component.pickDate(dayjsFromTestDate);
  await component.expectToDate(dayjsFromTestFormatted);

  const dayjsToTest = dayjs().add(1, "day");
  const dayjsToTestDate = dayjsToTest.toDate();
  const dayjsToTestFormatted = dayjsToTest.format(CALENDAR_INPUT_DATE_FORMAT);

  await component.pickDate(dayjsToTestDate);
  await component.expectToDate(dayjsToTestFormatted);
});

test("it handles disabled state", async (t) => {
  const selector = Selector(selectDemo("CalendarInput", "single"));

  const component = new CalendarSingleInputCtrl(
    selector.find(selectComponent()),
    t,
  );

  const toggleBtn = new ButtonCtrl(
    selector.find(toTestSelector(CALENDAR_INPUT_TEST_DISABLE_TOGGLE_BTN)),
    t,
  );

  await component.exists();
  await component.expectDisabledState(false);
  await toggleBtn.click();
  await component.expectDisabledState(true);
});
