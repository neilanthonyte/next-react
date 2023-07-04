import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { LocationWelcomePageCtrl } from "./index.ctrl";

fixture("LocationWelcomePage").page(
  "http://localhost:6060/#/LocationWelcomePage",
);

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/generic/LocationWelcomePage/index.tsx yarn dev
 * yarn testcafe ./src/components/generic/LocationWelcomePage/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("LocationWelcomePage-scenario-standard"),
  );
  const component = new LocationWelcomePageCtrl(
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
