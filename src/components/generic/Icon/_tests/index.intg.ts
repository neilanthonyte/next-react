import { IconCtrl } from "./index.ctrl";
import { Selector } from "testcafe";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("Icon").page("http://localhost:6060/#!/Icon");

test("If onClick prop, it executes the callback fn", async (t: TestController) => {
  const example = Selector(toTestSelector("Icon-scenario-click"));
  const component = new IconCtrl(example.find(toTestSelector("component")), t);

  const label = example.find(toTestSelector("label")).innerText;
  await t.expect(label).eql("");
  component.click();
  await t.expect(label).eql("Click");
});

test("If it wraps another Icon, it renders it", async (t: TestController) => {
  const example = Selector(toTestSelector("Icon-scenario-child-icon"));
  const component = new IconCtrl(example.find(toTestSelector("component")), t);

  await t.expect(await component.hasChildIcon()).ok();
});
