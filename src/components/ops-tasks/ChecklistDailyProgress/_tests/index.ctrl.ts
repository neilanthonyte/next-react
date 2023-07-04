import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class ChecklistDailyProgressChartCtrl {
  static selector: string = "checklist-daily-progress-chart";
  private chart: Selector;

  constructor(private s: Selector, private t: TestController) {
    this.chart = this.s.find(
      toTestSelector(ChecklistDailyProgressChartCtrl.selector),
    );
  }

  public async exists(value: boolean) {
    await this.t.expect(this.chart.exists).eql(value);
  }

  public async expectNumOfCompletedOnTimeTasksEquals(value: number) {
    const numOfCompletedOnTimeTasks = await this.chart().getAttribute(
      "data-test-ontime",
    );
    await this.t.expect(numOfCompletedOnTimeTasks).eql(value.toString());
  }

  public async expectNumOfCompletedLateTasksEquals(value: number) {
    const numOfCompletedLateTasks = await this.chart().getAttribute(
      "data-test-late",
    );
    await this.t.expect(numOfCompletedLateTasks).eql(value.toString());
  }

  public async expectNumOfIncompleteTasksEquals(value: number) {
    const numOfIncompleteTasks = await this.chart().getAttribute(
      "data-test-incomplete",
    );
    await this.t.expect(numOfIncompleteTasks).eql(value.toString());
  }
}
