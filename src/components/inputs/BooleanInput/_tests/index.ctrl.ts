import * as _ from "lodash";
import { IInputCtrl } from "../../BaseInput/_tests/IInputCtrl";
import { ButtonOptionsInputCtrl } from "../../ButtonOptionsInput/_tests/index.ctrl";

export class BooleanInputCtrl implements IInputCtrl<boolean> {
  public buttonOptions: ButtonOptionsInputCtrl;
  constructor(selector: Selector, private t: TestController) {
    this.buttonOptions = new ButtonOptionsInputCtrl(selector, t);
  }

  async setValue(value: boolean): Promise<void> {
    return await this.buttonOptions.setValue(value ? "Yes" : "No");
  }

  async getValue(): Promise<null | boolean> {
    const selectedValueText = await this.buttonOptions.getValue();
    if (selectedValueText.length === 0) {
      return null;
    }

    return selectedValueText[0] === "Yes";
  }

  async appendValue(value: boolean): Promise<void> {
    return this.setValue(value);
  }

  async appendRandom(): Promise<boolean> {
    const randomValue = !!_.random(0, 1);
    await this.setValue(randomValue);
    return randomValue;
  }

  async expectValue(expectedValue: boolean): Promise<void> {
    const existingValue = await this.getValue();
    await this.t.expect(existingValue).eql(expectedValue);
  }
}
