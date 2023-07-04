import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { LoginPinFormCtrl } from "./index.ctrl";

fixture("LoginPinForm").page("http://localhost:6060/#/LoginPinForm");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/forms/LoginPinForm/index.tsx yarn dev
 * yarn testcafe ./src/components/forms/LoginPinForm/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(toTestSelector("LoginPinForm-scenario-standard"));
  const component = new LoginPinFormCtrl(
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
