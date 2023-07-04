import { Selector } from "testcafe";

import { TaskListCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";

fixture("TaskList").page("http://localhost:6060/#/TaskList");

test("TaskList", async (t) => {
  const scenario = Selector(toTestSelector("TaskList-scenario-standard"));
  const TaskList = new TaskListCtrl(scenario, t);
  const addButton = new ButtonCtrl(scenario.find(toTestSelector("add")), t);
  const removeButton = new ButtonCtrl(
    scenario.find(toTestSelector("remove")),
    t,
  );

  // one task on the list initially
  await t.expect(await TaskList.count()).eql(1);

  await addButton.click();
  await addButton.click();

  // the list grows by two after the add button is clicked twice
  await t.expect(await TaskList.count()).eql(3);

  await removeButton.click();

  await t.wait(1000); // have to wait a brief moment due to the animation for removing being sloweer

  // the list shrinks by one after the remove button is clicked once
  await t.expect(await TaskList.count()).eql(2);
});
