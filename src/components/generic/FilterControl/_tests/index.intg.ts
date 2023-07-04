import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { FilterControlCtrl } from "./index.ctrl";
import { randomNum } from "../../../../helpers/random";

fixture("FilterControl").page("http://localhost:6060/#/FilterControl");

test("The controller can change the filter by it's label", async (t) => {
  const example = Selector(toTestSelector("FilterControl-scenario-standard"));
  const filterController = new FilterControlCtrl(example, t);
  await filterController.setSelectedFilterByLabel("Banana");
  await filterController.assertSelectedLabel("Banana");
  await filterController.setSelectedFilterByLabel("Apple");
  await filterController.assertSelectedLabel("Apple");
});

test("The controller can change the filter by a specific index", async (t) => {
  const example = Selector(toTestSelector("FilterControl-scenario-standard"));
  const filterController = new FilterControlCtrl(example, t);
  await filterController.setSelectedFilterByIndex(1); // second item, which should be "Banana" in the readme
  await filterController.assertSelectedLabel("Banana");
  await filterController.setSelectedFilterByIndex(2); // third item, which should be "Peach" in the readme
  await filterController.assertSelectedLabel("Peach");
});

test("Clicking on the same item multiple times does not cause it to be de-selected", async (t) => {
  const example = Selector(toTestSelector("FilterControl-scenario-standard"));
  const filterController = new FilterControlCtrl(example, t);
  const numberOfTimes = 2 + randomNum(10);

  for (let i = 0; i < numberOfTimes; i += 1) {
    await filterController.setSelectedFilterByIndex(1); // second item, which should be "Banana" in the readme
    await filterController.assertSelectedLabel("Banana");
    await filterController.setSelectedFilterByIndex(1);
    await filterController.assertSelectedLabel("Banana");
  }
});
