import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { IInputCtrl } from "../../BaseInput/_tests/IInputCtrl";

export class SingleOptionsInputCtrl implements IInputCtrl<string> {
  private input: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.input = selector.find(toTestSelector("input"));
  }

  async setValue(value: string) {
    await this.t
      .click(this.input)
      .click(this.input.find(toTestSelector("option-" + value)));
  }

  async appendValue(value: string) {
    this.setValue(value);
  }

  async appendRandom() {
    const optionElements = this.input.find("option[data-test]");
    let optionCount = await optionElements.count;
    let startOption = 0;
    if (optionCount > 1) {
      const firstOption = await optionElements
        .nth(0)
        .getAttribute("data-value");
      if (firstOption == '""') {
        optionCount--;
        startOption = 1;
      }
    }
    const random = Math.floor(Math.random() * optionCount) + startOption;
    const value = JSON.parse(
      await optionElements.nth(random).getAttribute("data-value"),
    );
    await this.setValue(value);
    return value;
  }

  async expectValue(value: string) {
    await this.t.expect(await this.getValue()).eql(value);
  }

  async getValue() {
    const optionElements = this.input.find("option");
    const arrayPosition = await this.input.value;
    const value = await optionElements
      .nth(parseInt(arrayPosition))
      .getAttribute("data-value");

    return JSON.parse(value);
  }

  async expectPlaceholder(value: string, position: number) {
    const option = this.input.find("option").withAttribute("data-value", '""');
    await this.t.expect(await option.innerText).eql(value);
    await this.t
      .expect(await option.getAttribute("value"))
      .eql(position.toString());
  }

  async expectDisabled(value: boolean) {
    await this.t.expect(await this.input.hasAttribute("disabled")).eql(value);
  }
}
