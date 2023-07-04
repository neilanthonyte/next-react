import { Selector } from "testcafe";
import * as _ from "lodash";

import {
  selectAction,
  selectAttribute,
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";
import { MedicalArticleStatusCtrl } from "./index.ctrl";

fixture("MedicalArticleStatus").page(
  "http://localhost:6060/#/MedicalArticleStatus",
);

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/medical-articles/MedicalArticleStatus/index.tsx yarn dev
 * yarn testcafe ./src/components/medical-articles/MedicalArticleStatus/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(selectDemo("MedicalArticleStatus", "standard"));

  const component = new MedicalArticleStatusCtrl(
    selector.find(selectComponent()),
    t,
  );

  // get attribute from test
  // const foo = await selector.getAttribute(toAttribute("foo"));

  // let output = null;

  // await component.click();
  // output = await selector.getAttribute(selectAttribute("output"));
  // await t.expect(output).contains("something");

  // const action = new ButtonCtrl(selector.find(selectAction("youraction")), t);
  // await action.click();
  // TODO perform check
});
