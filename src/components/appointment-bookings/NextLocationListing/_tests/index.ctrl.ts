import { CellCtrl } from "../../../structure/Cell/_tests/index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

// wrapping it in a div causes the card to get into a strange state when in a content grid
export class NextLocationListingCtrl {
  public cell: CellCtrl;
  public title: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.cell = new CellCtrl(
      this.selector.find(toTestSelector("cell")),
      this.t,
    );
    this.title = this.selector.find(toTestSelector("title"));
  }

  public async expectTitle(title: string) {
    await this.t.expect(this.title.innerText).eql(title);
  }

  public async clickChevron() {
    // select chevron
    await this.cell.clickAction(0);
  }
  public async click() {
    await this.cell.clickCell();
  }
}
