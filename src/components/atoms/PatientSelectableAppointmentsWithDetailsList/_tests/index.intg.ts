import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { PatientSelectableAppointmentsWithDetailsListCtrl } from "./index.ctrl";

fixture("PatientSelectableAppointmentsWithDetailsList").page(
  "http://localhost:6060/#/PatientSelectableAppointmentsWithDetailsList",
);

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/atoms/PatientSelectableAppointmentsWithDetailsList/index.tsx yarn dev
 * yarn testcafe ./src/components/atoms/PatientSelectableAppointmentsWithDetailsList/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector(
      "PatientSelectableAppointmentsWithDetailsList-scenario-standard",
    ),
  );
  const component = new PatientSelectableAppointmentsWithDetailsListCtrl(
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
