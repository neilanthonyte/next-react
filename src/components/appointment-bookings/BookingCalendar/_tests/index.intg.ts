import { Selector } from "testcafe";
import * as _ from "lodash";

import {
  selectAction,
  selectAttribute,
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";

import { BookingCalendarCtrl } from "./index.ctrl";
import { delay } from "../../../../helpers/delay";

fixture("BookingCalendar").page("http://localhost:6060/#/BookingCalendar");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/appointment-bookings/BookingCalendar/index.tsx yarn dev
 * yarn testcafe ./src/components/appointment-bookings/BookingCalendar/_tests/index.intg.ts
 * ```
 */
test("Select today", async (t) => {
  const selector = Selector(selectDemo("BookingCalendar", "standard"));

  const component = new BookingCalendarCtrl(
    selector.find(selectComponent()),
    t,
  );
  // const start = await selector.getAttribute(toAttribute("start"));
  // const end = await selector.getAttribute(toAttribute("end"));

  let output = null;

  const todayDateStr = await component.clickToday();
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).contains(todayDateStr);

  // push the availability back to next month
  const availability = new ButtonCtrl(selector.find(selectAction("mode")), t);
  await availability.click();

  // TODO
  await delay(2000);
  // await component.clickNextAvailable();
});
