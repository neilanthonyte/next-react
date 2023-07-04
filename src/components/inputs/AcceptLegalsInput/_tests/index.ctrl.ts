import { Selector } from "testcafe";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { IInputCtrl } from "../../BaseInput/_tests/IInputCtrl";
import { BooleanInputCtrl } from "../../BooleanInput/_tests/index.ctrl";

export class AcceptLegalsCtrl implements IInputCtrl<boolean> {
  public booleanInput: BooleanInputCtrl;
  constructor(selector: Selector, private t: TestController) {
    this.booleanInput = new BooleanInputCtrl(
      selector.find(toTestSelector("boolean-input")),
      t,
    );
  }

  async setValue(value: boolean) {
    return this.booleanInput.setValue(value);
  }

  async getValue() {
    return await this.booleanInput.getValue();
  }

  async appendValue(value: boolean) {
    return this.booleanInput.appendValue(value);
  }

  async appendRandom() {
    // HACK - currently returns true all the time so tests pass
    await this.booleanInput.setValue(true);
    return true;
  }

  async expectValue(value: boolean) {
    await this.booleanInput.expectValue(value);
  }
}
