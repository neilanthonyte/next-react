import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { LocationPickerCtrl } from "./index.ctrl";

fixture("LocationPicker").page("http://localhost:6060/#/LocationPicker");

test("Clicking on a location fires the onLocationSelected correctly", async (t) => {
  const example = Selector(toTestSelector("LocationPicker-scenario-standard"));

  const picker = example.find(toTestSelector("picker"));
  const output = example.find(toTestSelector("output"));
  const locationPicker = new LocationPickerCtrl(picker, t);
  // selection
  await t.expect(await output.innerText).eql("null");
  await locationPicker.clickLocation("DEV CLINIC - REPLACE ME");
  const inner = JSON.parse(await output.innerText);
  await t.expect(inner.title).eql("DEV CLINIC - REPLACE ME");

  // filtering
  await locationPicker.selectState("NSW");
  await locationPicker.expectLocationsShowing([
    "DEV CLINIC - REPLACE ME",
    "Erina",
    "GenBiome - Edgecliff",
    "Sydney",
    "Manly Medical Centre",
    "Next Head Office - Demo",
    "Next Support Office",
    "Potts Point",
  ]);
  await locationPicker.selectState("VIC");
  await locationPicker.expectLocationsShowing(["Black Rock", "Prahran"]);

  // show all again
  await locationPicker.selectAllStates();
  await locationPicker.expectLocationsShowing([
    "DEV CLINIC - REPLACE ME",
    "Erina",
    "GenBiome - Edgecliff",
    "Sydney",
    "Manly Medical Centre",
    "Next Head Office - Demo",
    "Next Support Office",
    "Potts Point",
    "Black Rock",
    "Prahran",
  ]);
});

test("Clicking the show more button shows more locations", async (t) => {
  const example = Selector(toTestSelector("LocationPicker-scenario-limit"));
  const locationPicker = new LocationPickerCtrl(example, t);

  await locationPicker.expectAmountOfLocationsShowingToEqual(4);
  await locationPicker.showMoreButton.expectLabel("Show all");
  await locationPicker.showMoreButton.click();
  await locationPicker.expectAmountOfLocationsShowingToEqual(10);
  await locationPicker.showMoreButton.expectLabel("Show less");
});
