import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { NextCompanionAppCtrl } from "./index.ctrl";

fixture("NextCompanionApp").page("http://localhost:6060/#/NextCompanionApp");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/entry/NextCompanionApp/index.tsx yarn dev
 * yarn testcafe ./src/components/entry/NextCompanionApp/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("NextCompanionApp-scenario-standard"),
  );
  const component = new NextCompanionAppCtrl(
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
