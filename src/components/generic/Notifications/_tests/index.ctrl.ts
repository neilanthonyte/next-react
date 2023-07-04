import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class NotificationsCtrl {
  public element: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.element = this.selector.find(toTestSelector("label"));
  }

  public async expectValue(value: string) {
    await this.t.expect(this.element.innerText).eql(value);
  }
}
