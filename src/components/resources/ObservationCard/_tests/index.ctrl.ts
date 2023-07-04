import { CellCtrl } from "../../../structure/Cell/_tests/index.ctrl";
import { CardCtrl } from "../../../structure/Card/_tests/index.ctrl";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirObservationUtil } from "next-shared/src/fhirUtil/utilClasses/FhirObservationUtil";

export class ObservationCardCtrl {
  public card: CardCtrl;
  public cell: CellCtrl;

  constructor(public selector: Selector, private t: TestController) {
    this.card = new CardCtrl(this.selector.find(toTestSelector("card")), t);
    this.cell = new CellCtrl(this.selector.find(toTestSelector("cell")), t);
  }

  public async checkObservation(obsData?: fhir3.Observation) {
    // extract observation details from object
    const observationName =
      fhirUtil<FhirObservationUtil>(obsData).getObservationDisplayName();
    // check observation name
    const testHeading = await this.cell.getTypeLabel();
    await this.t
      .expect(testHeading.toLowerCase())
      .eql(observationName.toLowerCase());
  }

  public async expectShorten() {
    const SHORT_DESCRIPTIONS_WORLDNUM = 10;
    const CARD_NAME_WORLDNUM = 3;
    await this.card.expectContentLength(
      SHORT_DESCRIPTIONS_WORLDNUM + CARD_NAME_WORLDNUM,
    );
  }

  public async expectToShowFallback() {
    await this.card.expectToShowFallback();
  }
}
