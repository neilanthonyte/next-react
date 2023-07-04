import { HeaderCtrl } from "../../../abstract/Section/components/Header/_tests/index.ctrl";
import { BodyCtrl } from "../../../abstract/Section/components/Body/_tests/index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { Selector } from "testcafe";

export class SidePanelPageCtrl {
  static selector: string = "side-panel-page";
  private sidePanelPage: Selector;
  public header: HeaderCtrl;
  public body: BodyCtrl;

  constructor(private s: Selector, private t: TestController) {
    this.sidePanelPage = this.s.find(
      toTestSelector(SidePanelPageCtrl.selector),
    );
    this.header = new HeaderCtrl(this.s, this.t);
    this.body = new BodyCtrl(this.s, this.t);
  }

  public async exists(value: boolean) {
    await this.t.expect(this.sidePanelPage.exists).eql(value);
  }
}
