import { Selector } from "testcafe";
import { BooleanInputCtrl } from "./index.ctrl";

fixture("BooleanInput").page("http://localhost:6060/#!/BooleanInput");

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

test("User can select true or false", async (t) => {
  const example = Selector(toTestSelector("standard-usage"));
  const booleanInput = new BooleanInputCtrl(
    example.find(toTestSelector("boolean-input")),
    t,
  );

  const selectedOption = await booleanInput.appendRandom();
  await booleanInput.expectValue(selectedOption);

  const selectedOption1 = await booleanInput.appendRandom();
  await booleanInput.expectValue(selectedOption1);

  const selectedOption2 = await booleanInput.appendRandom();
  await booleanInput.expectValue(selectedOption2);
});

test("User can select true or false when there is a default option", async (t) => {
  const example = Selector(toTestSelector("default"));
  const booleanInput = new BooleanInputCtrl(
    example.find(toTestSelector("boolean-input")),
    t,
  );

  const selectedOption = await booleanInput.appendRandom();
  await booleanInput.expectValue(selectedOption);

  const selectedOption1 = await booleanInput.appendRandom();
  await booleanInput.expectValue(selectedOption1);

  const selectedOption2 = await booleanInput.appendRandom();
  await booleanInput.expectValue(selectedOption2);
});
