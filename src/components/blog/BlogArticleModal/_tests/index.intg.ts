import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { BlogArticleModalCtrl } from "./index.ctrl";

fixture("BlogArticleModal").page("http://localhost:6060/#/BlogArticleModal");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/blog-articles/BlogArticleModal/index.tsx yarn dev
 * yarn testcafe ./src/components/blog-articles/BlogArticleModal/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("BlogArticleModal-scenario-standard"),
  );
  const component = new BlogArticleModalCtrl(
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
