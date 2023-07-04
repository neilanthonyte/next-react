import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("useDebugSocketWatcher.ts").page(
  "http://localhost:6060/#/useDebugSocketWatcher.ts",
);

/**
 * To run:
 *
 * ```
 * PATTERN=./src/hooks/hooks/useDebugSocketWatcher.ts/index.tsx yarn dev
 * yarn testcafe ./src/hooks/hooks/useDebugSocketWatcher.ts/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("useDebugSocketWatcher-scenario-standard"),
  );
  const output = selector.find(toTestSelector("output"));
  const reset = selector.find(toTestSelector("reset"));

  // await t.expect(output.innerText).contains("Foo");
  // await t.click(reset);
  // await t.expect(output.innerText).contains("null");
});
