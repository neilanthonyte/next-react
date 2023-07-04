import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("useAnatomies").page("http://localhost:6060/#/useAnatomies");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/hooks/content/useAnatomies/index.tsx yarn dev
 * yarn testcafe ./src/hooks/content/useAnatomies/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(toTestSelector("useAnatomies-scenario-standard"));
  const output = selector.find(toTestSelector("output"));
  const reset = selector.find(toTestSelector("reset"));

  // await t.expect(output.innerText).contains("Foo");
  // await t.click(reset);
  // await t.expect(output.innerText).contains("null");
});
