import moment from "moment";
import { Selector } from "testcafe";

import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { TickHandler } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("TickHandler").page("http://localhost:6060/#/TickHandler");

test("Time value is as expected (tickDuration prop (5s))", async (t) => {
  const example = Selector(toTestSelector("TickHandler-tickDuration-counting"));

  const tickHandler = new TickHandler(example, t);

  const now = currentUnixTimestamp();

  const currentMinute = moment().seconds(0).unix();

  const secondsUntilNextMinute = 60 - (now - currentMinute);

  const due = now + 5;

  let secondsUntilNexTick = due - now;
  if (secondsUntilNexTick > secondsUntilNextMinute) {
    secondsUntilNexTick = secondsUntilNextMinute;
  }

  await t.wait(secondsUntilNexTick * 1000);

  await tickHandler.expectTimePropValue();
});
