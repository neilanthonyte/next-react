import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { OptionsCtrl } from "../../Options/_tests/index.ctrl";
import { TitleCtrl } from "../../Title/_tests/index.ctrl";

export class HeaderCtrl {
  private header: Selector;
  private inputs: Selector;
  public title: TitleCtrl;
  public options: OptionsCtrl;

  constructor(private s: Selector, private t: TestController) {
    this.header = this.s.find(toTestSelector("header"));
    this.inputs = this.header.find(toTestSelector("header-inputs"));
    this.title = new TitleCtrl(this.header, this.t);
    this.options = new OptionsCtrl(this.header, this.t);
  }

  public async exists(value: boolean) {
    await this.t.expect(this.header.exists).eql(value);
  }

  public async expectActionLabelEquals(action: number, label: string) {
    const actionContents = await this.s.find(toTestSelector(`action-${action}`))
      .textContent;

    await this.t.expect(actionContents).eql(label);
  }

  public async hasInputs(value: boolean) {
    await this.t.expect(this.inputs.exists).eql(value);
  }

  public async hasActions(value: boolean) {
    const actionSpan = this.s.find(toTestSelector("action-0"));
    await this.t.expect(actionSpan.exists).eql(value);
  }

  public async clickHeader() {
    await this.t.click(this.header);
  }

  public async clickAction(action: number) {
    const actionSpan = this.header.find(toTestSelector(`action-${action}`));
    const icon = await actionSpan.find(toTestSelector("action-icon"));
    const button = await actionSpan.find(toTestSelector("action-button"));
    const anchor = await actionSpan.find(toTestSelector("action-anchor"));

    if (await icon.exists) {
      await this.t.click(icon);
      return;
    }

    if (await button.exists) {
      await this.t.click(button);
      return;
    }

    if (await anchor.exists) {
      await this.t.click(anchor);
      return;
    }

    throw new Error("Could not find action.");
  }
}
