import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class BadgeCtrl {
  private counter: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.counter = this.selector.find(toTestSelector("counter"));
  }

  public async expectCounterValue(count: string) {
    await this.t.expect(this.counter.innerText).eql(count);
  }
}
