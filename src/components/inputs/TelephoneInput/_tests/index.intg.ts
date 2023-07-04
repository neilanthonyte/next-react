import { Selector } from "testcafe";
import { TelephoneInputCtrl } from "./index.ctrl";

fixture("TelephoneInput").page("http://localhost:6060/#!/TelephoneInput");

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

test("Cannot insert values when disabled", async (t) => {
  const example = Selector(
    toTestSelector("TelephoneInput-scenario-no-keypad-disabled"),
  );
  const input = new TelephoneInputCtrl(example, t);
  await input.expectDesabled();
});

test("Correctly displays the value that is input", async (t) => {
  const example = Selector(toTestSelector("TelephoneInput-scenario-no-keypad"));
  const input = new TelephoneInputCtrl(example, t);

  await input.setValue("0430911999");

  await input.expectValue("0430 911 999");
  // checks the output on the readme as well!
  await t
    .expect(await example.find(toTestSelector("output")).innerText)
    .eql("0430 911 999");
});

test("The controller can insert random data", async (t) => {
  const example = Selector(toTestSelector("TelephoneInput-scenario-no-keypad"));
  const input = new TelephoneInputCtrl(example, t);

  const value = await input.appendRandom();

  await input.expectValue(value);
});
