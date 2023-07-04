import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { PatientFormsListCtrl } from "./index.ctrl";

fixture("PatientFormsList").page("http://localhost:6060/#/PatientFormsList");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/atoms/PatientFormsList/index.tsx yarn dev
 * yarn testcafe ./src/components/atoms/PatientFormsList/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("PatientFormsList-scenario-standard"),
  );
  const component = new PatientFormsListCtrl(
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
