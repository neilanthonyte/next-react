import { BodyCtrl } from "../components/Body/_tests/index.ctrl";
import { HeaderCtrl } from "../components/Header/_tests/index.ctrl";

export class SectionCtrl {
  static selector: string = "section";
  body: BodyCtrl;
  header: HeaderCtrl;

  constructor(private s: Selector, private t: TestController) {
    // use div[data-test="section"] tag itself rather than its parent
    // as the s selector for Section so as to accommodate scenarios
    // where multiple sections are contained by the same parent
    this.body = new BodyCtrl(this.s, this.t);
    this.header = new HeaderCtrl(this.s, this.t);
  }

  public async exists(value: boolean) {
    // as explained above, s points to the section itself
    await this.t.expect(this.s.exists).eql(value);
  }

  public async isSectionOpen() {
    return await this.body.isOpen();
  }

  public async expectSectionIsOpen(value: boolean) {
    await this.t.expect(await this.body.isOpen()).eql(value);
  }

  public async openSection() {
    const bodyIsOpen = await this.body.isOpen();

    if (bodyIsOpen) {
      return;
    }

    await this.clickHeader();
  }

  public async closeSection() {
    const bodyIsOpen = await this.body.isOpen();
    if (!bodyIsOpen) {
      return;
    }
    await this.clickHeader();
  }

  public async clickHeaderAction(action: number) {
    await this.header.clickAction(action);
  }

  public async expectHeaderActionLabelEquals(action: number, label: string) {
    await this.header.expectActionLabelEquals(action, label);
  }

  // public async checkBodyContent() {}

  // public async checkHeaderContent() {}

  public async clickHeader() {
    await this.header.clickHeader();
  }
}
