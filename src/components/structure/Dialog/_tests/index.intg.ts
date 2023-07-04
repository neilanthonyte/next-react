import { Selector } from "testcafe";

import {
  selectAttribute,
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { DialogCtrl } from "./index.ctrl";

fixture("Dialog").page("http://localhost:6060/#!/Dialog");

test("Can click footer's accept button", async (t) => {
  const selector = Selector(selectDemo("Dialog", "accept"));

  const component = new DialogCtrl(selector.find(selectComponent()), t);

  let output = null;
  output = await selector.getAttribute(selectAttribute("output"));

  await component.footer.clickAccept();
  await t.expect(output).contains("Accept");
});

test("When children, renders children", async (t) => {
  const selector = Selector(selectDemo("Dialog", "standard"));

  const component = new DialogCtrl(selector.find(selectComponent()), t);

  await component.hasContent();
});
