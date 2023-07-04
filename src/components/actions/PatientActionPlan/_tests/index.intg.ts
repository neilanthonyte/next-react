import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { PatientActionPlanCtrl } from "./index.ctrl";

fixture("PatientActionPlan").page("http://localhost:6060/#/PatientActionPlan");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/actions/PatientActionPlan/index.tsx yarn dev
 * yarn testcafe ./src/components/actions/PatientActionPlan/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("PatientActionPlan-scenario-standard"),
  );
  const component = new PatientActionPlanCtrl(
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
