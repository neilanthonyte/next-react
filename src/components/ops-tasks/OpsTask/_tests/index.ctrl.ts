import { TaskCtrl } from "../../../generic/Task/_tests/index.ctrl";
import { ChecklistTaskIssueModalCtrl } from "../../../modals/ChecklistTaskIssueModal/_tests/index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { OpsArticleModalCtrl } from "../../../ops-articles/OpsArticleModal/_tests/index.ctrl";

export class ChecklistTaskCtrl {
  static selector: string = "checklisttask";

  public task: TaskCtrl;
  public opsArticleModal: OpsArticleModalCtrl;
  public checklistTaskIssueModal: ChecklistTaskIssueModalCtrl;

  constructor(private s: Selector, private t: TestController) {
    this.task = new TaskCtrl(
      this.s.find(toTestSelector(ChecklistTaskCtrl.selector)),
      this.t,
    );
    this.opsArticleModal = new OpsArticleModalCtrl(s.find("modal"), this.t);
    // TODO should be qualified
    this.checklistTaskIssueModal = new ChecklistTaskIssueModalCtrl(this.t);
  }
}
