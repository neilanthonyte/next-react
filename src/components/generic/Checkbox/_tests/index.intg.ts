import { CheckboxCtrl } from "./index.ctrl";
import { Selector } from "testcafe";
import {
  selectAttribute,
  selectComponent,
  selectDemo,
  toTestSelector,
} from "next-shared/src/helpers/toTestSelector";
import { ECheckboxStatus } from "..";

fixture("Checkbox").page("http://localhost:6060/#/Checkbox");

// TODO
test.skip("checkbox size should be controllable via the font size style of its parent tag", async (t) => {});

// TODO
test.skip("checkbox should be styled based on the provided variant", async (t) => {});

// TODO
test.skip("checkbox should render the fallback icon should the specified icon be not found and the fallback be provided", async (t) => {});

// TODO
test.skip("checkbox size should be controllable via the size attribute", async (t) => {});

test("clicking a checkbox should invoke the provided onClick callback", async (t) => {
  const selector = Selector(selectDemo("Checkbox", "click"));
  const component = new CheckboxCtrl(selector.find(selectComponent()), t);

  let output = null;

  await component.click();
  await component.expectStatus(ECheckboxStatus.Successful);
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).eql("true");

  await component.click();
  await component.expectStatus(ECheckboxStatus.Unchecked);
  await t.expect(output).eql("false");
});
