import { Selector } from "testcafe";
import * as _ from "lodash";

import {
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { HcpBarSummaryCtrl } from "./index.ctrl";

fixture("HcpBarSummary").page("http://localhost:6060/#/HcpBarSummary");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/atoms/HcpBarSummary/index.tsx yarn dev
 * yarn testcafe ./src/components/atoms/HcpBarSummary/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(selectDemo("HcpBarSummary", "standard"));

  const component = new HcpBarSummaryCtrl(selector.find(selectComponent()), t);

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
