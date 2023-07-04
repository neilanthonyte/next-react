import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { OptionsInputCtrl } from "./index.ctrl";

fixture("OptionsInput").page("http://localhost:6060/#/OptionsInput");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/inputs/OptionsInput/index.tsx yarn dev
 * yarn testcafe ./src/components/inputs/OptionsInput/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(toTestSelector("OptionsInput-scenario-standard"));
  const component = new OptionsInputCtrl(
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
