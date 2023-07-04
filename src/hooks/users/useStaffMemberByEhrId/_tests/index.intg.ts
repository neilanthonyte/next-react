import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("useStaffMemberByEhrId").page(
  "http://localhost:6060/#/useStaffMemberByEhrId",
);

/**
 * To run:
 *
 * ```
 * PATTERN=./src/hooks/hooks/useStaffMemberByEhrId/index.tsx yarn dev
 * yarn testcafe ./src/hooks/hooks/useStaffMemberByEhrId/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("useStaffMemberByEhrId-scenario-standard"),
  );
  const output = selector.find(toTestSelector("output"));
  const reset = selector.find(toTestSelector("reset"));

  // await t.expect(output.innerText).contains("Foo");
  // await t.click(reset);
  // await t.expect(output.innerText).contains("null");
});
