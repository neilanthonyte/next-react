import { Selector } from "testcafe";
import { ButtonOptionsInputCtrl } from "./index.ctrl";
import * as _ from "lodash";

fixture("ButtonOptionsInput").page(
  "http://localhost:6060/#!/ButtonOptionsInput",
);

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

test("can make selection from options (single)", async (t) => {
  const example = Selector(
    toTestSelector("ButtonOptionsInput-scenario-standardUsage"),
  );
  const input = example.find(toTestSelector("input"));
  const output = example.find(toTestSelector("output"));
  const buttonCtrl = new ButtonOptionsInputCtrl(input, t);

  await buttonCtrl.setValue("foo");
  await t.expect(output.innerText).eql("foo");

  const selectedItemText = await buttonCtrl.appendRandom();
  await t.expect(output.innerText).eql(selectedItemText);
});

test("can make selection from options with a default value (single)", async (t) => {
  const example = Selector(
    toTestSelector("ButtonOptionsInput-scenario-default"),
  );
  const input = example.find(toTestSelector("input"));
  const button = new ButtonOptionsInputCtrl(input, t);

  const selectedItemText = await button.appendRandom();
  await button.expectValue(selectedItemText);

  const selectedItemText1 = await button.appendRandom();
  await button.expectValue(selectedItemText1);

  const selectedItemText2 = await button.appendRandom();
  await button.expectValue(selectedItemText2);
});

test("can make selection from options (multi)", async (t) => {
  const example = Selector(
    toTestSelector("ButtonOptionsInput-scenario-multi-select"),
  );
  const input = example.find(toTestSelector("input"));
  const button = new ButtonOptionsInputCtrl(input, t);

  const selectedItemText = await button.appendRandom();
  await button.expectValue(selectedItemText);
});

test("can make selection from options with default (multi)", async (t) => {
  const example = Selector(
    toTestSelector("ButtonOptionsInput-scenario-multi-select-default"),
  );
  const input = example.find(toTestSelector("input"));
  const button = new ButtonOptionsInputCtrl(input, t);

  const selectedItemText = await button.appendRandom();
  const ogVal = ["foo", "bar", "baz"];
  await button.inlineOptions.expectValue(_.xor(ogVal, [selectedItemText]));
});
