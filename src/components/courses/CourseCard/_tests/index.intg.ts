import { Selector } from "testcafe";

import { CourseCardCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { Course } from "next-shared/src/models/Course";

fixture("CourseCard").page("http://localhost:6060/#!/CourseCard");

test("Details are displayed as expected", async (t) => {
  const example = Selector(toTestSelector("CourseCard-scenario-standard"));
  const subject = example.find(toTestSelector("subject"));
  const output = example.find(toTestSelector("output"));

  const courseCard = new CourseCardCtrl(subject, t);
  await courseCard.expectHeader("Course 1");
  await courseCard.expectArticleTitles(["Article 1", "Article 2"]);
  await courseCard.expectImageToShow();

  await courseCard.click();
  await t.expect(await output.exists).ok();

  // show the high-level functions work
  await courseCard.expectCourse(
    Course.unserialize({
      title: "Course 1",
      slug: "course1",
      posterImage: "http://lorempixel.com/600/600",
      description: [
        "<p>Quick brown fox jumps over the lazy dog</p>",
        "<p>Mollit magna dolore id est dolor pariatur incididunt minim sit sunt amet.</p>",
      ].join(""),
    }),
  );
});
