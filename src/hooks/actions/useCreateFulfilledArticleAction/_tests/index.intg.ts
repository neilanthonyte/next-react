import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("useCreateFulfilledArticleAction").page(
  "http://localhost:6060/#/useCreateFulfilledArticleAction",
);

/**
 * To run:
 *
 * ```
 * PATTERN=./src/hooks/actions/useCreateFulfilledArticleAction/index.tsx yarn dev
 * yarn testcafe ./src/hooks/actions/useCreateFulfilledArticleAction/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("useCreateFulfilledArticleAction-scenario-standard"),
  );
  const output = selector.find(toTestSelector("output"));
  const reset = selector.find(toTestSelector("reset"));

  // await t.expect(output.innerText).contains("Foo");
  // await t.click(reset);
  // await t.expect(output.innerText).contains("null");
});
