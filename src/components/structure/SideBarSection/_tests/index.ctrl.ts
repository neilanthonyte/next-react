import { SectionCtrl } from "../../../abstract/Section/_tests/index.ctrl";

export class SideBarSectionCtrl {
  static selector: string = "sidebar-section";
  public section: SectionCtrl;

  constructor(private s: Selector, private t: TestController) {
    // the s selector should be div[data-test="sidebar-section"] itself
    // rather than its parent to accommodate multiple SideBarSections being contained
    // by the same parent
    this.section = new SectionCtrl(this.s, this.t);
  }

  public async exists(value: boolean) {
    await this.t.expect(this.s.exists).eql(value);
  }
}
