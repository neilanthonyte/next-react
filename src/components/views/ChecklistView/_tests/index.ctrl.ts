import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { TaskListCtrl } from "../../../atoms/AnimatedList/_tests/index.ctrl";
import { FilterControlCtrl } from "../../../generic/FilterControl/_tests/index.ctrl";
import { ChecklistDailyProgressChartCtrl } from "../../../ops-tasks/ChecklistDailyProgress/_tests/index.ctrl";
import { PageCtrl } from "../../../structure/Page/_tests/index.ctrl";
import { PageSectionCtrl } from "../../../structure/PageSection/_tests/index.ctrl";

export class ChecklistViewCtrl {
  static selector: string = "checklistview";
  private checklistView: Selector;
  private pageSections: Selector;

  public page: PageCtrl;

  public categories: PageSectionCtrl;
  public todaysProgress: ChecklistDailyProgressChartCtrl;

  public statusFilter: FilterControlCtrl;
  public categoryFilter: FilterControlCtrl;

  constructor(private s: Selector, private t: TestController) {
    this.checklistView = this.s.find(
      toTestSelector(ChecklistViewCtrl.selector),
    );
    this.page = new PageCtrl(this.checklistView, this.t);
    this.pageSections = this.page.body.body.find(
      toTestSelector(PageSectionCtrl.selector),
    );
    this.categories = new PageSectionCtrl(this.pageSections.nth(0), this.t);
    const todaysProgressSection = new PageSectionCtrl(
      this.pageSections.nth(1),
      this.t,
    );
    this.todaysProgress = new ChecklistDailyProgressChartCtrl(
      todaysProgressSection.section.body.body,
      this.t,
    );
    this.statusFilter = this.page.header.options.filterControl;
    this.categoryFilter = new FilterControlCtrl(
      this.categories.section.body.body,
      this.t,
    );
  }

  public async exists(value: boolean) {
    await this.t.expect(this.checklistView.exists).eql(value);
  }

  public async expectTitleEquals(title: string) {
    await this.page.header.title.checkContents(title);
  }

  public async expectStatusFilterEquals(status: string) {
    await this.statusFilter.assertSelectedLabel(status);
  }

  public async expectCategoryFilterEquals(category: string) {
    await this.categoryFilter.assertSelectedLabel(category);
  }

  public async setStatusFilter(status: string) {
    await this.statusFilter.setSelectedFilterByLabel(status);
  }

  public async setCategoryFilter(category: string) {
    await this.categoryFilter.setSelectedFilterByLabel(category);
  }

  public async expectGroupExists(group: string, value: boolean) {
    const groupExists = await (async () => {
      const numOfSections = await this.pageSections().count;
      if (numOfSections <= 2) {
        return false;
      }
      for (let i = 2; i < numOfSections; i++) {
        const pageSection = new PageSectionCtrl(
          this.pageSections.nth(i),
          this.t,
        );
        const title = await pageSection.section.header.title.getContents();
        if (title.indexOf(group) !== -1) {
          return true;
        }
      }
      return false;
    })();
    await this.t.expect(groupExists).eql(value);
  }

  public async getGroupByName(group: string): Promise<PageSectionCtrl | null> {
    const numOfSections = await this.pageSections().count;
    if (numOfSections <= 2) {
      return null;
    }
    for (let i = 2; i < numOfSections; i++) {
      const pageSection = new PageSectionCtrl(this.pageSections.nth(i), this.t);
      const title = await pageSection.section.header.title.getContents();
      if (title.indexOf(group) !== -1) {
        return pageSection;
      }
    }
    return null;
  }

  public async getTaskList(group: string): Promise<TaskListCtrl | null> {
    const grp = await this.getGroupByName(group);
    if (!grp) {
      return null;
    }
    const TaskList = new TaskListCtrl(grp.section.body.body, this.t);
    return TaskList;
  }
}
