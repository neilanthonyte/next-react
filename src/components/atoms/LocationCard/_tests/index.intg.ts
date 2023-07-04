import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { LocationCardCtrl } from "./index.ctrl";

fixture("LocationCard").page("http://localhost:6060/#/LocationCard");

test("Displays the location name correctly", async (t) => {
  const example = Selector(toTestSelector("LocationCard-scenario-standard"));
  const locationCard = new LocationCardCtrl(example, t);

  await locationCard.expectName("DEV CLINIC - REPLACE ME");
});

test("Displays the location address", async (t) => {
  const example = Selector(toTestSelector("LocationCard-scenario-standard"));
  const locationCard = new LocationCardCtrl(example, t);

  await locationCard.expectAddress("80 Wentworth Avenue\nSurry Hills NSW 2010");
});

test("Clicking it works as expected", async (t) => {
  const example = Selector(toTestSelector("LocationCard-scenario-standard"));
  const locationCard = new LocationCardCtrl(example, t);

  const clickedSpan = example.find(toTestSelector("clicked-result"));

  await t.expect(await clickedSpan.innerText).eql("no");

  await locationCard.card.click();

  await t.expect(await clickedSpan.innerText).eql("yes");
});
