import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { PatientEmergencyContactCellCtrl } from "./index.ctrl";

fixture("PatientEmergencyContactCell").page(
  "http://localhost:6060/#/PatientEmergencyContactCell",
);

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/cells/PatientEmergencyContactCell/index.tsx yarn dev
 * yarn testcafe ./src/components/cells/PatientEmergencyContactCell/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("PatientEmergencyContactCell-scenario-standard"),
  );
  const component = new PatientEmergencyContactCellCtrl(
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
