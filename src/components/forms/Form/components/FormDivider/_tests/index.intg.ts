import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { FormDividerCtrl } from "./index.ctrl";

fixture("FormDivider").page("http://localhost:6060/#/FormDivider");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/components/FormDivider/index.tsx yarn dev
 * yarn testcafe ./src/components/components/FormDivider/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(toTestSelector("FormDivider-scenario-standard"));
  const component = new FormDividerCtrl(
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
