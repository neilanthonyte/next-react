import { SectionCtrl } from "../../../abstract/Section/_tests/index.ctrl";
import { Selector } from "testcafe";

export class SidePanelPageSectionCtrl {
  static selector: string = "side-panel-page-section";
  public sidePanelSection: SectionCtrl;

  constructor(private s: Selector, private t: TestController) {
    // the selector should be div[data-test="side-panel-page-section"] itself
    // rather than its parent to accommodate multiple SidePanelPageSections being contained
    // by the same parent
    this.sidePanelSection = new SectionCtrl(this.s, this.t);
  }

  public async exists(value: boolean) {
    await this.t.expect(this.s.exists).eql(value);
  }
}
