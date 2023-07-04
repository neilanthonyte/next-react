import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { HcpReviewInboxCtrl } from "./index.ctrl";

fixture("HcpReviewInbox").page("http://localhost:6060/#/HcpReviewInbox");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/bar/HcpReviewInbox/index.tsx yarn dev
 * yarn testcafe ./src/components/bar/HcpReviewInbox/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(toTestSelector("HcpReviewInbox-scenario-standard"));
  const component = new HcpReviewInboxCtrl(
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
