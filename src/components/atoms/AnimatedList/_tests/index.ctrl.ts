import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ChecklistTaskCtrl } from "../../../ops-tasks/OpsTask/_tests/index.ctrl";

export class TaskListCtrl {
  static selector: string = "TaskList";
  private TaskListItems: Selector;

  constructor(private s: Selector, private t: TestController) {
    this.TaskListItems = this.s
      .find(toTestSelector(TaskListCtrl.selector))
      .find(toTestSelector("TaskList-item"));
  }

  public async count() {
    return this.TaskListItems.count;
  }

  public async getChecklistTaskByIndex(
    index: number,
  ): Promise<ChecklistTaskCtrl | null> {
    if (
      !(await this.TaskListItems().exists) ||
      !(await this.TaskListItems().nth(index).exists)
    ) {
      return null;
    }
    return new ChecklistTaskCtrl(this.TaskListItems.nth(index), this.t);
  }

  public async getChecklistTaskByName(
    name: string,
  ): Promise<ChecklistTaskCtrl | null> {
    if (!(await this.TaskListItems().exists)) {
      return null;
    }
    const numOfTasks = await this.TaskListItems().count;
    for (let i = 0; i < numOfTasks; i++) {
      const checklistTask = new ChecklistTaskCtrl(
        this.TaskListItems.nth(i),
        this.t,
      );
      const title = await checklistTask.task.header.title.getContents();
      if (title === name) {
        return checklistTask;
      }
    }
    return null;
  }

  public async expectChecklistTaskExists(name: string, value: boolean) {
    const taskExists = await (async () => {
      if (!(await this.TaskListItems().exists)) {
        return false;
      }
      const numOfTasks = await this.TaskListItems().count;
      for (let i = 0; i < numOfTasks; i++) {
        const checklistTask = new ChecklistTaskCtrl(
          this.TaskListItems.nth(i),
          this.t,
        );
        const title = await checklistTask.task.header.title.getContents();
        if (title === name) {
          return true;
        }
      }
      return false;
    })();
    await this.t.expect(taskExists).eql(value);
  }
}
