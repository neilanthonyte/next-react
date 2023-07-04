import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export default class FormGroupCtrl {
  constructor(private selector: Selector, private t: TestController) {}

  public async addAnotherEntry() {
    const button = this.selector.find(toTestSelector("add-another-entry"));

    await this.t.click(button);
  }
}
