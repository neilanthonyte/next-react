import { Selector, ClientFunction } from "testcafe";
import { TaskCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("Task").page("http://localhost:6060/#/Task");

test("Boolean Task", async (t) => {
  const scenario = Selector(toTestSelector("Task-scenario-boolean"));

  /** Task 7 - boolean task - disabled */
  // HACK done first, as it shares the state with first task
  const task7Selector = scenario.find(toTestSelector("task-disabled"));
  const task7 = new TaskCtrl(task7Selector, t);

  // initial status
  await task7.isDisabled(true);
  await t.expect(await task7.getCompletionState()).eql("unchecked");
  await task7.isTimestampVisible(false);
  await task7.isActionVisible(false);

  // first click
  await task7.click();
  await t.expect(await task7.getCompletionState()).eql("unchecked");
  await task7.isTimestampVisible(false);
  await task7.isActionVisible(false);

  /** Task 1 - boolean task */
  const task1Selector = scenario.find(toTestSelector("task-1"));
  const task1 = new TaskCtrl(task1Selector, t);

  // initial status
  await task1.isDisabled(false);
  await t.expect(await task1.getCompletionState()).eql("unchecked");
  await task1.isTimestampVisible(false);
  await task1.isActionVisible(true);

  // first click checking it
  await task1.click();
  await t.expect(await task1.getCompletionState()).eql("successful");
  await task1.isTimestampVisible(true);
  await task1.isActionVisible(false);

  // second click unchecking it
  await task1.click();
  await t.expect(await task1.getCompletionState()).eql("unsuccessful");
  await task1.isTimestampVisible(true);
  await task1.isActionVisible(false);

  /** Task 2 - boolean task - overdue */
  const task2Selector = scenario.find(toTestSelector("task-2"));
  const task2 = new TaskCtrl(task2Selector, t);

  // initial status
  await task2.isDisabled(false);
  await t.expect(await task2.getCompletionState()).eql("unchecked");
  await task2.isOverdue(true);
  await task2.isTimestampVisible(false);
  await task2.isActionVisible(true);

  // first click checking it
  await task2.click();
  await t.expect(await task2.getCompletionState()).eql("successful");
  await task2.isLate(true);
  await task2.isTimestampVisible(true);
  await task2.isActionVisible(false);

  // second click unchecking it
  await task2.click();
  await t.expect(await task2.getCompletionState()).eql("unsuccessful");
  await task2.isOverdue(true);
  await task2.isTimestampVisible(true);
  await task2.isActionVisible(false);

  /** Task 3 - boolean task - successful */
  const task3Selector = scenario.find(toTestSelector("task-3"));
  const task3 = new TaskCtrl(task3Selector, t);

  // initial status
  await task3.isDisabled(false);
  await t.expect(await task3.getCompletionState()).eql("successful");
  await task3.isTimestampVisible(true);
  await task3.isActionVisible(false);

  // first click checking it
  await task3.click();
  await t.expect(await task3.getCompletionState()).eql("unsuccessful");
  await task3.isTimestampVisible(true);
  await task3.isActionVisible(false);

  // second click unchecking it
  await task3.click();
  await t.expect(await task3.getCompletionState()).eql("successful");
  await task3.isTimestampVisible(true);
  await task3.isActionVisible(false);

  /** Task 4 - boolean task - successful but late */
  const task4Selector = scenario.find(toTestSelector("task-4"));
  const task4 = new TaskCtrl(task4Selector, t);

  // initial status
  await task4.isDisabled(false);
  await t.expect(await task4.getCompletionState()).eql("successful");
  await task4.isLate(true);
  await task4.isTimestampVisible(true);
  await task4.isActionVisible(false);

  // first click unchecking it
  await task4.click();
  await t.expect(await task4.getCompletionState()).eql("unsuccessful");
  await task4.isOverdue(true);
  await task4.isTimestampVisible(true);
  await task4.isActionVisible(false);

  // second click checking it
  await task4.click();
  await t.expect(await task4.getCompletionState()).eql("successful");
  await task4.isLate(true);
  await task4.isTimestampVisible(true);
  await task4.isActionVisible(false);

  /** Task 5 - boolean task - unsuccessful */
  const task5Selector = scenario.find(toTestSelector("task-5"));
  const task5 = new TaskCtrl(task5Selector, t);

  // initial status
  await task5.isDisabled(false);
  await t.expect(await task5.getCompletionState()).eql("unsuccessful");
  await task4.isTimestampVisible(true);
  await task4.isActionVisible(false);

  // second click checking it
  await task5.click();
  await t.expect(await task5.getCompletionState()).eql("successful");
  await task5.isTimestampVisible(true);
  await task5.isActionVisible(false);

  /** Task 6 - boolean task - unsuccessful and late */
  const task6Selector = scenario.find(toTestSelector("task-6"));
  const task6 = new TaskCtrl(task6Selector, t);

  // initial status
  await task6.isDisabled(false);
  await t.expect(await task6.getCompletionState()).eql("unsuccessful");
  await task6.isLate(true);
  await task6.isTimestampVisible(true);
  await task6.isActionVisible(false);

  // second click checking it
  await task6.click();
  await t.expect(await task6.getCompletionState()).eql("successful");
  await task6.isLate(true);
  await task6.isTimestampVisible(true);
  await task6.isActionVisible(false);
});

test("Numeric Task", async (t) => {
  const scenario = Selector(toTestSelector("Task-scenario-numeric"));

  /** Task 1 - numeric task */
  const task1Selector = scenario.find(toTestSelector("task-1"));
  const task1 = new TaskCtrl(task1Selector, t);

  // initial status
  await task1.isDisabled(false);
  await t.expect(await task1.getCompletionState()).eql("unchecked");
  await task1.isTimestampVisible(false);

  // first click filling in an acceptable number
  await task1.click();
  await task1.form.fill({ value: "7" }, { mustSkip: ["value"] });
  await task1.form.clickSubmit();
  await t.expect(await task1.getCompletionState()).eql("successful");
  await task1.isTimestampVisible(true);
  await t.expect(await task1.getResult()).eql("Recorded value: 7");

  // TODO BaseTask does not enforce min/max - so this test is not valid.
  // Notably, the readme incorrectly used ChecklistTask before
  // second click filling in an unacceptable number
  // await task1.click();
  // await task1.form.fill({ value: "11" }, { mustSkip: ["value"] });
  // await task1.form.clickSubmit();
  // await t.expect(await task1.getCompletionState()).eql("unsuccessful");
  // await task1.isTimestampVisible(true);
  // await t.expect(await task1.getResult()).eql("Recorded value: 11");

  /** Task 2 - numeric task - existing */
  const task2Selector = scenario.find(toTestSelector("task-2"));
  const task2 = new TaskCtrl(task2Selector, t);

  // initial status
  await task2.isDisabled(false);
  await t.expect(await task2.getCompletionState()).eql("successful");
  await task2.isTimestampVisible(true);
  await t.expect(await task2.getResult()).eql("Recorded value: 100.23");
});

test("Photo Task", async (t) => {
  const scenario = Selector(toTestSelector("Task-scenario-image"));

  /** Task 1 - photo task */
  const task1Selector = scenario.find(toTestSelector("task-1"));
  const task1 = new TaskCtrl(task1Selector, t);

  // initial status
  await task1.isDisabled(false);
  await t.expect(await task1.getCompletionState()).eql("unchecked");
  await task1.isTimestampVisible(false);
  await task1.isThumbnailVisible(false);

  // first click taking a photo
  await task1.click();
  // as the native file selection dialog is suppressed by testcafe,
  // we have to emulate the file choosing proccess by:
  // first, setting a photo programmatically
  await task1.cameraUpload.camera.cameraFeedNative.setCapturedPhoto(0);
  // then, mimic opening of the dialog (though nothing would be shown)
  await task1.cameraUpload.camera.cameraOptions.clickTakePhoto();
  // finally, minic closing of the dialog
  await ClientFunction(() => window.dispatchEvent(new Event("focus")))();
  await t.wait(5000);
  await t.expect(await task1.getCompletionState()).eql("successful");
  await task1.isTimestampVisible(true);
  await task1.isThumbnailVisible(true);
});
