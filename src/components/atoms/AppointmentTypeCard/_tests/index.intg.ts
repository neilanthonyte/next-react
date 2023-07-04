import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { AppointmentTypeCardCtrl } from "./index.ctrl";

fixture("AppointmentTypeCard").page(
  "http://localhost:6060/#/AppointmentTypeCard",
);

test("Displays the appointment label correctly", async (t) => {
  const example = Selector(
    toTestSelector("AppointmentTypeCard-scenario-standard"),
  );
  const appointmentTypeCard = new AppointmentTypeCardCtrl(example, t);

  await appointmentTypeCard.expectLabel("Standard");
});

test("Displays the appointment description", async (t) => {
  const example = Selector(
    toTestSelector("AppointmentTypeCard-scenario-standard"),
  );
  const appointmentTypeCard = new AppointmentTypeCardCtrl(example, t);

  await appointmentTypeCard.expectDescription(
    "If you like tuna and tomato sauce - try combining the two. It’s really not as bad as it sounds.",
  );
});

test("Clicking it works as expected", async (t) => {
  const example = Selector(
    toTestSelector("AppointmentTypeCard-scenario-standard"),
  );
  const appointmentTypeCard = new AppointmentTypeCardCtrl(example, t);

  const clickedSpan = example.find(toTestSelector("clicked"));

  await t.expect(await clickedSpan.innerText).eql("no");

  await appointmentTypeCard.card.click();

  await t.expect(await clickedSpan.innerText).eql("yes");
});
