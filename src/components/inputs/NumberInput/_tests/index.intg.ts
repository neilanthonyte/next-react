import { Selector } from "testcafe";

import { FormCtrl } from "../../../forms/Form/_tests/index.ctrl";
import { NumberInputCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

const delay = 1500;

fixture("NumberInput").page("http://localhost:6060/#!/NumberInput");

test("Returns numbers that are entered into the input field", async (t) => {
  const example = Selector(
    toTestSelector("NumberInput-scenario-standardUsage"),
  );
  const numberInput = new NumberInputCtrl(
    example.find(toTestSelector("number-input")),
    t,
  );

  // This random entry uses the hint provided in the schema
  const numberEntered = await numberInput.enterRandom();

  await t
    .expect(example.find(toTestSelector("output")).innerText)
    .eql(numberEntered);
  await numberInput.expectInputValue(numberEntered);
  await numberInput.click();
  await numberInput.pressKey("ctrl+a");
  await numberInput.pressKey("backspace");
  await t.expect(example.find(toTestSelector("output")).innerText).eql("");
  await numberInput.expectInputValue("");

  await numberInput.setValue("83625638472682974");
  await numberInput.click();
  await numberInput.pressKey("end");
  await numberInput.pressKey("backspace");
  await numberInput.pressKey("backspace");
  await numberInput.pressKey("backspace");
  await numberInput.pressKey("backspace");
  await numberInput.pressKey("backspace");
  await t
    .expect(example.find(toTestSelector("output")).innerText)
    .eql("836256384726");
  await numberInput.expectInputValue("836256384726");
});

test("Only allows valid input", async (t) => {
  const example = Selector(
    toTestSelector("NumberInput-scenario-standardUsage"),
  );
  const numberInput = new NumberInputCtrl(
    example.find(toTestSelector("number-input")),
    t,
  );

  await numberInput.click();

  await numberInput.setValue("00000");
  await t.expect(example.find(toTestSelector("output")).innerText).eql("00000");
  await numberInput.expectInputValue("00000");
  await numberInput.pressKey("ctrl+a");
  await numberInput.pressKey("backspace");

  await numberInput.setValue("abc!@#$%^&*()+[]';{}:\",<>?/~`");
  await t.expect(example.find(toTestSelector("output")).innerText).eql("");
  await numberInput.expectInputValue("");
  await numberInput.pressKey("ctrl+a");
  await numberInput.pressKey("backspace");

  await numberInput.setValue("120aj40.234");
  await t
    .expect(example.find(toTestSelector("output")).innerText)
    .eql("12040.234");
  await numberInput.expectInputValue("12040.234");
  await numberInput.pressKey("ctrl+a");
  await numberInput.pressKey("backspace");

  await numberInput.setValue("000.123");
  await t
    .expect(example.find(toTestSelector("output")).innerText)
    .eql("000.123");
  await numberInput.expectInputValue("000.123");
  await numberInput.pressKey("ctrl+a");
  await numberInput.pressKey("backspace");

  await numberInput.setValue("0");
  await t.expect(example.find(toTestSelector("output")).innerText).eql("0");
  await numberInput.expectInputValue("0");
  await numberInput.pressKey("ctrl+a");
  await numberInput.pressKey("backspace");

  await numberInput.setValue("123.123");
  await t
    .expect(example.find(toTestSelector("output")).innerText)
    .eql("123.123");
  await numberInput.expectInputValue("123.123");
  await numberInput.pressKey("ctrl+a");
  await numberInput.pressKey("backspace");

  await numberInput.setValue("-0.12300");
  await t
    .expect(example.find(toTestSelector("output")).innerText)
    .eql("-0.12300");
  await numberInput.expectInputValue("-0.12300");
  await numberInput.pressKey("ctrl+a");
  await numberInput.pressKey("backspace");

  await numberInput.setValue("-000.123");
  await t
    .expect(example.find(toTestSelector("output")).innerText)
    .eql("-000.123");
  await numberInput.expectInputValue("-000.123");
  await numberInput.pressKey("ctrl+a");
  await numberInput.pressKey("backspace");

  await numberInput.setValue("-0");
  await t.expect(example.find(toTestSelector("output")).innerText).eql("-0");
  await numberInput.expectInputValue("-0");
  await numberInput.pressKey("ctrl+a");
  await numberInput.pressKey("backspace");

  await numberInput.setValue("--");
  await t.expect(example.find(toTestSelector("output")).innerText).eql("-");
  await numberInput.expectInputValue("-");
  await numberInput.pressKey("ctrl+a");
  await numberInput.pressKey("backspace");

  await numberInput.setValue("-");
  await t.expect(example.find(toTestSelector("output")).innerText).eql("-");
  await numberInput.expectInputValue("-");
  await numberInput.pressKey("ctrl+a");
  await numberInput.pressKey("backspace");

  await numberInput.setValue("123.123.123");
  await t
    .expect(example.find(toTestSelector("output")).innerText)
    .eql("123.123123");
  await numberInput.expectInputValue("123.123123");
  await numberInput.pressKey("ctrl+a");
  await numberInput.pressKey("backspace");
});

test("DOM keypad can update the value of the input", async (t) => {
  const example = Selector(
    toTestSelector("NumberInput-scenario-standardUsage"),
  );
  const numberInput = new NumberInputCtrl(
    example.find(toTestSelector("number-input")),
    t,
  );
  let numbersPressed;

  await numberInput.click();

  numbersPressed = await numberInput.clickRandomNumber();
  numbersPressed = numbersPressed + (await numberInput.clickRandomNumber());
  numbersPressed = numbersPressed + (await numberInput.clickRandomNumber());
  numbersPressed = numbersPressed + (await numberInput.clickRandomNumber());

  await t
    .expect(example.find(toTestSelector("output")).innerText)
    .eql(numbersPressed);
  await numberInput.expectInputValue(numbersPressed);
});

test("Placeholder value is present", async (t) => {
  const example = Selector(toTestSelector("NumberInput-scenario-placeholder"));
  const numberInput = new NumberInputCtrl(
    example.find(toTestSelector("number-input")),
    t,
  );

  await numberInput.expectAttribute("4444", "placeholder");
});

test("Returns the default value", async (t) => {
  const example = Selector(toTestSelector("NumberInput-scenario-default"));
  const numberInput = new NumberInputCtrl(
    example.find(toTestSelector("number-input")),
    t,
  );

  await t.expect(example.find(toTestSelector("output")).innerText).eql("4444");
  await numberInput.expectInputValue("4444");
});

test("Returns the correct value when default value is changed", async (t) => {
  const example = Selector(toTestSelector("NumberInput-scenario-default"));
  const numberInput = new NumberInputCtrl(
    example.find(toTestSelector("number-input")),
    t,
  );

  await t.expect(example.find(toTestSelector("output")).innerText).eql("4444");

  const enteredNumber = await numberInput.enterRandom();
  await t
    .expect(example.find(toTestSelector("output")).innerText)
    .eql(enteredNumber);
  await numberInput.expectInputValue(enteredNumber);
});

test("Disabled field is disabled and returns the default value", async (t) => {
  const example = Selector(
    toTestSelector("NumberInput-scenario-defaultDisabled"),
  );
  const numberInput = new NumberInputCtrl(
    example.find(toTestSelector("number-input")),
    t,
  );

  await numberInput.expectHasAttribute(true, "disabled");
  await t.expect(example.find(toTestSelector("output")).innerText).eql("4444");
  await numberInput.expectInputValue("4444");
  await numberInput.enterRandom();
  await t.expect(example.find(toTestSelector("output")).innerText).eql("4444");
  await numberInput.expectInputValue("4444");
});

test("DOM keypad is always shown when 'alwaysShowKeypad' is true", async (t) => {
  const example = Selector(toTestSelector("NumberInput-scenario-alwaysShow"));
  const numberInput = new NumberInputCtrl(
    example.find(toTestSelector("number-input")),
    t,
  );

  await t.expect(await numberInput.expectKeypadExists()).eql(true);
});

test("DOM keypad does not appear when 'hideKeypad' is true", async (t) => {
  const example = Selector(
    toTestSelector("NumberInput-scenario-withoutKeypad"),
  );
  const numberInput = new NumberInputCtrl(
    example.find(toTestSelector("number-input")),
    t,
  );
  await numberInput.click();

  await t.expect(await numberInput.expectKeypadExists()).eql(false);
});

test("Can set a minimum value which does not go below", async (t) => {
  const example = Selector(toTestSelector("NumberInput-scenario-minValue"));
  const formCtrl = new FormCtrl(
    example.find(toTestSelector("number-input-form")),
    t,
  );

  let values: { [key: string]: any } = {
    number: "-1",
  };

  await formCtrl.fill(values);
  try {
    await formCtrl.clickSubmit();
  } catch (e) {
    // test will fail if error is not caught.
    // we're explicitly testing that an error occurs.
  }
  await formCtrl.expectValidationErrorCount(1);

  await formCtrl.clearForm();

  values = {
    number: "5",
  };

  await formCtrl.fill(values);
  await formCtrl.clickSubmit();

  // TODO: need to figure out a way to get rid of the delay
  // TODO: the test fails intermittently without this
  await t.wait(delay);
  await formCtrl.expectValidationErrorCount(0);
});

test("Can set a maximum value which does not go above", async (t) => {
  const example = Selector(toTestSelector("NumberInput-scenario-maxValue"));
  const formCtrl = new FormCtrl(
    example.find(toTestSelector("number-input-form")),
    t,
  );

  let values: { [key: string]: any } = {
    number: "11",
  };

  await formCtrl.fill(values);
  try {
    await formCtrl.clickSubmit();
  } catch (e) {
    // test will fail if error is not caught.
    // we're explicitly testing that an error occurs.
  }
  await formCtrl.expectValidationErrorCount(1);

  await formCtrl.clearForm();

  values = {
    number: "5",
  };

  await formCtrl.fill(values);
  await formCtrl.clickSubmit();

  // TODO: need to figure out a way to get rid of the delay
  // TODO: the test fails intermittently without this
  await t.wait(delay);
  await formCtrl.expectValidationErrorCount(0);
});

test("Counters decrement/increment by given value", async (t) => {
  const example = Selector(toTestSelector("NumberInput-scenario-withCounters"));
  const numberInput = new NumberInputCtrl(
    example.find(toTestSelector("number-input")),
    t,
  );

  await numberInput.incrementCounter();
  await t.expect(example.find(toTestSelector("output")).innerText).eql("0.5");
  await numberInput.expectInputValue("0.5");
  await numberInput.decrementCounter();
  await t.expect(example.find(toTestSelector("output")).innerText).eql("0");
  await numberInput.expectInputValue("0");
});

test("Counters don't decrement/increment an empty value", async (t) => {
  const example = Selector(toTestSelector("NumberInput-scenario-withCounters"));
  const numberInput = new NumberInputCtrl(
    example.find(toTestSelector("number-input")),
    t,
  );

  await numberInput.click();
  await numberInput.pressKey("ctrl+a delete");
  await numberInput.incrementCounter();
  await t.expect(example.find(toTestSelector("output")).innerText).eql("");
  await numberInput.expectInputValue("");
  await numberInput.decrementCounter();
  await t.expect(example.find(toTestSelector("output")).innerText).eql("");
  await numberInput.expectInputValue("");
});
