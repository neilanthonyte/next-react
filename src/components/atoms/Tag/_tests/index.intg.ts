import { Selector } from "testcafe";

import {
  selectAction,
  selectAttribute,
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { TagCtrl } from "./index.ctrl";
import {
  TAG_CLEAR_OUTPUT,
  TAG_CLICK_OUTPUT,
  TAG_COLLAPSIBLE_DECORATION_ACTION,
  TAG_CONTENT_DEMO,
  TAG_IS_CLEARABLE_ACTION,
} from "../readme";
import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";

fixture("Tag").page("http://localhost:6060/#/Tag");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/atoms/Tag/index.tsx yarn dev
 * yarn testcafe ./src/components/atoms/Tag/_tests/index.intg.ts
 * ```
 */
test("Renders a clickable tag and toggles collapsible decoration", async (t) => {
  const selector = Selector(selectDemo("Tag", "standard"));

  const component = new TagCtrl(selector.find(selectComponent()), t);
  const toggleCollapsibleDecorationAction = new ButtonCtrl(
    selector.find(selectAction(TAG_COLLAPSIBLE_DECORATION_ACTION)),
    t,
  );

  const output = await selector.getAttribute(selectAttribute("output"));

  await component.exists(true);
  await component.expectLabel(TAG_CONTENT_DEMO);
  await component.expectClearButton(false);
  await component.expectCollapsibleDecoration(false);
  await toggleCollapsibleDecorationAction.click();
  await component.click();
  await t.expect(output).contains(TAG_CLICK_OUTPUT);
});

test("Renders an interactible clear button", async (t) => {
  const selector = Selector(selectDemo("Tag", "clearable"));

  const component = new TagCtrl(selector.find(selectComponent()), t);
  const toggleIsClearableAction = new ButtonCtrl(
    selector.find(selectAction(TAG_IS_CLEARABLE_ACTION)),
    t,
  );

  let output = null;
  await component.expectClearButton(true);
  await component.clear();
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).notOk();
  await toggleIsClearableAction.click();
  await component.clear();
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).contains(TAG_CLEAR_OUTPUT);
});
