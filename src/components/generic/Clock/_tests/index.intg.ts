import { Selector } from "testcafe";
import { Clock } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("Clock").page("http://0.0.0.0:6060/#!/Clock");

test("Clock value is the time now", async (t) => {
  const example = Selector(toTestSelector("Clock-value-correct"));
  const clock = new Clock(example, t);
  await clock.expectClockValue();
});

test("Clock label is as expected", async (t) => {
  const example = Selector(toTestSelector("Clock-label-correct"));
  const clock = new Clock(example, t);
  await clock.expectLabelValue("Station 1");
});
