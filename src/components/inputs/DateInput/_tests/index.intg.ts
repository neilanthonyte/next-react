import { Selector } from "testcafe";
import { DateInputCtrl } from "./index.ctrl";

fixture("DateInput").page("http://localhost:6060/#!/DateInput");

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

test("Can make selection from date options (YYYY-MM-DD)", async (t) => {
  const example = Selector(toTestSelector("DateInput-scenario-standard"));
  const input = example.find(toTestSelector("input"));
  const date = new DateInputCtrl(input, t);

  const dateEntered = await date.appendRandom();
  await date.expectValue(dateEntered);

  await date.setValue("2018-03-12");
  await date.expectValue("2018-03-12");
});

test("Can make selection from shortened date options (YYYY-MM)", async (t) => {
  const example = Selector(
    toTestSelector("DateInput-scenario-shortened-YYYY-MM"),
  );
  const input = example.find(toTestSelector("input"));
  const date = new DateInputCtrl(input, t);

  const dateEntered = await date.appendRandom();
  await date.expectValue(dateEntered);

  await date.setValue("2018-03");
  await date.expectValue("2018-03");
});

test("Can make selection from shortened date options (MM-DD)", async (t) => {
  const example = Selector(
    toTestSelector("DateInput-scenario-shortened-MM-DD"),
  );
  const input = example.find(toTestSelector("input"));
  const date = new DateInputCtrl(input, t);

  await date.setValue("11-03");
  await date.expectValue("11-03");
});

test("Can make selection from shortened date options (MM)", async (t) => {
  const example = Selector(toTestSelector("DateInput-scenario-shortened-MM"));
  const input = example.find(toTestSelector("input"));
  const date = new DateInputCtrl(input, t);

  const dateEntered = await date.appendRandom();
  await date.expectValue(dateEntered);
  await date.setValue("03");
  await date.expectValue("03");
});

test("Can make selection from shortened date options (YYYY)", async (t) => {
  const example = Selector(toTestSelector("DateInput-scenario-shortened-YYYY"));
  const input = example.find(toTestSelector("input"));
  const date = new DateInputCtrl(input, t);

  const dateEntered = await date.appendRandom();
  await date.expectValue(dateEntered);
  await date.setValue("2019");
  await date.expectValue("2019");
});
