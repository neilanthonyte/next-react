import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class BodyCtrl {
  static selector: string = "body";
  public body: Selector;

  constructor(private s: Selector, private t: TestController) {
    this.body = this.s.find(toTestSelector(BodyCtrl.selector));
  }

  public async exists(value: boolean) {
    await this.t.expect(this.body.exists).eql(value);
  }

  public async isOpen(): Promise<boolean> {
    const innerBody = this.body.find(toTestSelector("body-inner"));
    return innerBody.exists;
  }

  public async canBeClosed(): Promise<boolean> {
    const collapse = this.body.find(toTestSelector("collapse"));
    // body cannot be closed if it is not open.
    return (await collapse.exists) && (await this.isOpen());
  }
}
