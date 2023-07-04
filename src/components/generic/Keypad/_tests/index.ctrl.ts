import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ButtonCtrl } from "../../Button/_tests/index.ctrl";

export class KeypadCtrl {
  private _keypad: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.selector = selector;
    this.t = t;
    this._keypad = this.selector.find(toTestSelector("keypad"));
  }

  public async clickKey(value: any): Promise<void> {
    const key = new ButtonCtrl(
      this.selector.find(toTestSelector(`${value}`, "data-key")),
      this.t,
    );
    await key.click();
  }

  public async clickKeyByIndex(index: number): Promise<void> {
    const key = new ButtonCtrl(
      this.selector.find(toTestSelector(`${index}`, "data-index")),
      this.t,
    );

    await key.click();
  }

  public async clickRandom(): Promise<void> {
    const keyCount = await this.selector.find(toTestSelector("key")).count;
    const index = _.random(0, keyCount, false);
    await this.clickKeyByIndex(index);
  }

  public exists(): Promise<boolean> {
    return this._keypad.exists;
  }
}
