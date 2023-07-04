import { Selector } from "testcafe";

import { FormCtrl } from "../../../forms/Form/_tests/index.ctrl";
import { IntegerInputCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

const delay = 1500;

fixture("IntegerInput").page("http://localhost:6060/#!/IntegerInput");

test("Returns numbers that are entered into the input field", async (t) => {
  const example = Selector(
    toTestSelector("IntegerInput-scenario-standardUsage"),
  );
  const integerInput = new IntegerInputCtrl(
    example.find(toTestSelector("integer-input")),
    t,
  );

  // This random entry uses the hint provided in the schema
  const numberEntered = await integerInput.enterRandom();

  await t
    .expect(example.find(toTestSelector("output")).innerText)
    .eql(numberEntered);
  await integerInput.expectInputValue(numberEntered);
  await integerInput.click();
  await integerInput.pressKey("ctrl+a");
  await integerInput.pressKey("backspace");
  await t.expect(example.find(toTestSelector("output")).innerText).eql("");
  await integerInput.expectInputValue("");

  await integerInput.setValue("83625638472682974");
  await integerInput.click();
  await integerInput.pressKey("end");
  await integerInput.pressKey("backspace");
  await integerInput.pressKey("backspace");
  await integerInput.pressKey("backspace");
  await integerInput.pressKey("backspace");
  await integerInput.pressKey("backspace");
  await t
    .expect(example.find(toTestSelector("output")).innerText)
    .eql("836256384726");
  await integerInput.expectInputValue("836256384726");
});

test("Only allows valid input", async (t) => {
  const example = Selector(
    toTestSelector("IntegerInput-scenario-standardUsage"),
  );
  const integerInput = new IntegerInputCtrl(
    example.find(toTestSelector("integer-input")),
    t,
  );

  await integerInput.click();

  await integerInput.setValue("00000");
  await t.expect(example.find(toTestSelector("output")).innerText).eql("00000");
  await integerInput.expectInputValue("00000");
  await integerInput.pressKey("ctrl+a");
  await integerInput.pressKey("backspace");

  await integerInput.setValue("abc!@#$%^&*()+[]';{}:\",<>?/~`");
  await t.expect(example.find(toTestSelector("output")).innerText).eql("");
  await integerInput.expectInputValue("");
  await integerInput.pressKey("ctrl+a");
  await integerInput.pressKey("backspace");

  await integerInput.setValue("120aj40.234");
  await t
    .expect(example.find(toTestSelector("output")).innerText)
    .eql("12040.234");
  await integerInput.expectInputValue("12040.234");
  await integerInput.pressKey("ctrl+a");
  await integerInput.pressKey("backspace");

  await integerInput.setValue("000.123");
  await t
    .expect(example.find(toTestSelector("output")).innerText)
    .eql("000.123");
  await integerInput.expectInputValue("000.123");
  await integerInput.pressKey("ctrl+a");
  await integerInput.pressKey("backspace");

  await integerInput.setValue("0");
  await t.expect(example.find(toTestSelector("output")).innerText).eql("0");
  await integerInput.expectInputValue("0");
  await integerInput.pressKey("ctrl+a");
  await integerInput.pressKey("backspace");

  await integerInput.setValue("123.123");
  await t
    .expect(example.find(toTestSelector("output")).innerText)
    .eql("123.123");
  await integerInput.expectInputValue("123.123");
  await integerInput.pressKey("ctrl+a");
  await integerInput.pressKey("backspace");

  await integerInput.setValue("-0.12300");
  await t
    .expect(example.find(toTestSelector("output")).innerText)
    .eql("-0.12300");
  await integerInput.expectInputValue("-0.12300");
  await integerInput.pressKey("ctrl+a");
  await integerInput.pressKey("backspace");

  await integerInput.setValue("-000.123");
  await t
    .expect(example.find(toTestSelector("output")).innerText)
    .eql("-000.123");
  await integerInput.expectInputValue("-000.123");
  await integerInput.pressKey("ctrl+a");
  await integerInput.pressKey("backspace");

  await integerInput.setValue("-0");
  await t.expect(example.find(toTestSelector("output")).innerText).eql("-0");
  await integerInput.expectInputValue("-0");
  await integerInput.pressKey("ctrl+a");
  await integerInput.pressKey("backspace");

  await integerInput.setValue("--");
  await t.expect(example.find(toTestSelector("output")).innerText).eql("-");
  await integerInput.expectInputValue("-");
  await integerInput.pressKey("ctrl+a");
  await integerInput.pressKey("backspace");

  await integerInput.setValue("-");
  await t.expect(example.find(toTestSelector("output")).innerText).eql("-");
  await integerInput.expectInputValue("-");
  await integerInput.pressKey("ctrl+a");
  await integerInput.pressKey("backspace");

  await integerInput.setValue("123.123.123");
  await t
    .expect(example.find(toTestSelector("output")).innerText)
    .eql("123.123123");
  await integerInput.expectInputValue("123.123123");
  await integerInput.pressKey("ctrl+a");
  await integerInput.pressKey("backspace");
});

test("DOM keypad can update the value of the input", async (t) => {
  const example = Selector(
    toTestSelector("IntegerInput-scenario-standardUsage"),
  );
  const integerInput = new IntegerInputCtrl(
    example.find(toTestSelector("integer-input")),
    t,
  );
  let numbersPressed;

  await integerInput.click();

  numbersPressed = await integerInput.clickRandomNumber();
  numbersPressed = numbersPressed + (await integerInput.clickRandomNumber());
  numbersPressed = numbersPressed + (await integerInput.clickRandomNumber());
  numbersPressed = numbersPressed + (await integerInput.clickRandomNumber());

  await t
    .expect(example.find(toTestSelector("output")).innerText)
    .eql(numbersPressed);
  await integerInput.expectInputValue(numbersPressed);
});

test("Placeholder value is present", async (t) => {
  const example = Selector(toTestSelector("IntegerInput-scenario-placeholder"));
  const integerInput = new IntegerInputCtrl(
    example.find(toTestSelector("integer-input")),
    t,
  );

  await integerInput.expectAttribute("4444", "placeholder");
});

test("Returns the default value", async (t) => {
  const example = Selector(toTestSelector("IntegerInput-scenario-default"));
  const integerInput = new IntegerInputCtrl(
    example.find(toTestSelector("integer-input")),
    t,
  );

  await t.expect(example.find(toTestSelector("output")).innerText).eql("4444");
  await integerInput.expectInputValue("4444");
});

test("Returns the correct value when default value is changed", async (t) => {
  const example = Selector(toTestSelector("IntegerInput-scenario-default"));
  const integerInput = new IntegerInputCtrl(
    example.find(toTestSelector("integer-input")),
    t,
  );

  await t.expect(example.find(toTestSelector("output")).innerText).eql("4444");

  const enteredNumber = await integerInput.enterRandom();
  await t
    .expect(example.find(toTestSelector("output")).innerText)
    .eql(enteredNumber);
  await integerInput.expectInputValue(enteredNumber);
});

test("Disabled field is disabled and returns the default value", async (t) => {
  const example = Selector(
    toTestSelector("IntegerInput-scenario-defaultDisabled"),
  );
  const integerInput = new IntegerInputCtrl(
    example.find(toTestSelector("integer-input")),
    t,
  );

  await integerInput.expectHasAttribute(true, "disabled");
  await t.expect(example.find(toTestSelector("output")).innerText).eql("4444");
  await integerInput.expectInputValue("4444");
  await integerInput.enterRandom();
  await t.expect(example.find(toTestSelector("output")).innerText).eql("4444");
  await integerInput.expectInputValue("4444");
});

test("DOM keypad is always shown when 'alwaysShowKeypad' is true", async (t) => {
  const example = Selector(toTestSelector("IntegerInput-scenario-alwaysShow"));
  const integerInput = new IntegerInputCtrl(
    example.find(toTestSelector("integer-input")),
    t,
  );

  await t.expect(await integerInput.expectKeypadExists()).eql(true);
});

test("DOM keypad does not appear when 'hideKeypad' is true", async (t) => {
  const example = Selector(
    toTestSelector("IntegerInput-scenario-withoutKeypad"),
  );
  const integerInput = new IntegerInputCtrl(
    example.find(toTestSelector("integer-input")),
    t,
  );
  await integerInput.click();

  await t.expect(await integerInput.expectKeypadExists()).eql(false);
});

test("Can set a minimum value which does not go below", async (t) => {
  const example = Selector(toTestSelector("IntegerInput-scenario-minValue"));
  const formCtrl = new FormCtrl(
    example.find(toTestSelector("integer-input-form")),
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
  const example = Selector(toTestSelector("IntegerInput-scenario-maxValue"));
  const formCtrl = new FormCtrl(
    example.find(toTestSelector("integer-input-form")),
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
  const example = Selector(
    toTestSelector("IntegerInput-scenario-withCounters"),
  );
  const integerInput = new IntegerInputCtrl(
    example.find(toTestSelector("integer-input")),
    t,
  );

  await integerInput.incrementCounter();
  await t.expect(example.find(toTestSelector("output")).innerText).eql("0.5");
  await integerInput.expectInputValue("0.5");
  await integerInput.decrementCounter();
  await t.expect(example.find(toTestSelector("output")).innerText).eql("0");
  await integerInput.expectInputValue("0");
});

test("Counters don't decrement/increment an empty value", async (t) => {
  const example = Selector(
    toTestSelector("IntegerInput-scenario-withCounters"),
  );
  const integerInput = new IntegerInputCtrl(
    example.find(toTestSelector("integer-input")),
    t,
  );

  await integerInput.click();
  await integerInput.pressKey("ctrl+a delete");
  await integerInput.incrementCounter();
  await t.expect(example.find(toTestSelector("output")).innerText).eql("");
  await integerInput.expectInputValue("");
  await integerInput.decrementCounter();
  await t.expect(example.find(toTestSelector("output")).innerText).eql("");
  await integerInput.expectInputValue("");
});
