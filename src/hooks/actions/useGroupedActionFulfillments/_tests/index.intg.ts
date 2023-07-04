import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("useGroupedActionFulfillments").page(
  "http://localhost:6060/#/useGroupedActionFulfillments",
);

/**
 * To run:
 *
 * ```
 * PATTERN=./src/hooks/actions/useGroupedActionFulfillments/index.tsx yarn dev
 * yarn testcafe ./src/hooks/actions/useGroupedActionFulfillments/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("useGroupedActionFulfillments-scenario-standard"),
  );
  const output = selector.find(toTestSelector("output"));
  const reset = selector.find(toTestSelector("reset"));

  // await t.expect(output.innerText).contains("Foo");
  // await t.click(reset);
  // await t.expect(output.innerText).contains("null");
});
