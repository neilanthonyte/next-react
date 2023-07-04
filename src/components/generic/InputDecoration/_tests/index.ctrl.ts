import { Selector } from "testcafe";
import { TLayoutDirections } from "next-shared/src/types/layouts";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class InputDecorationCtrl {
  public formInput: Selector;
  public label: Selector;
  public description: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.formInput = selector.find(toTestSelector("form-input"));
    this.label = selector.find(toTestSelector("label"));
    this.description = selector.find(toTestSelector("description"));
  }

  async expectRequired(isRequired: boolean = true) {
    const label = await this.label.innerText;
    if (isRequired) {
      await this.t.expect(label).notContains("(optional)");
    } else {
      await this.t.expect(label).contains("(optional)");
    }
  }

  async expectLabel(value: string) {
    await this.t.expect(await this.label.innerText).contains(value);
  }

  async expectDescription(value: string) {
    await this.t.expect(await this.description.innerText).eql(value);
  }

  async expectNoDescription() {
    await this.t.expect(await this.description.exists).notOk();
  }

  public async expectLayoutDirection(layoutDirection: TLayoutDirections) {
    await this.t
      .expect((await this.formInput.getAttribute("data-layout")).valueOf())
      .eql(`${layoutDirection}`);
  }
}
