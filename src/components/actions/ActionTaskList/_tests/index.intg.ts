import { Selector } from "testcafe";
import * as _ from "lodash";

import {
  selectAction,
  selectAttribute,
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";
import { ActionTaskListCtrl } from "./index.ctrl";

fixture("ActionTaskList").page("http://localhost:6060/#/ActionTaskList");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/actions/ActionTaskList/index.tsx yarn dev
 * yarn testcafe ./src/components/actions/ActionTaskList/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(selectDemo("ActionTaskList", "standard"));

  const component = new ActionTaskListCtrl(selector.find(selectComponent()), t);

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
