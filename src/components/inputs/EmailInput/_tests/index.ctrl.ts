import * as faker from "faker";

import { IInputCtrl } from "../../BaseInput/_tests/IInputCtrl";
import { KeypadCtrl } from "../../../generic/Keypad/_tests/index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class EmailInputCtrl implements IInputCtrl<string> {
  public input: Selector;
  public card: Selector;
  public keypad: KeypadCtrl;

  constructor(public email: Selector, private t: TestController) {
    this.keypad = new KeypadCtrl(email, t);
    this.input = email.find(toTestSelector("input"));
    this.card = email.find(toTestSelector("key")).parent();
  }

  async setValue(value: string) {
    // HACK looks like our TestCafee version has this bug, should be fixed when uddated
    // https://github.com/DevExpress/testcafe/issues/3865
    await this.t.typeText(this.email, value, { paste: true });
  }

  async getValue() {
    return await this.email.value;
  }

  async click() {
    await this.t.click(this.input);
  }

  async pressKey(keysCommand: string) {
    await this.t.pressKey(keysCommand);
  }

  async expectValue(value: string) {
    await this.t.expect(this.input.value).eql(value);
  }

  async expectEmailHint(value: boolean) {
    //Card doesn't exist until the input activated
    await this.t.expect(this.card.exists).eql(value);
  }

  async expectHasPlaceholder(value: boolean) {
    await this.t.expect(this.input.hasAttribute("placeholder")).eql(value);
  }

  async expectIsDisabled(value: boolean) {
    await this.t.expect(this.input.hasAttribute("disabled")).eql(value);
  }

  async pressHint(index: number) {
    //Card doesn't exist until the input activated
    const button = this.card.find(toTestSelector("button")).nth(index);
    await this.t.click(button);
  }

  async appendValue(value: string) {
    const oldValue = (await this.getValue()) || "";
    const newValue = `${oldValue}${value}`;
    await this.setValue(newValue);
  }

  async appendRandom() {
    const randomValue = faker.internet.email();
    await this.appendValue(randomValue);
    return randomValue;
  }
}
