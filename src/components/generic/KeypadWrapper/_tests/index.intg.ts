import { Selector } from "testcafe";
import { KeypadWrapperCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("KeypadWrapper").page("http://localhost:6060/#!/KeypadWrapper");

test("KeypadWrapper works in standard usage", async (t) => {
  const example = Selector(toTestSelector("KeypadWrapper-scenario-standard"));
  const keypadWrapper = new KeypadWrapperCtrl(example, t);
  await keypadWrapper.expectKeypadOptions(["A", "B"]);
  await keypadWrapper.selectKeypadOption("A");
  await keypadWrapper.expectInput("A");

  await keypadWrapper.selectKeypadOption("A");
  await keypadWrapper.expectInput("AA");
});

test("KeypadWrapper works with replacement option", async (t) => {
  const example = Selector(toTestSelector("KeypadWrapper-scenario-replace"));
  const keypadWrapper = new KeypadWrapperCtrl(example, t);
  await keypadWrapper.expectKeypadOptions(["A", "B"]);
  await keypadWrapper.selectKeypadOption("A");
  await keypadWrapper.selectKeypadOption("B");
  await keypadWrapper.expectInput("B");
});

test("KeypadWrapper works with backspace and propagation", async (t) => {
  const example = Selector(
    toTestSelector("KeypadWrapper-scenario-propagation"),
  );
  const keypadWrapper = new KeypadWrapperCtrl(example, t);
  await keypadWrapper.expectKeypadOptions(["a", "b", "backspace"]);
  await keypadWrapper.selectKeypadOption("a");
  await keypadWrapper.selectKeypadOption("b");
  await keypadWrapper.selectKeypadOption("backspace");
  await keypadWrapper.expectInput("A");
});
