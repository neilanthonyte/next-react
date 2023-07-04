import { Selector } from "testcafe";

import {
  selectAction,
  selectAttribute,
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { FiltersCtrl } from "./index.ctrl";
import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";
import { FILTERS_APPLY_FILTERS_ACTION, FILTERS_VALUE_DEMO } from "../readme";
import { SingleOptionsInputCtrl } from "../../../inputs/SingleOptionsInput/_tests/index.ctrl";

fixture("Filters").page("http://localhost:6060/#/Filters");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/filters/Filters/index.tsx yarn dev
 * yarn testcafe ./src/components/filters/Filters/_tests/index.intg.ts
 * ```
 */
test("Renders filters and basic behaviour", async (t) => {
  const selector = Selector(selectDemo("Filters", "standard"));

  const component = new FiltersCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.expectFiltersSummaryCount(false);
  const filterCtrl = await component.openFilterPopover(0);

  const optionsInputSelector = new SingleOptionsInputCtrl(
    await filterCtrl.filterPopover.element.findInBody("options-input"),
    t,
  );

  await optionsInputSelector.setValue(FILTERS_VALUE_DEMO);
  await filterCtrl.element.expectLabel(FILTERS_VALUE_DEMO);

  let output = null;

  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).eql(FILTERS_VALUE_DEMO);
});

test("Can manually apply filters via callback from a button", async (t) => {
  const selector = Selector(selectDemo("Filters", "standard"));

  const component = new FiltersCtrl(selector.find(selectComponent()), t);

  const applyFiltersBtn = new ButtonCtrl(
    selector.find(selectAction(FILTERS_APPLY_FILTERS_ACTION)),
    t,
  );
  await applyFiltersBtn.click();

  const filterCtrl = await component.openFilterPopover(0);

  const optionsInputSelector = new SingleOptionsInputCtrl(
    await filterCtrl.filterPopover.element.findInBody("options-input"),
    t,
  );

  await optionsInputSelector.setValue(FILTERS_VALUE_DEMO);

  let output = null;

  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).notOk();

  await component.clickApplyFiltersBtn();
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).eql(FILTERS_VALUE_DEMO);
});

test("It correctly handles secondary filters", async (t) => {
  const selector = Selector(selectDemo("Filters", "secondary"));

  const component = new FiltersCtrl(selector.find(selectComponent()), t);

  await component.expectFilterTagsCount(1);
  await component.expectFiltersSummaryCountLabel("1 of 2");

  await component.expectFilterSummaryPopover();

  const optionsInputSelector = new SingleOptionsInputCtrl(
    await component.filtersSummaryPopover.element.findInBody("options-input"),
    t,
  );

  await optionsInputSelector.setValue(FILTERS_VALUE_DEMO);

  await component.expectFilterTagsCount(2);
  await component.expectFiltersSummaryCountLabel("2 of 2");
});
