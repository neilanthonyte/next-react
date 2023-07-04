import { Selector } from "testcafe";

import {
  selectAttribute,
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { OptionsPopoverCtrl } from "./index.ctrl";
import {
  MOCK_OPTIONS_POPOVER_TEST_ATTRIBUTE,
  MOCK_OPTIONS_POPOVER_TEST_OPTION_LABEL,
  MOCK_OPTIONS_POPOVER_TEST_SECTION_LABEL,
} from "../readme";

fixture("OptionsPopover").page("http://localhost:6060/#/OptionsPopover");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/atoms/OptionsPopover/index.tsx yarn dev
 * yarn testcafe ./src/components/atoms/OptionsPopover/_tests/index.intg.ts
 * ```
 */
test("It selects an option correctly", async (t) => {
  const selector = Selector(selectDemo("OptionsPopover", "sections"));

  const component = new OptionsPopoverCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.pickOption(0);
  const selectedOptionLabel = selectAttribute(
    MOCK_OPTIONS_POPOVER_TEST_ATTRIBUTE,
  );
  await t
    .expect(selectedOptionLabel)
    .eql(MOCK_OPTIONS_POPOVER_TEST_OPTION_LABEL);
});

test("It renders section labels", async (t) => {
  const selector = Selector(selectDemo("OptionsPopover", "section-label"));

  const component = new OptionsPopoverCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.expectSectionLabel(
    0,
    MOCK_OPTIONS_POPOVER_TEST_SECTION_LABEL,
  );
});

test("It handles disabled state", async (t) => {
  const selector = Selector(selectDemo("OptionsPopover", "disabled"));

  const component = new OptionsPopoverCtrl(selector.find(selectComponent()), t);

  await component.exists();
  // click on enabled item to set the attribute first
  await component.pickOption(1);

  let selectedOptionLabel = await selector.getAttribute(
    selectAttribute(MOCK_OPTIONS_POPOVER_TEST_ATTRIBUTE),
  );

  await t
    .expect(selectedOptionLabel)
    .eql(MOCK_OPTIONS_POPOVER_TEST_OPTION_LABEL);

  // click on disabled option
  await component.pickOption(0);
  // reselect test attribute
  selectedOptionLabel = await selector.getAttribute(
    selectAttribute(MOCK_OPTIONS_POPOVER_TEST_ATTRIBUTE),
  );
  // make sure it's still the old value
  await t
    .expect(selectedOptionLabel)
    .eql(MOCK_OPTIONS_POPOVER_TEST_OPTION_LABEL);
});
