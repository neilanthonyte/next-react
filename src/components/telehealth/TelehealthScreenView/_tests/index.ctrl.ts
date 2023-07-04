import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { CircularIconCtrl } from "../../../generic/CircularIcon/_tests/index.ctrl";
import { TabbedNavCtrl } from "../../../generic/TabbedNav/_tests/index.ctrl";

export class TelehealthScreenViewCtrl {
  public tabbedNav: TabbedNavCtrl;
  public toggleSizeBtn: CircularIconCtrl;
  public closePanelBtn: CircularIconCtrl;
  public teleheathScreenView: Selector;
  public panel: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.teleheathScreenView = this.selector.find(
      toTestSelector("telehealth-screen-view"),
    );
    this.tabbedNav = new TabbedNavCtrl(
      this.selector.find(toTestSelector("tabs")),
      this.t,
    );
    this.toggleSizeBtn = new CircularIconCtrl(
      this.selector.find(toTestSelector("toggle-size")),
      this.t,
    );
    this.closePanelBtn = new CircularIconCtrl(
      this.selector.find(toTestSelector("close-panel")),
      this.t,
    );
    this.panel = this.teleheathScreenView.find(toTestSelector("panel"));
  }

  public async selectTab(tabIndex: number) {
    await this.tabbedNav.clickTab(tabIndex);
  }

  public async expectToggleSizeButton() {
    return await this.toggleSizeBtn.selector.exists;
  }

  public async clickToggleSizeButton() {
    await this.toggleSizeBtn.click();
  }

  public async expectClosePanelButton() {
    return await this.closePanelBtn.selector.exists;
  }

  public async clickClosePanelButton() {
    await this.closePanelBtn.click();
  }

  public async expectPanelToBeOpenOnSmallScreen() {
    await this.panel.hasClass(".-open");
  }

  public async expectViewtoBeExpanded() {
    await this.t
      .expect(await this.teleheathScreenView.hasClass(".-minimised"))
      .eql(false);
  }

  public async expectViewtoBeMinimised() {
    await this.t
      .expect(await this.teleheathScreenView.hasClass(".-minimised"))
      .eql(true);
  }
}
