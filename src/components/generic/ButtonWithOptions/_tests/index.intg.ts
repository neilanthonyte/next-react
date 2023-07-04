import { Selector } from "testcafe";

import {
  selectAttribute,
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { ButtonWithOptionsCtrl } from "./index.ctrl";
import {
  BUTTONWITHOPTIONS_DEFAULT_OUTPUT,
  BUTTONWITHOPTIONS_OUTPUT,
} from "../readme";

fixture("ButtonWithOptions").page("http://localhost:6060/#/ButtonWithOptions");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/generic/ButtonWithOptions/index.tsx yarn dev
 * yarn testcafe ./src/components/generic/ButtonWithOptions/_tests/index.intg.ts
 * ```
 */
test("Options decoration and behaviour", async (t) => {
  const selector = Selector(selectDemo("ButtonWithOptions", "standard"));

  const component = new ButtonWithOptionsCtrl(
    selector.find(selectComponent()),
    t,
  );

  await component.button.expectOptionsDecoration();
  await component.button.click();
  await component.optionsPopover.exists();
  await component.optionsPopover.pickOption(0);

  const output = await selector.getAttribute(selectAttribute("output"));

  await t.expect(output).eql(BUTTONWITHOPTIONS_OUTPUT);
});

test("Options with default action behaviour", async (t) => {
  const selector = Selector(selectDemo("ButtonWithOptions", "default-action"));

  const component = new ButtonWithOptionsCtrl(
    selector.find(selectComponent()),
    t,
  );

  let output = null;

  await component.button.expectOptionsDecoration();
  await component.button.click();

  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).eql(BUTTONWITHOPTIONS_DEFAULT_OUTPUT);

  await component.button.clickOptionsDecoration();
  await component.optionsPopover.exists();
  await component.optionsPopover.pickOption(0);

  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).eql(BUTTONWITHOPTIONS_OUTPUT);
});
