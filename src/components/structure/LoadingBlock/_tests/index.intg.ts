import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { LoadingBlockCtrl } from "./index.ctrl";

fixture("LoadingBlock").page("http://localhost:6060/#/LoadingBlock");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/structure/LoadingBlock/index.tsx yarn dev
 * yarn testcafe ./src/components/structure/LoadingBlock/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(toTestSelector("LoadingBlock-scenario-standard"));
  const component = new LoadingBlockCtrl(
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
