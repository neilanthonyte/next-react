import { Selector, ClientFunction } from "testcafe";
import * as faker from "faker";

import { ChecklistTaskCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("ChecklistTask").page("http://localhost:6060/#/ChecklistTask");

test("ChecklistTask", async (t) => {
  const scenario: Selector = Selector(
    toTestSelector("ChecklistTask-scenario-standard"),
  );
  const checklisttasks = scenario.find(toTestSelector("checklisttask"));
  await t.expect(checklisttasks.count).gt(0, { timeout: 5000 });

  /** ChecklistTask 1 - numeric task */
  const clTask1Selector = scenario.find(toTestSelector("task-1"));
  const clTask1 = new ChecklistTaskCtrl(clTask1Selector, t);

  // initial status
  await t.expect(await clTask1.task.getCompletionState()).eql("unchecked");
  await clTask1.task.isTimestampVisible(false);
  await clTask1.task.isActionVisible(true);

  // first click filling in an unacceptable number
  await clTask1.task.click();
  await clTask1.task.form.fill({ value: "11" }, { mustSkip: ["value"] });
  await clTask1.task.form.clickSubmit();
  await t.expect(await clTask1.task.getCompletionState()).eql("unsuccessful");
  await clTask1.task.isTimestampVisible(true);
  await t.expect(await clTask1.task.getResult()).eql("Recorded value: 11");

  // second click filling in an acceptable number
  await clTask1.task.click();
  await clTask1.task.form.fill({ value: "7" }, { mustSkip: ["value"] });
  await clTask1.task.form.clickSubmit();
  await t.expect(await clTask1.task.getCompletionState()).eql("successful");
  await clTask1.task.isTimestampVisible(true);
  await t.expect(await clTask1.task.getResult()).eql("Recorded value: 7");

  /** ChecklistTask 2 - boolean task */
  const clTask2Selector = scenario.find(toTestSelector("task-2"));
  const clTask2 = new ChecklistTaskCtrl(clTask2Selector, t);

  // initial status
  await t.expect(await clTask2.task.getCompletionState()).eql("unchecked");
  await clTask2.task.isTimestampVisible(false);
  await clTask2.task.isActionVisible(true);

  // first click checking it
  await clTask2.task.click();
  await t.expect(await clTask2.task.getCompletionState()).eql("successful");
  await clTask2.task.isTimestampVisible(true);
  await clTask2.task.isActionVisible(false);

  // second click unchecking it
  await clTask2.task.click();
  await t.expect(await clTask2.task.getCompletionState()).eql("unchecked");
  await clTask2.task.isTimestampVisible(false);
  await clTask2.task.isActionVisible(true);

  // clicking first action should open the article modal
  await clTask2.task.clickAction(0);
  // TODO reinstate on controller
  // await clTask2.opsArticleModal.modal.expectVisibleModal(true);
  // await clTask2.opsArticleModal.article.exists();
  // await clTask2.opsArticleModal.modal.closeModal();

  // clicking second action should open the report issue modal
  await clTask2.task.clickAction(1);
  await clTask2.checklistTaskIssueModal.modal.expectVisibleModal(true);

  // filling and submitting the form to report an issue
  await clTask2.checklistTaskIssueModal.form.fill(
    {
      completed: false,
      taskProblem: faker.random.words(3),
      furtherActionRequired: true,
      actionRequired: faker.random.words(3),
    },
    {
      mustSkip: [
        "completed",
        "taskProblem",
        "furtherActionRequired",
        "actionRequired",
      ],
    },
  );
  await clTask2.checklistTaskIssueModal.form.clickSubmit();
  await t.expect(await clTask2.task.getCompletionState()).eql("unsuccessful");
  await clTask2.task.isTimestampVisible(true);
  await clTask2.task.isActionVisible(false);

  /** ChecklistTask 3 - photo task */
  const clTask3Selector = scenario.find(toTestSelector("task-3"));
  const clTask3 = new ChecklistTaskCtrl(clTask3Selector, t);

  // initial status
  await t.expect(await clTask3.task.getCompletionState()).eql("unchecked");
  await clTask3.task.isTimestampVisible(false);
  await clTask3.task.isActionVisible(true);
  await clTask3.task.isThumbnailVisible(false);

  // first click taking a photo
  await clTask3.task.click();
  // as the native file selection dialog is suppressed by testcafe,
  // we have to emulate the file choosing proccess by:
  // first, setting a photo programmatically
  await clTask3.task.cameraUpload.camera.cameraFeedNative.setCapturedPhoto(0);
  // then, mimic opening of the dialog (though nothing would be shown)
  await clTask3.task.cameraUpload.camera.cameraOptions.clickTakePhoto();
  await t.wait(3000);
  // // finally, minic closing of the dialog
  await ClientFunction(() => window.dispatchEvent(new Event("focus")))();
  await t.wait(3000);
  await t.expect(await clTask3.task.getCompletionState()).eql("successful");
  await clTask3.task.isTimestampVisible(true);
  await clTask3.task.isThumbnailVisible(true);
});
