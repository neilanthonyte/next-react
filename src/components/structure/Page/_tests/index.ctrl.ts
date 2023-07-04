import { HeaderCtrl } from "../../../abstract/Section/components/Header/_tests/index.ctrl";
import { BodyCtrl } from "../../../abstract/Section/components/Body/_tests/index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class PageCtrl {
  static selector: string = "page";
  private page: Selector;
  public header: HeaderCtrl;
  public body: BodyCtrl;

  constructor(private s: Selector, private t: TestController) {
    this.page = this.s.find(toTestSelector(PageCtrl.selector));
    this.header = new HeaderCtrl(this.s, this.t);
    this.body = new BodyCtrl(this.s, this.t);
  }

  public async exists(value: boolean) {
    await this.t.expect(this.page.exists).eql(value);
  }
}
