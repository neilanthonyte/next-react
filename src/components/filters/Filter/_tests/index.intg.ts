import { Selector } from "testcafe";

import {
  selectAction,
  selectAttribute,
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { FilterCtrl } from "./index.ctrl";
import { FILTER_TYPE_ACTION, FILTER_VALUE_DEMO } from "../readme";
import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";
import { SingleOptionsInputCtrl } from "../../../inputs/SingleOptionsInput/_tests/index.ctrl";

fixture("Filter").page("http://localhost:6060/#/Filter");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/filters/Filter/index.tsx yarn dev
 * yarn testcafe ./src/components/filters/Filter/_tests/index.intg.ts
 * ```
 */
test("Displays correctly", async (t) => {
  const selector = Selector(selectDemo("Filter", "standard"));

  const component = new FilterCtrl(selector.find(selectComponent()), t);
  const toggleTypeAction = new ButtonCtrl(
    selector.find(selectAction(FILTER_TYPE_ACTION)),
    t,
  );

  await component.element.exists(true);
  // if switching to secondary and no value set, it should't be rendered
  await toggleTypeAction.click();
  await component.element.exists(false);
});

test("Can set and clear a value", async (t) => {
  const selector = Selector(selectDemo("Filter", "standard"));

  const component = new FilterCtrl(selector.find(selectComponent()), t);

  await component.element.click();
  await component.filterPopover.element.exists();

  const optionsInputSelector = new SingleOptionsInputCtrl(
    await component.filterPopover.element.findInBody("options-input"),
    t,
  );

  let output = null;
  await optionsInputSelector.setValue(FILTER_VALUE_DEMO);
  await component.element.expectLabel(FILTER_VALUE_DEMO);

  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).eql(FILTER_VALUE_DEMO);

  await component.element.clear();
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).notOk();
});
