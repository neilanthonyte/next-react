import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { NextPatientSignupOrSiginViewCtrl } from "./index.ctrl";

fixture("NextPatientSignupOrSiginView").page(
  "http://localhost:6060/#/NextPatientSignupOrSiginView",
);

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/views/NextPatientSignupOrSiginView/index.tsx yarn dev
 * yarn testcafe ./src/components/views/NextPatientSignupOrSiginView/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("NextPatientSignupOrSiginView-scenario-standard"),
  );
  const component = new NextPatientSignupOrSiginViewCtrl(
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
