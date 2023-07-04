import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { ReviewHandlerCtrl } from "./index.ctrl";

fixture("ReviewHandler").page("http://localhost:6060/#/ReviewHandler");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/handlers/ReviewHandler/index.tsx yarn dev
 * yarn testcafe ./src/components/handlers/ReviewHandler/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(toTestSelector("ReviewHandler-scenario-standard"));
  const component = new ReviewHandlerCtrl(
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
