import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { SectionCtrl } from "../../../abstract/Section/_tests/index.ctrl";
import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";
import { CellCtrl } from "../../Cell/_tests/index.ctrl";

class WorkflowSummaryItemCtrl {
  public cell: CellCtrl;
  public changeButton: ButtonCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.cell = new CellCtrl(this.selector, this.t);
    this.changeButton = new ButtonCtrl(
      this.selector.find(toTestSelector("summary-item-change")),
      this.t,
    );
  }

  public async exists() {
    return this.selector.exists;
  }
}

class WorkflowItemCtrl {
  public section: SectionCtrl;

  constructor(private selector: Selector, t: TestController) {
    this.section = new SectionCtrl(selector, t);
  }

  public async exists(): Promise<boolean> {
    return this.selector.exists;
  }
}

class WorkflowBodyCtrl {
  constructor(private selector: Selector, private t: TestController) {}

  public item(workflowItemDataTestId: string) {
    const item = new WorkflowItemCtrl(
      this.selector
        .find(toTestSelector(workflowItemDataTestId))
        .find(toTestSelector("WorkflowItem")),
      this.t,
    );
    return item;
  }
}

class WorkflowSummaryCtrl {
  constructor(private selector: Selector, private t: TestController) {}

  public item(workflowSummaryItemTestId: string) {
    const workflowSummaryItem = this.selector
      .find(toTestSelector(workflowSummaryItemTestId))
      .find(toTestSelector("WorkflowSummaryItem"));

    return new WorkflowSummaryItemCtrl(workflowSummaryItem, this.t);
  }
}

export class WorkflowCtrl {
  public summary: WorkflowSummaryCtrl;
  public body: WorkflowBodyCtrl;

  constructor(selector: Selector, t: TestController) {
    this.summary = new WorkflowSummaryCtrl(
      selector.find(toTestSelector("WorkflowSummary")),
      t,
    );
    this.body = new WorkflowBodyCtrl(
      selector.find(toTestSelector("WorkflowBody")),
      t,
    );
  }
}
