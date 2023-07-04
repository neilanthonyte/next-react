import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ListCtrl } from "../../List/_tests/index.ctrl";

export class TableOfContentsCtrl {
  static selector: string = "table-of-contents";
  private tableOfContents: Selector;
  public list: ListCtrl;

  constructor(private s: Selector, private t: TestController) {
    this.tableOfContents = this.s.find(
      toTestSelector(TableOfContentsCtrl.selector),
    );
    this.list = new ListCtrl(this.tableOfContents, this.t);
  }

  public async exists(value: boolean) {
    await this.t.expect(this.tableOfContents.exists).eql(value);
  }
}
