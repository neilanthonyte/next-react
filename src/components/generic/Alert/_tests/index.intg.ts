import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { Selector } from "testcafe";
import { AlertCtrl } from "./index.ctrl";

fixture("Alert").page("http://localhost:6060/#/Alert");

test("If children, it renders body content", async (t: TestController) => {
  const alertCtrl = new AlertCtrl(
    Selector(toTestSelector("alert-scenario-with-children-and-header")),
    t,
  );
  await alertCtrl.expectToShowBodyContent(
    "Watch out! Make sure you've saved your password.",
  );
});

test("If header, it renders header content", async (t: TestController) => {
  const alertCtrl = new AlertCtrl(
    Selector(toTestSelector("alert-scenario-with-children-and-header")),
    t,
  );
  await alertCtrl.expectToShowHeader("Password Notice");
});

test("If no header, it does not render header content", async (t: TestController) => {
  const alertCtrl = new AlertCtrl(
    Selector(toTestSelector("alert-scenario-with-children-no-header")),
    t,
  );

  await alertCtrl.expectHeaderToBeHidden();
});

test("If close icon, it renders close icon", async (t: TestController) => {
  const alertCtrl = new AlertCtrl(
    Selector(toTestSelector("alert-scenario-with-variant")),
    t,
  );

  await alertCtrl.expectToShowCloseIcon();
});

test("If close icon false close icon is hidden", async (t: TestController) => {
  const alertCtrl = new AlertCtrl(
    Selector(toTestSelector("alert-scenario-with-no-close")),
    t,
  );

  await alertCtrl.expectCloseIconToBeHidden();
});

test("If close icon clicked hides alert", async (t: TestController) => {
  const alertCtrl = new AlertCtrl(
    Selector(toTestSelector("alert-scenario-with-children-and-header")),
    t,
  );

  await alertCtrl.expectCloseIconToHideAlertOnClick();
});

test("If variant prop provided apply classname", async (t: TestController) => {
  const alertCtrl = new AlertCtrl(
    Selector(toTestSelector("alert-scenario-with-variant")),
    t,
  );

  await alertCtrl.expectToSeeVariantClassNameIfVariantProvided("warning");
});
