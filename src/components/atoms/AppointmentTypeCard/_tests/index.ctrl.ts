import { CardCtrl } from "../../../structure/Card/_tests/index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { CellCtrl } from "../../../structure/Cell/_tests/index.ctrl";

export class AppointmentTypeCardCtrl {
  public card: CardCtrl;
  public cell: CellCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.card = new CardCtrl(
      this.selector.find(toTestSelector("appointment-type-card")),
      this.t,
    );

    this.cell = new CellCtrl(
      this.selector.find(toTestSelector("appointment-type-card")),
      this.t,
    );
  }

  public async expectDescription(description: string) {
    const value = await this.cell.getDescription();
    await this.t.expect(value).eql(description);
  }

  public async expectLabel(label: string) {
    const cellLabel = await this.getLabel();
    await this.t.expect(cellLabel).eql(label);
  }

  public async getLabel() {
    const label = await this.cell.getHeading();
    return label;
  }
}
