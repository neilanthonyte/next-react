import { Selector } from "testcafe";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { CourseArticleSidebarCtrl } from "./index.ctrl";

fixture("CourseArticleSidebar").page(
  "http://localhost:6060/#!/CourseArticleSidebar",
);

test("Ensure navigation between articles is as expected", async (t) => {
  const example = Selector(
    toTestSelector("CourseArticleSidebar-scenario-course-navigation"),
  );
  const subject = example.find(toTestSelector("subject"));

  await t.expect(await example.exists).ok();
  await t.expect(await subject.exists).ok();
  await t.wait(1000);
  const courseArticleSidebar = new CourseArticleSidebarCtrl(subject, t);
  await courseArticleSidebar.checkContents();
  await courseArticleSidebar.expectTitle("Opening");
  await courseArticleSidebar.progressTracker.click(1);
  await t.wait(1000);
  await courseArticleSidebar.expectTitle(
    "B. Equipment and safe operating procedures",
  );
});

test("Ensure back button works as expected", async (t) => {
  const example = Selector(
    toTestSelector("CourseArticleSidebar-scenario-back-button"),
  );
  const subject = example.find(toTestSelector("subject"));
  const output = example.find(toTestSelector("output"));

  await t.expect(await example.exists).ok();
  await t.expect(await subject.exists).ok();

  const courseArticleSidebar = new CourseArticleSidebarCtrl(subject, t);
  await t.wait(1000);
  await courseArticleSidebar.checkContents();

  await courseArticleSidebar.backButton.click();

  await t.expect(await output.exists).ok();
  await t.expect(await output.innerText).eql("This is the output div");
});
