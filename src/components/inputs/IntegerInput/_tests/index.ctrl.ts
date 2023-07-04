import * as _ from "lodash";

import { CircularIconCtrl } from "../../../generic/CircularIcon/_tests/index.ctrl";
import { KeypadCtrl } from "../../../generic/Keypad/_tests/index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { IInputCtrl } from "../../BaseInput/_tests/IInputCtrl";

export class IntegerInputCtrl implements IInputCtrl<string> {
  public input: Selector;
  public keypad: KeypadCtrl;
  public minusCounter: CircularIconCtrl;
  public plusCounter: CircularIconCtrl;

  constructor(selector: Selector, private t: TestController) {
    this.input = selector.find(toTestSelector("input"));
    this.keypad = new KeypadCtrl(selector, t);
    this.minusCounter = new CircularIconCtrl(
      selector.find(toTestSelector("minus-counter")),
      t,
    );
    this.plusCounter = new CircularIconCtrl(
      selector.find(toTestSelector("plus-counter")),
      t,
    );
  }

  public async appendRandom(): Promise<string> {
    const randomValue = Math.floor(Math.random() * 100).toString();
    await this.appendValue(randomValue);
    return randomValue;
  }

  public async appendValue(value: string): Promise<void> {
    await this.t.typeText(this.input, value);
  }

  public async click(): Promise<void> {
    await this.t.click(this.input);
  }

  async clickRandomNumber(): Promise<string> {
    const number = _.random(0, 9, false);

    await this.keypad.clickKey(number);
    return number.toString();
  }

  public async decrementCounter(): Promise<void> {
    await this.minusCounter.click();
  }

  public async enterRandom(): Promise<string> {
    const hint = await this.input.getAttribute("data-hint");
    const randomMaxLength = Math.floor(Math.random() * 15) + 1;
    let randomNumber: string = "";

    if (hint) {
      randomNumber = hint;
    } else {
      for (let i = 0; i < randomMaxLength; i++) {
        randomNumber = randomNumber + _.random(0, 9).toString();
      }
    }

    await this.setValue(randomNumber);
    return randomNumber;
  }

  public async expectAttribute(
    value: string,
    attributeName: string,
  ): Promise<void> {
    await this.t.expect(this.input.getAttribute(attributeName)).eql(value);
  }

  public async expectHasAttribute(
    value: boolean,
    attributeName: string,
  ): Promise<void> {
    await this.t.expect(this.input.hasAttribute(attributeName)).eql(value);
  }

  public async expectInputValue(value: string): Promise<void> {
    await this.t.expect(await this.input.value).eql(value);
  }

  public async expectKeypadExists(): Promise<boolean> {
    return await this.keypad.exists();
  }

  public async expectValue(value: string): Promise<void> {
    await this.t.expect(await this.getValue()).eql(value);
  }

  public async getValue(): Promise<string> {
    return await this.input.value;
  }

  public async incrementCounter(): Promise<void> {
    await this.plusCounter.click();
  }

  public async pressKey(keysCommand: string): Promise<void> {
    await this.t.pressKey(keysCommand);
  }

  public async setValue(value: string): Promise<void> {
    await this.t.selectText(this.input).pressKey("delete");
    if (value) {
      await this.appendValue(value);
    }
  }
}
