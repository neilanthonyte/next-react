import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { HcpCardCtrl } from "./index.ctrl";
import { delay } from "../../../../helpers/delay";

fixture("HcpCard").page("http://localhost:6060/#/HcpCard");

test("Displays the hcp name", async (t) => {
  const example = Selector(toTestSelector("HcpCard-scenario-standard"));
  const hcpCard = new HcpCardCtrl(example, t);

  await hcpCard.expectName("Kory Porter");
});

test("Displays the hcp description", async (t) => {
  const example = Selector(toTestSelector("HcpCard-scenario-standard"));
  const hcpCard = new HcpCardCtrl(example, t);

  await hcpCard.expectDescription("Emoji's are the cure 😄");
});

test("Displays the hcp bio", async (t) => {
  const example = Selector(toTestSelector("HcpCard-scenario-standard"));
  const hcpCard = new HcpCardCtrl(example, t);

  await hcpCard.expectBio(
    "Voluptate pariatur laboris ad amet laboris ad aliqua ad enim est dolor cupidatat ad cillum. Ad labore mollit ex consectetur. Commodo ullamco dolor est Lorem pariatur adipisicing.",
  );
});

test("Displays hcp's appointments if showAppointments is true", async (t) => {
  const example = Selector(toTestSelector("HcpCard-scenario-appointments"));
  const hcpCard = new HcpCardCtrl(example, t);

  const toggle = example.find(toTestSelector("toggle"));

  // we haven't toggled the button in the readme yet!
  await hcpCard.expectNumberOfAppointmentsShowingIs(0);

  await t.click(toggle);

  await hcpCard.expectNumberOfAppointmentsShowingIs(4);
});

test("Displays the correct appointments for a hcp", async (t) => {
  const example = Selector(toTestSelector("HcpCard-scenario-appointments"));
  const hcpCard = new HcpCardCtrl(example, t);

  // enables the showing of the practitioners appointments
  const toggle = example.find(toTestSelector("toggle"));
  await t.click(toggle);

  await hcpCard.expectAppointmentsShowingAre([
    "Standard v2",
    "Standard consult",
    "Long consult",
    "Flu vaccination",
  ]);
});

test("Clicking an appointment fires the onclick with the correct appointment details", async (t) => {
  const example = Selector(toTestSelector("HcpCard-scenario-appointments"));
  const hcpCard = new HcpCardCtrl(example, t);

  // enables the showing of the practitioners appointments
  const toggle = example.find(toTestSelector("toggle"));
  const appointmentLastClickedPreEl = example.find(toTestSelector("clicked"));

  await t.click(toggle);

  await hcpCard.clickAppointment("Flu vaccination");

  // this has the stringified contents of the clicked appointment
  const preElValue = await appointmentLastClickedPreEl.innerText;

  await t.expect(JSON.parse(preElValue)).eql({
    helixId: "6",
    // TODO: see if appointmentType.helixLabel (hard-coded type, Helix-specific) can just
    // revert to appointmentType.label (from CMS), to make this EHR-agnostic
    helixLabel: "Immunisation",
    label: "Flu vaccination",
    slug: "flu-vaccination",
    description: "Get your yearly vaccination to protect you against the flu.",
  });
});
