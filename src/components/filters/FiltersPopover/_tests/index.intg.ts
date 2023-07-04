import { Selector } from "testcafe";

import {
  selectComponent,
  selectDemo,
  toTestSelector,
} from "next-shared/src/helpers/toTestSelector";

import { FiltersPopoverCtrl } from "./index.ctrl";
import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";
import { FILTERS_POPOVER_CONTENT_TAG } from "../readme";

fixture("FiltersPopover").page("http://localhost:6060/#/FiltersPopover");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/filters/FiltersPopover/index.tsx yarn dev
 * yarn testcafe ./src/components/filters/FiltersPopover/_tests/index.intg.ts
 * ```
 */
test("Popover works correctly", async (t) => {
  const selector = Selector(selectDemo("FiltersPopover", "standard"));

  const component = new FiltersPopoverCtrl(selector.find(selectComponent()), t);

  const openButton = new ButtonCtrl(selector.find(toTestSelector("open")), t);

  await openButton.click();
  await component.element.exists();
  const popoverContent = await component.element.findInBody("content");
  await t.expect(popoverContent.innerText).eql(FILTERS_POPOVER_CONTENT_TAG);
});
