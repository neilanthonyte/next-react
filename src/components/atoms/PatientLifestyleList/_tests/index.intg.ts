import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { PatientLifestyleListCtrl } from "./index.ctrl";

fixture("PatientLifestyleList").page(
  "http://localhost:6060/#/PatientLifestyleList",
);

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/atoms/PatientLifestyleList/index.tsx yarn dev
 * yarn testcafe ./src/components/atoms/PatientLifestyleList/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("PatientLifestyleList-scenario-standard"),
  );
  const component = new PatientLifestyleListCtrl(
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
