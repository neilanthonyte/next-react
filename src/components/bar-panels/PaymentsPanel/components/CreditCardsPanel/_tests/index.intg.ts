import { Selector } from "testcafe";
import * as _ from "lodash";

import {
  selectAction,
  selectAttribute,
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { ButtonCtrl } from "../../../../../generic/Button/_tests/index.ctrl";
import { CreditCardsPanelCtrl } from "./index.ctrl";
import { demoIsLoading } from "../../../../../../helpers/demoIsLoading";

fixture("CreditCardsPanel").page("http://localhost:6060/#/CreditCardsPanel");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/components/CreditCardsPanel/index.tsx yarn dev
 * yarn testcafe ./src/components/components/CreditCardsPanel/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(selectDemo("CreditCardsPanel", "standard"));

  const component = new CreditCardsPanelCtrl(
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
