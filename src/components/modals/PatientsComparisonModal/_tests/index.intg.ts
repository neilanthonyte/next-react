import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { PatientsComparisonModalCtrl } from "./index.ctrl";

fixture("PatientsComparisonModal").page(
  "http://localhost:6060/#/PatientsComparisonModal",
);

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/modals/PatientsComparisonModal/index.tsx yarn dev
 * yarn testcafe ./src/components/modals/PatientsComparisonModal/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("PatientsComparisonModal-scenario-standard"),
  );
  const component = new PatientsComparisonModalCtrl(
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
