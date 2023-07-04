import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { EhrPatientWelcomeSideBarCtrl } from "./index.ctrl";

fixture("EhrPatientWelcomeSideBar").page(
  "http://localhost:6060/#/EhrPatientWelcomeSideBar",
);

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/views/EhrPatientWelcomeSideBar/index.tsx yarn dev
 * yarn testcafe ./src/components/views/EhrPatientWelcomeSideBar/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("EhrPatientWelcomeSideBar-scenario-standard"),
  );
  const component = new EhrPatientWelcomeSideBarCtrl(
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
