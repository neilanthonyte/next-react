import { Selector } from "testcafe";
import * as _ from "lodash";

import {
  selectAttribute,
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";
import { AppointmentMedicalStaffCtrl } from "./index.ctrl";
import { demoIsLoading } from "../../../../helpers/demoIsLoading";

fixture("AppointmentMedicalStaff").page(
  "http://localhost:6060/#/AppointmentMedicalStaff",
);

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/appointment-bookings/AppointmentMedicalStaff/readme.tsx yarn dev
 * yarn testcafe ./src/components/appointment-bookings/AppointmentMedicalStaff/_tests/index.intg.ts
 * ```
 */
test("Select Dr John Wick and Return Consult Appointment", async (t) => {
  const selector = Selector(selectDemo("AppointmentMedicalStaff", "standard"));
  const component = new AppointmentMedicalStaffCtrl(
    selector.find(selectComponent()),
    t,
  );

  await demoIsLoading(selector);
  const selectedStaff = await component.findMedicalStaffByTitle("Dr John Wick");
  await selectedStaff.click();
  const selectedAppointmentType =
    await selectedStaff.findAppointmentTypeByTitle("returnConsult");
  await selectedAppointmentType.clickAppointmentTypeCard();
  const output = await selector.getAttribute(selectAttribute("output"));
  await t
    .expect(output)
    .contains("Dr John Wick", "Does not contain Staff Member: Dr John Wick");
  await t
    .expect(output)
    .contains(
      "Return consult",
      "Does not contain Appointment Type: Return consult",
    );
});

test("Search Dr Bill Murray, select first Practitioner and select New patients Appointment", async (t) => {
  const selector = Selector(selectDemo("AppointmentMedicalStaff", "standard"));
  const component = new AppointmentMedicalStaffCtrl(
    selector.find(selectComponent()),
    t,
  );

  await demoIsLoading(selector);
  await component.searchInput.fillText("Bill Murray");
  const selectedStaff = await component.findMedicalStaffByIndex(0);
  await selectedStaff.click();
  const selectedAppointmentType =
    await selectedStaff.findAppointmentTypeByTitle("newPatients");
  await selectedAppointmentType.clickAppointmentTypeCard();
  const output = await selector.getAttribute(selectAttribute("output"));
  await t
    .expect(output)
    .contains(
      "Dr Bill Murray",
      "Does not contain Staff Member: Dr Bill Murray",
    );
  await t
    .expect(output)
    .contains(
      "New patients",
      "Does not contain Appointment Type: New patients",
    );
});
