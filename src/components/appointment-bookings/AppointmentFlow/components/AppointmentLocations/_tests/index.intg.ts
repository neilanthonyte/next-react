import { Selector } from "testcafe";
import {
  selectAttribute,
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";
import { AppointmentLocationsCtrl } from "./index.ctrl";
import { EAppointmentLocations } from "../EAppointmentLocations";

fixture("AppointmentLocations").page(
  "http://localhost:6060/#/AppointmentLocations",
);

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/appointment-bookings/AppointmentFlow/components/AppointmentLocations/index.tsx yarn dev
 * yarn testcafe ./src/components/appointment-bookings/AppointmentFlow/components/AppointmentLocations/_tests/index.intg.ts
 * ```
 */
test("Select first location - Surry Hills", async (t) => {
  const selector = Selector(selectDemo("AppointmentLocations", "standard"));
  const component = new AppointmentLocationsCtrl(
    selector.find(selectComponent()),
    t,
  );
  let output = null;

  await component.clickAustralianState(EAppointmentLocations.NSW);
  await component.location.click();
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).contains("Surry Hills");
});

/* TODO: 
  Add test coverage for the location search bar
  Search for postcode that is nearest to a clinic and ensure the correct clinic returns
  Enter an invalid input and ensure no clinics are returned
*/
