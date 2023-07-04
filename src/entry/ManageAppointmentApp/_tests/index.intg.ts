import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { ManageAppointmentAppCtrl } from "./index.ctrl";

fixture("ManageAppointmentApp").page(
  "http://localhost:6060/#/ManageAppointmentApp",
);

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/views/ManageAppointmentApp/index.tsx yarn dev
 * yarn testcafe ./src/components/views/ManageAppointmentApp/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("ManageAppointmentApp-scenario-standard"),
  );
  const component = new ManageAppointmentAppCtrl(
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
