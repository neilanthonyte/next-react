import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { PatientActionsListCtrl } from "./index.ctrl";

fixture("PatientActionsList").page(
  "http://localhost:6060/#/PatientActionsList",
);

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/actions/PatientActionsList/index.tsx yarn dev
 * yarn testcafe ./src/components/actions/PatientActionsList/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("PatientActionsList-scenario-standard"),
  );
  const component = new PatientActionsListCtrl(
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
