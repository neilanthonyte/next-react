import { Selector } from "testcafe";
import {
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";
import { AppointmentOtherConcernsCtrl } from "./index.ctrl";
import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";
import { demoIsLoading } from "../../../../helpers/demoIsLoading";

fixture("AppointmentOtherConcerns").page(
  "http://localhost:6060/#/AppointmentOtherConcerns",
);

test("Validate additional time required for appointment", async (t) => {
  const selector = Selector(selectDemo("AppointmentOtherConcerns", "standard"));
  const component = new AppointmentOtherConcernsCtrl(
    selector.find(selectComponent()),
    t,
  );
  const appointmentInput = new ButtonCtrl(
    selector.find(`[data-action="appointment-newPatientAppointment"]`),
    t,
  );

  await demoIsLoading(selector);
  await appointmentInput.click();
  await component.bookingOptions.clickMultipleIssuesAnswer("No");
  await component.validateOutput(0);
  await component.bookingOptions.clickMultipleIssuesAnswer("Yes");
  await component.bookingOptions.clickLengthAnswer(25);
  await component.validateOutput(10);
  await component.bookingOptions.clickLengthAnswer(35);
  await component.validateOutput(20);
});
