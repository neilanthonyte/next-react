import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { PatientAppointmentFormModalCtrl } from "./index.ctrl";

fixture("PatientAppointmentFormModal").page(
  "http://localhost:6060/#/PatientAppointmentFormModal",
);

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/modals/PatientAppointmentFormModal/index.tsx yarn dev
 * yarn testcafe ./src/components/modals/PatientAppointmentFormModal/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("PatientAppointmentFormModal-scenario-standard"),
  );
  const component = new PatientAppointmentFormModalCtrl(
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
