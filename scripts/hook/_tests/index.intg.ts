import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("HOOK_NAME").page("http://localhost:6060/#/HOOK_NAME");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/hooks/HOOK_FOLDER/HOOK_NAME/index.tsx yarn dev
 * yarn testcafe ./src/hooks/HOOK_FOLDER/HOOK_NAME/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(toTestSelector("HOOK_NAME-scenario-standard"));
  const output = selector.find(toTestSelector("output"));
  const reset = selector.find(toTestSelector("reset"));

  // await t.expect(output.innerText).contains("Foo");
  // await t.click(reset);
  // await t.expect(output.innerText).contains("null");
});
