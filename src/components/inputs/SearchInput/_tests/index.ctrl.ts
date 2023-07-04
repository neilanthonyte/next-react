import * as faker from "faker";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { KeypadCtrl } from "../../../generic/Keypad/_tests/index.ctrl";
import { IInputCtrl } from "../../BaseInput/_tests/IInputCtrl";

export class SearchInputCtrl implements IInputCtrl<string> {
  private input: Selector;
  private keypad: KeypadCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.input = this.selector.find(toTestSelector("search-input"));
    this.keypad = new KeypadCtrl(this.selector, this.t);
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

  public async expectValue(value: string) {
    await this.t.expect(await this.getValue()).eql(value);
  }
}
