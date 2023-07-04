// import { Selector } from "testcafe";
import * as faker from "faker";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { KeypadCtrl } from "../../../generic/Keypad/_tests/index.ctrl";
import { IInputCtrl } from "../../BaseInput/_tests/IInputCtrl";
export class TextNumberInputCtrl implements IInputCtrl<string> {
  public input: Selector;
  public keypad: KeypadCtrl;
  constructor(selector: Selector, private t: TestController) {
    this.input = selector.find(toTestSelector("input"));
    this.keypad = new KeypadCtrl(selector, t);
  }

  async setValue(value: string) {
    await this.t.selectText(this.input).pressKey("delete");
    if (value) {
      await this.appendValue(value);
    }
  }

  async expectValue(value: string) {
    await this.t.expect(await this.getValue()).eql(value);
  }

  async getValue() {
    return this.input.value;
  }

  async appendValue(value: string) {
    await this.t.typeText(this.input, value);
  }

  /**
   * Fill random text based on a hint. The hint should be a known faker function.
   */
  async appendRandom() {
    // allow for faker based hints
    const hint = await this.input.getAttribute("data-hint");
    const randomValue = faker.random.number().toString();

    await this.appendValue(randomValue);
    return randomValue;
  }
  async enterValue(value: string) {
    await this.t.typeText(this.input, value);
  }
  public async enterRandom() {
    return "";
  }
  async enterRandomNumber() {
    const randomNumber = faker.random.number().toString();

    await this.enterValue(randomNumber);
    return randomNumber;
  }
  async enterRandomAlphanumeric() {
    const randomNumber = faker.random.alphaNumeric(10);

    await this.enterValue(randomNumber);
    return randomNumber;
  }

  async click() {
    await this.t.click(this.input);
  }

  async checkAttribute(value: string, attributeName: string) {
    await this.t.expect(this.input.getAttribute(attributeName)).eql(value);
  }

  async checkHasAttribute(value: boolean, attributeName: string) {
    await this.t.expect(this.input.hasAttribute(attributeName)).eql(value);
  }
}
