import { Selector } from "testcafe";

import { PinInputCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("PinInput").page("http://localhost:6060/#!/PinInput");

test("Returns pin code that is entered into the input field", async (t) => {
  const example = Selector(toTestSelector("PinInput-scenario-standardUsage"));
  const pinInputCtrl = new PinInputCtrl(example, t);

  await pinInputCtrl.setValue("abcd");
  await pinInputCtrl.expectValue("abcd");
  await t.expect(example.find(toTestSelector("output")).innerText).eql("abcd");
});

test("Returns the default value in the input field", async (t) => {
  const example = Selector(toTestSelector("PinInput-scenario-defaultValue"));
  const pinInputCtrl = new PinInputCtrl(example, t);
  await pinInputCtrl.expectValue("1234");
  await t.expect(example.find(toTestSelector("output")).innerText).eql("1234");
});

test("Has the right number of inputs specified by the length", async (t) => {
  const example = Selector(toTestSelector("PinInput-scenario-standardUsage"));
  const pinInputCtrl = new PinInputCtrl(example, t);
  await t.expect(await pinInputCtrl.getLength()).eql(4);
});
