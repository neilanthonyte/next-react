import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { TimeInputCtrl } from "./index.ctrl";

fixture("TimeInput").page("http://localhost:6060/#/TimeInput");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/inputs/TimeInput/index.tsx yarn dev
 * yarn testcafe ./src/components/inputs/TimeInput/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(toTestSelector("TimeInput-scenario-standard"));
  const component = new TimeInputCtrl(
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
