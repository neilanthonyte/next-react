import { IInputCtrl } from "../../BaseInput/_tests/IInputCtrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { InlineOptionsCtrl } from "../../../generic/InlineOptions/_tests/index.ctrl";
import * as _ from "lodash";

export class ButtonOptionsInputCtrl implements IInputCtrl<string> {
  public inlineOptions: InlineOptionsCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.inlineOptions = new InlineOptionsCtrl(
      selector.find(toTestSelector("inline-options")),
      t,
    );
  }

  async setValue(value: string): Promise<void> {
    return this.inlineOptions.clickOption(value);
  }

  async getValue(): Promise<string[]> {
    return this.inlineOptions.getSelectedOptions();
  }

  async appendValue(value: string): Promise<void> {
    return this.inlineOptions.clickOption(value);
  }

  async appendRandom(): Promise<string> {
    const allOptions = await this.inlineOptions.getAllOptions();
    const randomOption = allOptions[_.random(0, allOptions.length - 1)];
    await this.setValue(randomOption);
    return randomOption;
  }

  async expectValue(value: string): Promise<void> {
    return this.inlineOptions.expectValue([value]);
  }
}
