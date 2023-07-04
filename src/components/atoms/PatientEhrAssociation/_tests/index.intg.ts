import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { PatientEhrAssociationCtrl } from "./index.ctrl";

fixture("PatientEhrAssociation").page(
  "http://localhost:6060/#/PatientEhrAssociation",
);

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/atoms/PatientEhrAssociation/index.tsx yarn dev
 * yarn testcafe ./src/components/atoms/PatientEhrAssociation/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("PatientEhrAssociation-scenario-standard"),
  );
  const component = new PatientEhrAssociationCtrl(
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
