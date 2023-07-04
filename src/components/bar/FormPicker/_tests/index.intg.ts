import { Selector } from "testcafe";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { FormPickerCtrl } from "./index.ctrl";

fixture("FormPicker").page("http://localhost:6060/#!/FormPicker");

test("Render the correnct number of forms", async (t) => {
  const example = Selector(toTestSelector("FormPicker-scenario-base"));
  const component = new FormPickerCtrl(example, t);

  await t.expect(await component.countFormItems()).eql(3);
});

test("Selects the correct form on click", async (t) => {
  const example = Selector(toTestSelector("FormPicker-scenario-base"));
  const component = new FormPickerCtrl(example, t);
  const output = example.find(toTestSelector("output"));

  await component.clickForm(1);
  await t.expect(output.innerText).eql("flu");
});
