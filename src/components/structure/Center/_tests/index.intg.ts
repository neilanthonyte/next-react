import { Selector } from "testcafe";
import * as _ from "lodash";

import {
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { CenterCtrl } from "./index.ctrl";

fixture("Center").page("http://localhost:6060/#/Center");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/companion/Center/index.tsx yarn dev
 * yarn testcafe ./src/components/companion/Center/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(selectDemo("Center", "standard"));

  const component = new CenterCtrl(selector.find(selectComponent()), t);

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
