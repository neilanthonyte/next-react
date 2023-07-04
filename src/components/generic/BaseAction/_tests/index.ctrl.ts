import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class ActionCtrl {
  constructor(private selector: Selector, private t: TestController) {}

  async expectButtonLabel(value: string, id: number) {
    const button = this.selector.find(toTestSelector("button")).nth(id);
    await this.t.expect(button.innerText).eql(value);
  }
}
