import { Selector } from "testcafe";
import {
  selectAttribute,
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";
import { AppointmentTypePromptIsNewCtrl } from "./index.ctrl";

fixture("AppointmentTypePromptIsNew").page(
  "http://localhost:6060/#/AppointmentTypePromptIsNew",
);

test("Patient has NOT been to clinic before", async (t) => {
  const selector = Selector(
    selectDemo("AppointmentTypePromptIsNew", "standard"),
  );
  const component = new AppointmentTypePromptIsNewCtrl(
    selector.find(selectComponent()),
    t,
  );
  let output = null;

  await component.clickNotYetButton();
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).contains("new");
});

test("Patient has been to clinic before", async (t) => {
  const selector = Selector(
    selectDemo("AppointmentTypePromptIsNew", "standard"),
  );
  const component = new AppointmentTypePromptIsNewCtrl(
    selector.find(selectComponent()),
    t,
  );
  let output = null;

  await component.clickYesButton();
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).contains("returning");
});
