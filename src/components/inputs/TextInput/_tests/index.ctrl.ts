import * as faker from "faker";

import { KeypadCtrl } from "../../../generic/Keypad/_tests/index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { IInputCtrl } from "../../BaseInput/_tests/IInputCtrl";

export class TextInputCtrl implements IInputCtrl<string> {
  public input: Selector;
  public keypad: KeypadCtrl;

  constructor(selector: Selector, private t: TestController) {
    this.input = selector.find(toTestSelector("input"));
    this.keypad = new KeypadCtrl(selector, t);
  }

  public async setValue(value: string) {
    await this.t.selectText(this.input).pressKey("delete");
    if (value) {
      await this.appendValue(value);
    }
  }

  public async getValue() {
    return this.input.value;
  }

  public async appendValue(value: string) {
    await this.t.typeText(this.input, value);
  }

  public async appendRandom() {
    // allow for faker based hints
    const hint = await this.input.getAttribute("data-hint");
    let randomValue = "";
    switch (hint) {
      case "name":
        randomValue = faker.name.firstName();
        break;
      case "surname":
        randomValue = faker.name.lastName();
        break;
      case "weekday":
        randomValue = faker.date.weekday();
        break;
      default:
        randomValue = faker.lorem.words(5);
    }

    await this.appendValue(randomValue);
    return randomValue;
  }

  public async enterRandom() {
    // allow for faker based hints
    const hint = await this.input.getAttribute("data-hint");
    let randomValue = "";
    switch (hint) {
      case "name":
        randomValue = faker.name.firstName();
        break;
      case "surname":
        randomValue = faker.name.lastName();
        break;
      case "weekday":
        randomValue = faker.date.weekday();
        break;
      default:
        randomValue = faker.lorem.words(5);
    }

    await this.setValue(randomValue);
    return randomValue;
  }

  public async click() {
    await this.t.click(this.input);
  }

  public async pressKey(keysCommand: string) {
    await this.t.pressKey(keysCommand);
  }

  public async expectValue(value: string) {
    await this.t.expect(await this.getValue()).eql(value);
  }

  public async expectIsSingleLine() {
    await this.t.expect(await this.input.tagName).eql("input");
  }

  public async expectIsMultiLine() {
    await this.t.expect(await this.input.tagName).eql("textarea");
  }

  public async expectIsDisabled(isDisabled: boolean = true) {
    await this.t.expect(await this.input.hasAttribute("disabled")).eql(true);
  }

  public async expectPlaceholder(value: string) {
    await this.t
      .expect((await this.input.getAttribute("placeholder")).valueOf())
      .eql(value);
  }
}
