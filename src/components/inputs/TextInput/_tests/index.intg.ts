import { Selector } from "testcafe";

import { TextInputCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("TextInput").page("http://localhost:6060/#!/TextInput");

test("Shows a single line input", async (t) => {
  const example = Selector(toTestSelector("TextInput-scenario-standard"));

  const input = example.find(toTestSelector("input"));
  const output = example.find(toTestSelector("output"));
  const textInputCtrl = new TextInputCtrl(input, t);

  await textInputCtrl.expectIsSingleLine();

  await textInputCtrl.appendValue("bar");
  await textInputCtrl.expectValue("bar");
  await t.expect(await output.innerText).eql("bar");
});

test("Shows a multi-line input", async (t) => {
  const example = Selector(toTestSelector("TextInput-scenario-multiLine"));
  const input = example.find(toTestSelector("input"));
  const output = example.find(toTestSelector("output"));
  const textInputCtrl = new TextInputCtrl(input, t);

  await textInputCtrl.expectIsMultiLine();

  await textInputCtrl.appendRandom();
  await textInputCtrl.pressKey("enter");
  await textInputCtrl.appendRandom();

  const result = await output.innerText;
  await textInputCtrl.expectValue(result.replace(/[\\]+n/g, "\n"));
});

test("Responds to prop value changes", async (t) => {
  const example = Selector(toTestSelector("TextInput-scenario-standard"));
  const input = example.find(toTestSelector("input"));
  const output = example.find(toTestSelector("output"));
  const controlClear = example.find(toTestSelector("control-clear"));
  const textInputCtrl = new TextInputCtrl(input, t);

  // set initial value
  await textInputCtrl.appendValue("foo");
  await textInputCtrl.expectValue("foo");
  await t.expect(await output.innerText).eql("foo");
  // clear the input via link
  await t.click(controlClear);
  await textInputCtrl.expectValue("");
  await t.expect(await output.innerText).eql("");
});

test("Can be disabled", async (t) => {
  const example = Selector(toTestSelector("TextInput-scenario-disabled"));

  const input = example.find(toTestSelector("input"));
  const textInputCtrl = new TextInputCtrl(input, t);

  await textInputCtrl.expectIsDisabled();
});

test("Supports a default value", async (t) => {
  const example = Selector(toTestSelector("TextInput-scenario-defaultValue"));

  const input = example.find(toTestSelector("input"));
  const output = example.find(toTestSelector("output"));
  const textInputCtrl = new TextInputCtrl(input, t);

  await textInputCtrl.expectValue("Hello world");
  await t.expect(await output.innerText).eql("Hello world");
});

test("Supports a placeholder value", async (t) => {
  const example = Selector(toTestSelector("TextInput-scenario-placeholder"));

  const input = example.find(toTestSelector("input"));
  const textInputCtrl = new TextInputCtrl(input, t);

  await textInputCtrl.expectPlaceholder("Placeholder text");
});

test("DOM keypad can update the value of a textInput field", async (t) => {
  const example = Selector(toTestSelector("TextInput-scenario-textDomKeypad"));
  const output = example.find(toTestSelector("output"));
  const textInputCtrl = new TextInputCtrl(
    example.find(toTestSelector("input")),
    t,
  );

  await textInputCtrl.click();
  await textInputCtrl.keypad.clickKey("A");
  await textInputCtrl.keypad.clickKey("B");
  await textInputCtrl.keypad.clickKey("A");
  await textInputCtrl.expectValue("ABA");
  await t.expect(await output.innerText).eql("ABA");
});

test("Can reformat text", async (t) => {
  const example = Selector(toTestSelector("TextInput-scenario-reformat"));

  const input = example.find(toTestSelector("input"));
  const output = example.find(toTestSelector("output"));
  const textInputCtrl = new TextInputCtrl(input, t);

  await textInputCtrl.setValue("ABCDEFG");
  await textInputCtrl.appendValue(",./;'[]!@#$%^&*()+=-");
  await textInputCtrl.expectValue("ABCDEFG");
  await t.expect(await output.innerText).eql("ABCDEFG");
});

test("Can filter text", async (t) => {
  const example = Selector(toTestSelector("TextInput-scenario-filter"));

  const input = example.find(toTestSelector("input"));
  const output = example.find(toTestSelector("output"));
  const textInputCtrl = new TextInputCtrl(input, t);

  await textInputCtrl.appendValue("12");
  await textInputCtrl.expectValue("12");
  await t.expect(await output.innerText).eql("12");
  await textInputCtrl.appendValue("3");
  await textInputCtrl.expectValue("12 3");
  await t.expect(await output.innerText).eql("12 3");
  await textInputCtrl.pressKey("backspace");
  await textInputCtrl.expectValue("12");
  await t.expect(await output.innerText).eql("12");
  await textInputCtrl.appendValue("345");
  await textInputCtrl.expectValue("12 34 5");
  await t.expect(await output.innerText).eql("12 34 5");
  await textInputCtrl.pressKey("backspace");
  await textInputCtrl.expectValue("12 34");
  await t.expect(await output.innerText).eql("12 34");
});

test("Obeys formatting rules (to uppercase)", async (t) => {
  const example = Selector(toTestSelector("TextInput-scenario-uppercase"));
  const output = example.find(toTestSelector("output"));
  const textInputCtrl = new TextInputCtrl(
    example.find(toTestSelector("input")),
    t,
  );

  const randomText = await textInputCtrl.enterRandom();
  await textInputCtrl.expectValue(randomText.toUpperCase());
  await t.expect(await output.innerText).eql(randomText.toUpperCase());
});

test("Obeys formatting rules (to lowercase)", async (t) => {
  const example = Selector(toTestSelector("TextInput-scenario-lowercase"));
  const output = example.find(toTestSelector("output"));
  const textInputCtrl = new TextInputCtrl(
    example.find(toTestSelector("input")),
    t,
  );

  const randomText = await textInputCtrl.enterRandom();
  await textInputCtrl.expectValue(randomText.toLowerCase());
  await t.expect(await output.innerText).eql(randomText.toLowerCase());
});

test("Makes use of the data-hint attribute", async (t) => {
  const example = Selector(toTestSelector("TextInput-scenario-dataHint"));

  const nameRegex = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?)$/;

  const nameInput = example.find(toTestSelector("name-input"));
  const nameOutput = example.find(toTestSelector("name-output"));
  const nameTextInputCtrl = new TextInputCtrl(nameInput, t);
  const randomName = await nameTextInputCtrl.enterRandom();
  await nameTextInputCtrl.expectValue(randomName);
  const nameOutputText = await nameOutput.innerText;
  await nameTextInputCtrl.expectValue(nameOutputText);
  await t.expect(nameOutputText.match(nameRegex)).notEql(null);

  const surnameInput = example.find(toTestSelector("surname-input"));
  const surnameOutput = example.find(toTestSelector("surname-output"));
  const surnameTextInputCtrl = new TextInputCtrl(surnameInput, t);
  const randomSurname = await surnameTextInputCtrl.enterRandom();
  await surnameTextInputCtrl.expectValue(randomSurname);
  const surnameOutputText = await surnameOutput.innerText;
  await surnameTextInputCtrl.expectValue(surnameOutputText);
  await t.expect(surnameOutputText.match(nameRegex)).notEql(null);

  const weekdayInput = example.find(toTestSelector("weekday-input"));
  const weekdayOutput = example.find(toTestSelector("weekday-output"));
  const weekdayTextInputCtrl = new TextInputCtrl(weekdayInput, t);
  const randomWeekday = await weekdayTextInputCtrl.enterRandom();
  await weekdayTextInputCtrl.expectValue(randomWeekday);
  const weekdayOutputText = await weekdayOutput.innerText;
  await weekdayTextInputCtrl.expectValue(weekdayOutputText);
  await t
    .expect(
      [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ].indexOf(weekdayOutputText),
    )
    .gt(-1);
});
