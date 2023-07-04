import { Selector } from "testcafe";
import * as _ from "lodash";

import {
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { FoyerLogoViewCtrl } from "./index.ctrl";

fixture("FoyerLogoView").page("http://localhost:6060/#/FoyerLogoView");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/foyer/FoyerLogoView/index.tsx yarn dev
 * yarn testcafe ./src/components/foyer/FoyerLogoView/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(selectDemo("FoyerLogoView", "standard"));

  const component = new FoyerLogoViewCtrl(selector.find(selectComponent()), t);

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
