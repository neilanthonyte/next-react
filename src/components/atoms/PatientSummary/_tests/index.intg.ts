import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { PatientSummaryCtrl } from "./index.ctrl";

fixture("PatientSummary").page("http://localhost:6060/#/PatientSummary");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/atoms/PatientSummary/index.tsx yarn dev
 * yarn testcafe ./src/components/atoms/PatientSummary/_tests/index.intg.ts
 * ```
 */
test("patient details display correctly", async (t) => {
  const selector = Selector(toTestSelector("PatientSummary-scenario-standard"));
  const component = new PatientSummaryCtrl(
    selector.find(toTestSelector("component")),
    t,
  );
  const output = selector.find(toTestSelector("output"));
  // const reset = selector.find(toTestSelector("reset"));

  await component.expectName("Mr John Smith");
  await component.expectDob("26th May 1991 (30)");
  // await component.click();
  // await t.expect(output.innerText).contains("Foo");
  // await t.click(reset);
  // await t.expect(output.innerText).contains("null");
});
