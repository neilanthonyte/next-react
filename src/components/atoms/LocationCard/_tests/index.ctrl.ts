import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { CardCtrl } from "../../../structure/Card/_tests/index.ctrl";
import { CellCtrl } from "../../../structure/Cell/_tests/index.ctrl";

// TODO - discuss how to add a data-test id to this component
// wrapping it in a div causes the card to get into a strange state when in a content grid
export class LocationCardCtrl {
  public card: CardCtrl;
  public cell: CellCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.card = new CardCtrl(
      this.selector.find(toTestSelector("location-card")),
      this.t,
    );
    this.cell = new CellCtrl(
      this.selector.find(toTestSelector("location-card")),
      this.t,
    );
  }

  public async expectAddress(address: string) {
    const value = await this.cell.getDescription();
    await this.t.expect(value).eql(address);
  }

  public async expectName(name: string) {
    const heading = await this.getName();
    await this.t.expect(heading).eql(name);
  }

  public async getName() {
    const heading = await this.cell.getHeading();
    return heading;
  }
}
