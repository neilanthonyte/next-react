import { Selector } from "testcafe";

import { CourseArticleViewCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("CourseArticleView").page("http://localhost:6060/#!/CourseArticleView");

test("Foo", async (t) => {
  const example = Selector(
    toTestSelector("CourseArticleView-scenario-standard"),
  );
  const subject = example.find(toTestSelector("subject"));
  const output = example.find(toTestSelector("output"));

  const courseArticle = new CourseArticleViewCtrl(subject, t);

  await t.expect(await example.exists).ok();
  await t.expect(await subject.exists).ok();
  await t.expect(await output.exists).ok();

  await t.expect(await courseArticle.exists()).ok();
  await t.expect(await output.innerText).eql("This is the output div");
});
