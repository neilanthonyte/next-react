import { SectionCtrl } from "../../../abstract/Section/_tests/index.ctrl";

export class PageSectionCtrl {
  static selector: string = "page-section";
  public section: SectionCtrl;

  constructor(private s: Selector, private t: TestController) {
    // the s selector should be div[data-test="page-section"] itself
    // rather than its parent to accommodate multiple PageSections being contained
    // by the same parent
    this.section = new SectionCtrl(this.s, this.t);
  }

  public async exists(value: boolean) {
    await this.t.expect(this.s.exists).eql(value);
  }
}
