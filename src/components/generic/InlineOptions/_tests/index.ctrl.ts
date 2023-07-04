import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class InlineOptionsCtrl {
  constructor(private selector: Selector, private t: TestController) {}

  public async clickOption(option: string) {
    await this.t.click(
      this.selector.find(toTestSelector("option")).withText(option),
    );
  }

  // multiple options can be selected
  public async getSelectedOptions(): Promise<string[]> {
    const selectedOptionElms = this.selector.find(
      toTestSelector("true", "data-test-selected"),
    );
    const numSelectedOptions = await selectedOptionElms.count;

    const selectedOptions: string[] = [];

    for (let i = 0; i < numSelectedOptions; i++) {
      const selectedOptionLabel = await selectedOptionElms.nth(i).innerText;

      selectedOptions.push(selectedOptionLabel);
    }

    return selectedOptions;
  }

  public async getAllOptions(): Promise<string[]> {
    const selectedOptionElms = this.selector.find(toTestSelector("option"));
    const numSelectedOptions = await selectedOptionElms.count;

    const selectedOptions: string[] = [];

    for (let i = 0; i < numSelectedOptions; i++) {
      const selectedOptionLabel = await selectedOptionElms.nth(i).innerText;

      selectedOptions.push(selectedOptionLabel);
    }

    return selectedOptions;
  }

  public async expectValue(expectedOptions: string[]) {
    const selectedOptions = await this.getSelectedOptions();

    expectedOptions.sort();
    selectedOptions.sort();

    await this.t.expect(selectedOptions).eql(expectedOptions);
  }
}
