import { Selector } from "testcafe";
import * as _ from "lodash";

import {
  selectAction,
  selectAttribute,
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";
import { ScopeEhrPatientSignupFlowCtrl } from "./index.ctrl";
import { demoIsLoading } from "../../../../helpers/demoIsLoading";

fixture("ScopeEhrPatientSignupFlow").page(
  "http://localhost:6060/#/ScopeEhrPatientSignupFlow",
);

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/atoms/ScopeEhrPatientSignupFlow/index.tsx yarn dev
 * yarn testcafe ./src/components/atoms/ScopeEhrPatientSignupFlow/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    selectDemo("ScopeEhrPatientSignupFlow", "standard"),
  );

  const component = new ScopeEhrPatientSignupFlowCtrl(
    selector.find(selectComponent()),
    t,
  );

  // Wait for all async content to load by expecting providers to expose their loading state through a data-isloading attribute
  // await demoIsLoading(selector);

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
