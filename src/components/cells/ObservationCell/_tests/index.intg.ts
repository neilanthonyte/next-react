import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { ObservationCellCtrl } from "./index.ctrl";

fixture("ObservationCell").page("http://localhost:6060/#/ObservationCell");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/cells/ObservationCell/index.tsx yarn dev
 * yarn testcafe ./src/components/cells/ObservationCell/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("ObservationCell-scenario-standard"),
  );
  const component = new ObservationCellCtrl(
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
