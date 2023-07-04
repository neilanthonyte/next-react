import { IconCtrl } from "../../../generic/Icon/_tests/index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { delay } from "../../../../helpers/delay";
import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";

export class CellCtrl {
  public decorationIcon: IconCtrl;
  public decorationImage: Selector;
  public heading: Selector;
  public description: Selector;
  public content: Selector;
  public typeLabel: Selector;
  public actions: Selector;
  public metric: Selector;
  public subHeading: Selector;
  public actionResult: Selector;
  public goal: Selector;

  constructor(public selector: Selector, private t: TestController) {
    this.decorationIcon = new IconCtrl(
      this.selector.find(toTestSelector("cell-decoration-icon")),
      t,
    );
    this.decorationImage = this.selector.find(
      toTestSelector("cell-decoration-image"),
    );
    this.heading = this.selector.find(toTestSelector("cell-header"));
    this.description = this.selector.find(toTestSelector("cell-description"));
    this.content = this.selector.find(toTestSelector("content"));
    this.typeLabel = this.selector
      .find(toTestSelector("cell-type"))
      .find(toTestSelector("label"));
    this.actions = this.selector.find(toTestSelector("actions"));
    this.metric = this.selector.find(toTestSelector("metric"));
    this.subHeading = this.selector.find(toTestSelector("cell-header-small"));
    this.actionResult = this.selector
      .find(toTestSelector("selected_action"))
      .find(toTestSelector("label"));
    this.goal = this.selector.child(1);
  }

  public async hasIconDecoration(): Promise<boolean> {
    return this.decorationIcon.selector.exists;
  }

  public async expectIconDecoration(value: boolean): Promise<boolean> {
    return this.t.expect(await this.hasIconDecoration()).eql(value);
  }

  public async hasImageDecoration(): Promise<boolean> {
    return this.decorationImage.exists;
  }

  public async expectImageDecoration(value: boolean): Promise<boolean> {
    return this.t.expect(await this.hasImageDecoration()).eql(value);
  }

  public async getHeading(): Promise<string> {
    const heading = await this.heading.innerText;
    return heading.trim();
  }

  public async expectHeading(value: string): Promise<void> {
    await this.t.expect(await this.getHeading()).eql(value);
  }

  public async getSubHeading(): Promise<string> {
    const heading = await this.subHeading.innerText;
    return heading.trim();
  }

  public async expectSubHeading(value: string): Promise<void> {
    await this.t.expect(await this.getSubHeading()).eql(value);
  }

  public async getDescription(): Promise<string> {
    const description = await this.description.innerText;
    return description.trim();
  }

  public async expectDescription(value: string): Promise<void> {
    await this.t.expect(await this.getDescription()).eql(value);
  }

  public async getTypeLabel(): Promise<string> {
    const type = await this.typeLabel.innerText;
    return type.trim();
  }

  public async expectTypeLabel(label: string): Promise<void> {
    await this.t
      .expect(await (await this.getTypeLabel()).toLowerCase())
      .eql(label.toLowerCase());
  }

  public async getMetricLabel(): Promise<string> {
    const metricLabel = await this.metric.find(toTestSelector("label"))
      .innerText;
    return metricLabel.trim();
  }

  public async getMetricValue(): Promise<string> {
    const metricValue = await this.metric.find(toTestSelector("value"))
      .innerText;
    return metricValue.trim();
  }

  public async expectToShowContent(message: string | boolean = false) {
    if (typeof message === "string") {
      await this.t.expect(this.content.innerText).contains(message);
    }
    await this.t.expect(this.content.exists).ok();
  }

  public async clickCell() {
    await this.t.click(this.selector);
  }

  public async clickAction(actionIndex: number) {
    const actionSelector = this.actions.find(
      toTestSelector(`action-${actionIndex}`),
    );
    const action = new IconCtrl(actionSelector, this.t);
    action.click();
  }

  public async clickActionLabel(actionIndex: number) {
    const actionSelector = this.actions.find(
      toTestSelector(`action-${actionIndex}-button`),
    );
    const button = new ButtonCtrl(actionSelector, this.t);
    await button.click();
  }

  public async expectAction(action: string) {
    await delay(100);
    await this.t.expect(await this.actionResult.innerText).eql(action);
  }

  public async expectGoal() {
    await this.t.expect(await this.goal.exists).eql(true);
  }
}
