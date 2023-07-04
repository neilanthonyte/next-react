import { Selector } from "testcafe";
import { DynamicOptionsInputCtrl } from "./index.ctrl";

fixture("DynamicOptionsInput").page(
  "http://localhost:6060/#!/DynamicOptionsInput",
);

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

test("can make a selection when the options appear as buttons", async (t) => {
  const example = Selector(toTestSelector("dynamic-button"));
  const inputField = example.find(toTestSelector("dynamic-input"));
  const input = new DynamicOptionsInputCtrl(inputField, t);

  const selection = await input.buttonOptions.appendRandom();
  await input.buttonOptions.expectValue(selection);

  const selection1 = await input.buttonOptions.appendRandom();
  await input.buttonOptions.expectValue(selection1);

  const selection2 = await input.buttonOptions.appendRandom();
  await input.buttonOptions.expectValue(selection2);
});

test("can make a selection when the options appear as single input", async (t) => {
  const example = Selector(toTestSelector("dynamic-single"));
  const inputField = example.find(toTestSelector("dynamic-input"));
  const input = new DynamicOptionsInputCtrl(inputField, t);

  const selection = await input.singleOptions.appendRandom();
  await input.singleOptions.expectValue(selection);

  const selection1 = await input.singleOptions.appendRandom();
  await input.singleOptions.expectValue(selection1);

  const selection2 = await input.singleOptions.appendRandom();
  await input.singleOptions.expectValue(selection2);
});
