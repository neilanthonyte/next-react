import { defaultCharset } from "next-shared/src/helpers/constants";
import { generateCode } from "../../../../helpers/generateCode";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { IInputCtrl } from "../../BaseInput/_tests/IInputCtrl";

export class PinInputCtrl implements IInputCtrl<string> {
  public pinInput: Selector;
  private _currentIndex: number = 0;

  constructor(
    private selector: Selector,
    private t: TestController,
    private charset: string = defaultCharset,
  ) {
    this.pinInput = selector.find(toTestSelector("pin-input"));
  }

  public async appendRandom(): Promise<string> {
    const length = await this.getLength();
    const randomPin = generateCode(length, this.charset);
    await this.appendValue(randomPin);
    return randomPin;
  }

  public async appendValue(value: string): Promise<void> {
    await this.updateValue(value, this._currentIndex);
  }

  public async clearInput(): Promise<void> {
    // TODO: figure out why this is not working
    this._currentIndex = 0;
    const length = await this.getLength();
    while (this._currentIndex < length) {
      const input = await this._selectInput(this._currentIndex);
      await this.t.selectText(input).pressKey("delete");
      this._currentIndex++;
    }
  }

  public async expectValue(value: string): Promise<void> {
    const currentValue = await this.getValue();
    await this.t.expect(currentValue).eql(value);
  }

  public async getLength(): Promise<number> {
    return await this.pinInput.child("div").childElementCount;
  }

  public async getValue(): Promise<null | string> {
    let index = 0;
    let value = "";
    while (index < (await this.getLength())) {
      const input = await this._selectInput(index);
      value += await input.getAttribute("value");
      index++;
    }
    return value;
  }

  public async setValue(value: string | null): Promise<void> {
    if (await this.getValue()) {
      await this.clearInput();
    }
    this._currentIndex = 0;
    await this.updateValue(value, this._currentIndex);
  }

  public async updateValue(value: string, startIndex: number): Promise<void> {
    // TODO: this will only work on an empty input
    // TODO: update the input with an already set value has too much randomness
    // TODO: try to fix this later
    let charIndex = 0;
    let currentIndex = startIndex;
    const length = await this.getLength();
    while (currentIndex < length) {
      const input = await this._selectInput(currentIndex);
      if (value[charIndex] !== undefined) {
        await this.t.typeText(input, value[charIndex]);
      } else {
        break;
      }
      charIndex++;
      currentIndex++;
      this._currentIndex = currentIndex;
    }
  }

  private async _selectInput(index: number): Promise<Selector> {
    const input = this.pinInput.find(`[data-id="${index}"]`);
    return input;
  }
}
