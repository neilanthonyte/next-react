import { Selector } from "testcafe";
import * as _ from "lodash";

import {
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { COMPONENT_NAMECtrl } from "./index.ctrl";

fixture("COMPONENT_NAME").page("http://localhost:6060/#/COMPONENT_NAME");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/COMPONENT_FOLDER/COMPONENT_NAME/index.tsx yarn dev
 * yarn testcafe ./src/components/COMPONENT_FOLDER/COMPONENT_NAME/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(selectDemo("COMPONENT_NAME", "standard"));

  const component = new COMPONENT_NAMECtrl(selector.find(selectComponent()), t);

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
