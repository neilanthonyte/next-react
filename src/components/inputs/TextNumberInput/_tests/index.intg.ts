import { Selector } from "testcafe";
import { TextNumberInputCtrl } from "./index.ctrl";

fixture("TextNumberInput").page("http://localhost:6060/#!/TextNumberInput");

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

test("returns numbers that are entered into the field", async (t) => {
  const example = Selector(toTestSelector("standard-usage"));
  const textNumberInput = new TextNumberInputCtrl(
    example.find(toTestSelector("textNumber-input")),
    t,
  );
  const randomInput = await textNumberInput.enterRandomNumber();

  await textNumberInput.expectValue(randomInput);
});

test("returns only numbers that are entered into the field", async (t) => {
  const example = Selector(toTestSelector("standard-usage"));
  const textNumberInput = new TextNumberInputCtrl(
    example.find(toTestSelector("textNumber-input")),
    t,
  );
  const randomInput = await textNumberInput.enterRandomAlphanumeric();
  const strippedValue = randomInput.replace(/\D/g, "");

  await textNumberInput.expectValue(strippedValue);
});

test("Contains a default value", async (t) => {
  const example = Selector(toTestSelector("default-value"));
  const textNumberInput = new TextNumberInputCtrl(
    example.find(toTestSelector("textNumber-input")),
    t,
  );
  await textNumberInput.expectValue("1234");
});

test("Placeholder is present", async (t) => {
  const example = Selector(toTestSelector("placeholder"));
  const textNumberInput = new TextNumberInputCtrl(
    example.find(toTestSelector("textNumber-input")),
    t,
  );

  await textNumberInput.checkAttribute("Placeholder text", "placeholder");
});

test("DOM keypad can update the value of the field", async (t) => {
  const example = Selector(toTestSelector("standard-usage"));
  const textNumberInput = new TextNumberInputCtrl(
    example.find(toTestSelector("textNumber-input")),
    t,
  );

  await textNumberInput.click();
  await textNumberInput.keypad.clickKey("1");
  await textNumberInput.keypad.clickKey("2");
  await textNumberInput.keypad.clickKey("3");
  await t.expect(example.find(toTestSelector("output")).innerText).eql("123");
});

test("MaxLength is honoured", async (t) => {
  const example = Selector(toTestSelector("max-length"));
  const textNumberInput = new TextNumberInputCtrl(
    example.find(toTestSelector("textNumber-input")),
    t,
  );

  await textNumberInput.enterValue("1234567890");
  await textNumberInput.expectValue("12345");
});

test("Disabled with value returns value and is not editable", async (t) => {
  const example = Selector(toTestSelector("disabled"));
  const textNumberInput = new TextNumberInputCtrl(
    example.find(toTestSelector("textNumber-input")),
    t,
  );

  await textNumberInput.checkHasAttribute(true, "disabled");
  await textNumberInput.expectValue("1234567890");
  await textNumberInput.enterValue("123");
  await textNumberInput.expectValue("1234567890");
});
