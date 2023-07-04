import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { AppointmentsPanelCtrl } from "./index.ctrl";

fixture("AppointmentsPanel").page("http://localhost:6060/#/AppointmentsPanel");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/bar-panels/AppointmentsPanel/index.tsx yarn dev
 * yarn testcafe ./src/components/bar-panels/AppointmentsPanel/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("AppointmentsPanel-scenario-standard"),
  );
  const component = new AppointmentsPanelCtrl(
    selector.find(toTestSelector("component")),
    t,
  );
  const output = selector.find(toTestSelector("output"));
  const reset = selector.find(toTestSelector("reset"));

  // await item.expectText("Foo");
  // await item.click();
  // await t.expect(output.innerText).contains("Foo");
  // await t.click(reset);
  // await t.expect(output.innerText).contains("null");
});
