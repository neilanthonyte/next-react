import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { CellCtrl } from "../../../structure/Cell/_tests/index.ctrl";

export class PayDockSubscriptionCardCtrl {
  public cell: CellCtrl;
  constructor(private selector: Selector, private t: TestController) {
    this.cell = new CellCtrl(this.selector.child(), this.t);
  }

  async expectHeader(value: string) {
    const price = this.selector.find(toTestSelector("cell-description")).nth(0);
    await this.t.expect(price.exists).ok();
    await this.cell.expectHeading(value);
  }

  async expectBilling(value: string) {
    const last = this.selector.find(toTestSelector("cell-description")).nth(1);
    await this.t.expect(last.exists).ok();
    const next = this.selector.find(toTestSelector("cell-description")).nth(2);
    await this.t.expect(next.exists).ok();
    await this.cell.expectSubHeading(value);
  }
}
