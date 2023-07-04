import { Selector } from "testcafe";
import * as _ from "lodash";

import { NextLocationListingCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("NextLocationListing").page(
  "http://localhost:6060/#/NextLocationListing",
);

test("Displays the location name correctly", async (t) => {
  const selector = Selector(
    toTestSelector("NextLocationListing-scenario-standard"),
  );
  const item = new NextLocationListingCtrl(selector, t);
  const output = selector.find(toTestSelector("output"));
  const clear = selector.find(toTestSelector("clear"));

  await item.expectTitle("Surry Hills");
  await item.click();
  await t.expect(output.innerText).contains("Surry Hills");
  await t.click(clear);
  await item.clickChevron();
  await t.expect(output.innerText).contains("Surry Hills");
});
