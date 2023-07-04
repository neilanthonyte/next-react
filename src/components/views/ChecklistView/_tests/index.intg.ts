import { Selector } from "testcafe";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ChecklistViewCtrl } from "./index.ctrl";

fixture("ChecklistView").page("http://localhost:6060/#/ChecklistView");

test("ChecklistView", async (t) => {
  await t.wait(5000); // wait for checklist loading
  const scenario = Selector(toTestSelector("ChecklistView-scenario-dueToday"));
  const checklistView = new ChecklistViewCtrl(scenario, t);
  const groups = [
    "Monthly due Today",
    "Weekly due Today",
    "Opening - Start of Shift",
  ];
  // initial state
  await checklistView.exists(true);
  await checklistView.expectTitleEquals("Daily Tasks");
  await checklistView.expectStatusFilterEquals("Current");
  await checklistView.expectCategoryFilterEquals("All");
  await checklistView.expectGroupExists(groups[0], true);
  await checklistView.expectGroupExists(groups[1], true);
  await checklistView.expectGroupExists(groups[2], true);
  const listOne = await checklistView.getTaskList(groups[0]);
  const listTwo = await checklistView.getTaskList(groups[1]);
  const listThree = await checklistView.getTaskList(groups[2]);
  await t.expect(await listOne.count()).eql(1);
  await t.expect(await listTwo.count()).eql(1);
  await t.expect(await listThree.count()).eql(6);
  await checklistView.todaysProgress.expectNumOfCompletedOnTimeTasksEquals(0);
  await checklistView.todaysProgress.expectNumOfCompletedLateTasksEquals(0);
  await checklistView.todaysProgress.expectNumOfIncompleteTasksEquals(6);

  // checking a task should move it from Current to Completed
  const checklistTaskOneName = "Fill up back up bain marie";
  await listThree.expectChecklistTaskExists(checklistTaskOneName, true);
  const checklistTaskOne = await listThree.getChecklistTaskByName(
    checklistTaskOneName,
  );
  await checklistTaskOne.task.click();
  await t.wait(3000); // wait for the animation to finish
  await listThree.expectChecklistTaskExists(checklistTaskOneName, false);
  await checklistView.setStatusFilter("Completed");
  await listThree.expectChecklistTaskExists(checklistTaskOneName, true);
  await checklistView.todaysProgress.expectNumOfCompletedOnTimeTasksEquals(1);
  await checklistView.todaysProgress.expectNumOfCompletedLateTasksEquals(0);
  await checklistView.todaysProgress.expectNumOfIncompleteTasksEquals(5);
});

// TODO - Changing category filter from All to Management should make the ChecklistView render
// management tasks only, and vice versa.
// test("ChecklistView", async t => {});

// TODO - Using a different checklist where isOpenToday is true should make the ChecklistView render
// the placeholder text instead of the task list
// test("ChecklistView", async t => {});

// TODO - ChecklistView should refresh itself automatically based on a fixed interval and highlight
// overdue tasks should any become so
// test("ChecklistView", async t => {});
