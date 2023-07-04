import { Selector } from "testcafe";
import { SingleOptionsInputCtrl } from "./index.ctrl";

fixture("SingleOptionsInput").page(
  "http://localhost:6060/#!/SingleOptionsInput",
);

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

test("Can make selection from options in standard use", async (t) => {
  const example = Selector(toTestSelector("SingleOptions-scenario-standard"));
  const inputField = example.find(toTestSelector("input"));
  const input = new SingleOptionsInputCtrl(inputField, t);

  const selectedItemText = await input.appendRandom();
  await input.expectPlaceholder("Please Select...", 0);
  await input.expectValue(selectedItemText);
});

test("Can make selection from options in TopSelection use", async (t) => {
  const example = Selector(
    toTestSelector("SingleOptions-scenario-topSelection"),
  );
  const inputField = example.find(toTestSelector("input"));
  const input = new SingleOptionsInputCtrl(inputField, t);

  const selectedItemText = await input.appendRandom();
  await input.expectPlaceholder("At top", 0);
  await input.expectValue(selectedItemText);
});

test("Can make selection from options in ButtomSelection use", async (t) => {
  const example = Selector(
    toTestSelector("SingleOptions-scenario-bottomSelection"),
  );
  const inputField = example.find(toTestSelector("input"));
  const input = new SingleOptionsInputCtrl(inputField, t);

  const selectedItemText = await input.appendRandom();
  await input.expectPlaceholder("At bottom", 4);
  await input.expectValue(selectedItemText);
});

test("Can't make selection from options in Disabled use", async (t) => {
  const example = Selector(toTestSelector("SingleOptions-scenario-disabled"));
  const inputField = example.find(toTestSelector("input"));
  const input = new SingleOptionsInputCtrl(inputField, t);
  await input.expectDisabled(true);
});
