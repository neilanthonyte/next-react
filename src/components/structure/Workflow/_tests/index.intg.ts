import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { WorkflowCtrl } from "./index.ctrl";
import { delay } from "../../../../helpers/delay";
const ANIMTIME = 1000;

fixture("Workflow").page("http://localhost:6060/#/Workflow");

test("Correctly asserts the headers action text", async (t) => {
  const example = Selector(toTestSelector("Workflow-scenario-standard"));
  const WorkflowController = new WorkflowCtrl(example, t);

  await WorkflowController.body
    .item("workflow-1")
    .section.expectHeaderActionLabelEquals(0, "open step 1");

  await WorkflowController.body
    .item("workflow-3")
    .section.expectHeaderActionLabelEquals(0, "open step 3");
});

test("Correctly clicks a workflows action", async (t) => {
  const example = Selector(toTestSelector("Workflow-scenario-standard"));
  const WorkflowController = new WorkflowCtrl(example, t);

  const workflowItem = WorkflowController.body.item("workflow-1");
  const workflowItem2 = WorkflowController.body.item("workflow-2");
  await workflowItem.section.expectSectionIsOpen(true);
  await workflowItem2.section.clickHeaderAction(0);
  await delay(ANIMTIME);
  await workflowItem.section.expectSectionIsOpen(false);
});

test("Asserting a summary item shows the expected details", async (t) => {
  const example = Selector(toTestSelector("Workflow-scenario-summary"));
  const workflow = new WorkflowCtrl(example, t);

  // labels
  await workflow.summary.item("item-1").cell.expectTypeLabel("Location");
  await workflow.summary.item("item-2").cell.expectTypeLabel("Patient");
  // description
  await workflow.summary
    .item("item-1")
    .cell.expectDescription("Mr Kory Porter");
  // decorations
  // icons
  await workflow.summary.item("item-1").cell.expectIconDecoration(true);
  await workflow.summary.item("item-2").cell.expectIconDecoration(false);
  // images
  await workflow.summary.item("item-1").cell.expectImageDecoration(false);
  await workflow.summary.item("item-2").cell.expectImageDecoration(true);
});

test("Shows change buttons existing correctly", async (t) => {
  const example = Selector(toTestSelector("Workflow-scenario-summary"));
  const workflow = new WorkflowCtrl(example, t);

  await t
    .expect(await workflow.summary.item("item-1").changeButton.exists())
    .ok();
  await t
    .expect(await workflow.summary.item("item-2").changeButton.exists())
    .notOk();

  const val1 = example
    .find(toTestSelector("clicked"))
    .find(toTestSelector("value-1"));

  await t.expect(await val1.exists).notOk();
  await workflow.summary.item("item-1").changeButton.click();
  await t.expect(await val1.exists).ok();
});
