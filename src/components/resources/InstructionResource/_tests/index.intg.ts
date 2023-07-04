import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { InstructionResourceCtrl } from "./index.ctrl";

fixture("InstructionResource").page(
  "http://localhost:6060/#/InstructionResource",
);

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/resources/InstructionResource/index.tsx yarn dev
 * yarn testcafe ./src/components/resources/InstructionResource/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("InstructionResource-scenario-standard"),
  );
  const component = new InstructionResourceCtrl(
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
