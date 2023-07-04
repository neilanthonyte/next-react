import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("useBlogArticles").page("http://localhost:6060/#/useBlogArticles");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/hooks/content/useBlogArticles/index.tsx yarn dev
 * yarn testcafe ./src/hooks/content/useBlogArticles/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("useBlogArticles-scenario-standard"),
  );
  const output = selector.find(toTestSelector("output"));
  const reset = selector.find(toTestSelector("reset"));

  // await t.expect(output.innerText).contains("Foo");
  // await t.click(reset);
  // await t.expect(output.innerText).contains("null");
});
