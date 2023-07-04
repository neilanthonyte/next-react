import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { LoginScreenCtrl } from "./index.ctrl";

fixture("LoginScreen").page("http://localhost:6060/#/LoginScreen");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/views/LoginScreen/index.tsx yarn dev
 * yarn testcafe ./src/components/views/LoginScreen/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(toTestSelector("LoginScreen-scenario-standard"));
  const component = new LoginScreenCtrl(
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
