import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { ProfilePanelCtrl } from "./index.ctrl";

fixture("ProfilePanel").page("http://localhost:6060/#/ProfilePanel");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/bar-panels/ProfilePanel/index.tsx yarn dev
 * yarn testcafe ./src/components/bar-panels/ProfilePanel/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(toTestSelector("ProfilePanel-scenario-standard"));
  const component = new ProfilePanelCtrl(
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
