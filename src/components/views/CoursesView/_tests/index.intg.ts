import { Selector } from "testcafe";

import { CoursesViewCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { CourseViewCtrl } from "../../CourseView/_tests/index.ctrl";

fixture("CoursesView").page("http://localhost:6060/#!/CoursesView");

test("Courses flow works as expected", async (t) => {
  const example = Selector(toTestSelector("CoursesView-scenario-standard"));
  const coursesView = new CoursesViewCtrl(example, t);

  await t.expect(await example.exists).ok();
  await t.expect(await coursesView.initialise()).ok();
  await t.expect(await coursesView.coursesCount()).eql(2);
  await t.expect(await coursesView.click(0)).eql(undefined);

  const courseView = new CourseViewCtrl(example, t);
  await t.expect(await courseView.click(0)).eql(undefined);
});
