import { Selector } from "testcafe";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { PopoverCtrl } from "./index.ctrl";

fixture("Popover").page("http://localhost:6060/#/Popover");

test("Popover works as expected", async (t) => {
  const scenario = Selector(toTestSelector("Popover-scenario-standard"));

  const testButton = scenario.find(toTestSelector("test-button"));

  await t.expect(await testButton.exists).ok();

  await t.click(testButton);

  const popover = new PopoverCtrl(scenario, t);

  await popover.exists();
});
