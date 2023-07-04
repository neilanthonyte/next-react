import { Selector } from "testcafe";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { DropdownCtrl } from "./index.ctrl";

fixture("Dropdown").page("http://localhost:6060/#/Dropdown");

test("Dropdown works as expected", async (t) => {
  const scenario = Selector(toTestSelector("Dropdown-scenario-standard"));
  const output = scenario.find(toTestSelector("output"));

  await t.expect(await scenario.exists).ok();
  await t.expect(await output.exists).ok();
  await t.expect(await output.innerText).eql("foo");

  const dropdown = new DropdownCtrl(scenario, t);

  await dropdown.exists();
  await dropdown.open();
  await dropdown.pickOption(1);
  await t.expect(await output.innerText).eql("bar");
});
