import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { IconCtrl } from "../../../generic/Icon/_tests/index.ctrl";

export class MainViewDecorationCtrl {
  private container: Selector;
  private content: Selector;
  private avatar: Selector;
  private title: Selector;
  private description: Selector;
  private actions: Selector;
  private counter: Selector;
  private widthInput: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.container = this.selector.find(toTestSelector("container"));
    this.content = this.selector.find(toTestSelector("content"));
    this.avatar = this.selector.find(toTestSelector("avatar"));
    this.title = this.selector.find(toTestSelector("title"));
    this.description = this.selector.find(toTestSelector("description"));
    this.actions = this.selector.find(toTestSelector("actions"));
    this.counter = this.selector.find(toTestSelector("counter"));
    this.widthInput = this.selector.find(toTestSelector("widthInput"));
  }

  public async expectTitle(title: string): Promise<void> {
    await this.t.expect(this.title.innerText).eql(title);
  }

  public async expectDescription(description: string): Promise<void> {
    await this.t.expect(this.description.innerText).eql(description);
  }

  public async expectContent(): Promise<void> {
    await this.t.expect(await this.content.hasChildNodes).ok();
  }

  public async expectAvatar(): Promise<void> {
    await this.t.expect(await this.avatar.hasChildNodes).ok();
  }

  public async retrieveActions(): Promise<IconCtrl[]> {
    const nodeCount = await this.actions.childNodeCount;
    const actions = [];
    for (let i = 0; i <= nodeCount - 1; i++) {
      actions.push(
        new IconCtrl(this.actions.find(toTestSelector(`action-${i}`)), this.t),
      );
    }
    return actions;
  }

  public async expectCounterValue(value: number): Promise<void> {
    await this.t.expect(await this.counter.innerText).eql(value.toString());
  }

  public async setWidthValue(value: number): Promise<void> {
    await this.t.typeText(this.widthInput, value.toString());
  }

  public async expectWidthValue(value: number): Promise<void> {
    await this.t.expect(await this.container.clientWidth).eql(value);
  }
}
