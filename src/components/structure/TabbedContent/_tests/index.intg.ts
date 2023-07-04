import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { TabbedContentCtrl } from "./index.ctrl";

fixture("TabbedContent").page("http://localhost:6060/#/TabbedContent");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/structure/TabbedContent/index.tsx yarn dev
 * yarn testcafe ./src/components/structure/TabbedContent/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(toTestSelector("TabbedContent-scenario-standard"));
  const component = new TabbedContentCtrl(
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
