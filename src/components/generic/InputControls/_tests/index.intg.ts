import { Selector } from "testcafe";
import { InputControlsCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("InputControls").page("http://localhost:6060/#!/InputControls");

test("Clear button functions", async (t) => {
  const example = Selector(toTestSelector("InputControls-scenario-clearable"));

  const subject = example.find(toTestSelector("subject"));
  const input = example.find(toTestSelector("input"));
  const output = example.find(toTestSelector("output"));
  const testCtrl = new InputControlsCtrl(subject, t);

  await testCtrl.expectClearButtonActive(true);
  await t.expect(output.innerText).eql("Hello world");
  await testCtrl.clickClear();
  await testCtrl.expectClearButtonActive(false);
  await t.expect(output.innerText).eql("");
  await t.typeText(input, "Foo");
  await testCtrl.expectClearButtonActive(true);
  await t.expect(output.innerText).eql("Foo");

  // quick error check
  await testCtrl.expectErrors(0);
});

test("Errors show", async (t) => {
  const error = Selector(toTestSelector("InputControls-scenario-error"));
  const errorCtrl = new InputControlsCtrl(error, t);
  await errorCtrl.expectErrors(1);

  const errors = Selector(toTestSelector("InputControls-scenario-errors"));
  const errorsCtrl = new InputControlsCtrl(errors, t);
  await errorsCtrl.expectErrors(2);
});
