import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class KeypadWrapperCtrl {
  public input: Selector;
  public keypadOptions: Selector;

  constructor(private wrapper: Selector, private t: TestController) {
    this.input = wrapper.find(toTestSelector("input"));
    this.keypadOptions = wrapper.find("button");
  }
  async click() {
    await this.t.click(this.input);
  }

  async expectKeypadOptions(values: string[]) {
    await this.click();
    for (const value of values) {
      this.t.expect(this.keypadOptions.withText(value).exists).ok;
    }
  }

  async selectKeypadOption(value: string) {
    await this.click();
    const button = this.keypadOptions.withText(value);
    await this.t.click(button);
  }

  async expectInput(value: string) {
    await this.t.expect(this.input.value).eql(value);
  }
}
