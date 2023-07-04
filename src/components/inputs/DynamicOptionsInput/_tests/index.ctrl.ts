import { ButtonOptionsInputCtrl } from "../../../inputs/ButtonOptionsInput/_tests/index.ctrl";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { IInputCtrl } from "../../BaseInput/_tests/IInputCtrl";
import { SingleOptionsInputCtrl } from "../../SingleOptionsInput/_tests/index.ctrl";
export class DynamicOptionsInputCtrl<T> implements IInputCtrl<string> {
  public input: Selector;
  public buttonOptions: ButtonOptionsInputCtrl;
  public singleOptions: SingleOptionsInputCtrl;
  constructor(private selector: Selector, private t: TestController) {
    this.input = selector.find(toTestSelector("input"));

    this.buttonOptions = new ButtonOptionsInputCtrl(selector, this.t);

    this.singleOptions = new SingleOptionsInputCtrl(selector, t);
    this.t = t;
  }

  async setValue(value: string) {
    const optionElement = this.selector
      .find("[data-dynamic-input]")
      .getAttribute("data-dynamic-input");
    if ((await optionElement) === "ButtonOptionsInput") {
      return await this.buttonOptions.setValue(value);
    }

    if ((await optionElement) === "SingleOptionsInput") {
      return await this.singleOptions.setValue(value);
    }
  }

  async appendValue() {
    throw new Error("unimplemented");
  }

  async appendRandom() {
    const optionElement = this.selector
      .find("[data-dynamic-input]")
      .getAttribute("data-dynamic-input");
    if ((await optionElement) === "ButtonOptionsInput") {
      return await this.buttonOptions.appendRandom();
    }

    if ((await optionElement) === "SingleOptionsInput") {
      return await this.singleOptions.appendRandom();
    }
  }

  async getValue() {
    const optionElement = this.selector
      .find("[data-dynamic-input]")
      .getAttribute("data-dynamic-input");
    if ((await optionElement) === "ButtonOptionsInput") {
      return await this.buttonOptions.getValue();
    }

    if ((await optionElement) === "SingleOptionsInput") {
      return await this.singleOptions.getValue();
    }
  }

  async expectValue(value: string): Promise<void> {
    await this.t
      .expect(this.selector.find(toTestSelector("input")).innerText)
      .eql(value.toString());
  }
}
