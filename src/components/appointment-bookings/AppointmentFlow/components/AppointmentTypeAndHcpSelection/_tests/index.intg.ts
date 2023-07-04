import { Selector } from "testcafe";
import { AppointmentTypeAndHcpSelectionCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

const selector = Selector(
  toTestSelector("PatientBookingForSelfOptions-scenario-standard"),
);
const output = selector.find(toTestSelector("output"));

fixture("AppointmentTypeAndHcpSelection").page(
  "http://localhost:6060/#/AppointmentTypeAndHcpSelection",
);

test("Appointment is for me", async (t) => {
  const item = new AppointmentTypeAndHcpSelectionCtrl(selector, t);
  await item.expectForMeButton("For me");
  await item.expectSomeoneElseButton("Someone else");
  await item.clickForMeButton();
  await t.expect(output.innerText).eql("true");
});

test("Appointment is for someone else", async (t) => {
  const item = new AppointmentTypeAndHcpSelectionCtrl(selector, t);
  await item.clickSomeoneElseButton();
  await t.expect(output.innerText).eql("false");
});
