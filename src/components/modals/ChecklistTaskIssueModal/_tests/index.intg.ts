import { Selector } from "testcafe";
import { ChecklistTaskIssueModalCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("ChecklistTaskIssueModal").page(
  "http://localhost:6060/#/ChecklistTaskIssueModal",
);

test("modal's visibility should toggle based on it's task availability and should invoke the corresponding callback upon submit or exit", async (t) => {
  const scenario = Selector(
    toTestSelector("ChecklistTaskIssueModal-scenario-standard"),
  );
  const openModal = scenario.find(toTestSelector("open-modal"));
  const issue = scenario.find(toTestSelector("issue"));
  const action = scenario.find(toTestSelector("action"));
  const checklistTaskIssueModal = new ChecklistTaskIssueModalCtrl(t);

  // initial task is null so modal should be hidden at start
  await checklistTaskIssueModal.expectVisibleModal(false);

  // initial issue and action should be null before anything is reported
  await t.expect(await issue().innerText).eql("null");
  await t.expect(await action().innerText).eql("null");

  // open modal containing the report an issue form
  await t.click(openModal);

  // after having been set with a task modal should be shown
  await checklistTaskIssueModal.expectVisibleModal(true);

  // at the point issue and action should still be null as nothing is reported yet
  await t.expect(await issue().innerText).eql("null");
  await t.expect(await action().innerText).eql("null");

  // cancel the form
  await checklistTaskIssueModal.cancelIssueReport();

  // modal should be closed once the form has been cancelled
  await checklistTaskIssueModal.expectVisibleModal(false);
  // action and issue should still be null as nothing is reported yet
  await t.expect(await issue().innerText).eql("null");
  await t.expect(await action().innerText).eql("null");

  // // open the modal again
  await t.click(openModal);

  await checklistTaskIssueModal.expectVisibleModal(true);

  // submit the form this time
  await checklistTaskIssueModal.submitIssueReport();

  // modal should be closed once the form has been submitted
  await checklistTaskIssueModal.expectVisibleModal(false);
  // action and issue should show info as reported
  await t.expect(await issue().innerText).notEql("null");
  await t.expect(await action().innerText).notEql("null");
});
