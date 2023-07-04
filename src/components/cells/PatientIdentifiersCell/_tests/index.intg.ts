import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { PatientIdentifiersCellCtrl } from "./index.ctrl";

fixture("PatientIdentifiersCell").page(
  "http://localhost:6060/#/PatientIdentifiersCell",
);

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/cells/PatientIdentifiersCell/index.tsx yarn dev
 * yarn testcafe ./src/components/cells/PatientIdentifiersCell/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("PatientIdentifiersCell-scenario-standard"),
  );
  const component = new PatientIdentifiersCellCtrl(
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
