import { Selector } from "testcafe";

import {
  selectAction,
  selectAttribute,
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { FooterCtrl } from "./index.ctrl";
import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";
import {
  FOOTER_ACCEPT_LABEL_DEMO,
  FOOTER_ACCEPT_DISABLED_ACTION,
  FOOTER_CANCEL_LABEL_DEMO,
  FOOTER_ACTION_LABEL_DEMO,
} from "../readme";

fixture("Footer").page("http://localhost:6060/#/Footer");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/abstract/Footer/index.tsx yarn dev
 * yarn testcafe ./src/components/abstract/Footer/_tests/index.intg.ts
 * ```
 */
test("Renders content", async (t) => {
  const selector = Selector(selectDemo("Footer", "standard"));

  const component = new FooterCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.expectContent();
});

test("Can click and customise accept button", async (t) => {
  const selector = Selector(selectDemo("Footer", "accept-custom"));

  const component = new FooterCtrl(selector.find(selectComponent()), t);
  const disabledActionToggle = new ButtonCtrl(
    selector.find(selectAction(FOOTER_ACCEPT_DISABLED_ACTION)),
    t,
  );

  await component.acceptButton.expectLabel(FOOTER_ACCEPT_LABEL_DEMO);

  let output = null;
  await disabledActionToggle.click();
  await component.acceptButton.expectDisabled();

  await disabledActionToggle.click();
  await component.clickAccept();
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).eql(FOOTER_ACCEPT_LABEL_DEMO);
});

test("Can click and customise cancel button", async (t) => {
  const selector = Selector(selectDemo("Footer", "cancel-custom"));

  const component = new FooterCtrl(selector.find(selectComponent()), t);

  await component.cancelButton.expectLabel(FOOTER_CANCEL_LABEL_DEMO);

  let output = null;

  await component.clickCancel();
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).eql(FOOTER_CANCEL_LABEL_DEMO);
});

test("Can click custom action", async (t) => {
  const selector = Selector(selectDemo("Footer", "actions"));

  const component = new FooterCtrl(selector.find(selectComponent()), t);

  const actionCtrl = await component.getAction(1);
  const disabledActionCtrl = await component.getAction(2);
  await disabledActionCtrl.expectDisabled();

  await actionCtrl.expectLabel(FOOTER_ACTION_LABEL_DEMO);

  let output = null;

  await component.clickAction(1);
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).eql(FOOTER_ACCEPT_LABEL_DEMO);
});
