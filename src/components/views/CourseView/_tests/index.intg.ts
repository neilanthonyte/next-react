import { Selector } from "testcafe";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("CourseView").page("http://locahost:6060/#!/CourseView");

test("Foo", async (t) => {
  const example = Selector(toTestSelector("CourseView-scenario-standard"));
  const subject = example.find(toTestSelector("subject"));
  const output = example.find(toTestSelector("output"));

  await t.expect(await example.exists).ok();
  await t.expect(await subject.exists).ok();
  await t.expect(await output.exists).ok();
});
