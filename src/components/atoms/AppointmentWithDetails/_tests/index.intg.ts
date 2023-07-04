import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { AppointmentWithDetailsCtrl } from "./index.ctrl";

fixture("AppointmentWithDetails").page(
  "http://localhost:6060/#/AppointmentWithDetails",
);

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/atoms/AppointmentWithDetails/index.tsx yarn dev
 * yarn testcafe ./src/components/atoms/AppointmentWithDetails/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("AppointmentWithDetails-scenario-standard"),
  );
  const component = new AppointmentWithDetailsCtrl(
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
