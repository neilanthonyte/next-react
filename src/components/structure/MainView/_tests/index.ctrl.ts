import { Selector } from "testcafe";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class MainViewCtrl {
  private mainView: Selector;
  private siteNav: Selector;
  private sidePanel: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.siteNav = this.selector.find(toTestSelector("siteNav"));
    this.mainView = this.selector.find(toTestSelector("main-view"));
    this.sidePanel = this.mainView.find(toTestSelector("side-panel"));
  }

  async clickPanelButton() {
    const link = this.mainView.find("a");
    await this.t.click(link);
  }

  public async openPage(path: string) {
    await this.t.click(this.siteNav.find(toTestSelector(path)));
  }

  async pageContentExists(path: string) {
    const view = this.selector.find("div").withAttribute("id", path).child();
    await this.t.expect(view.exists).ok();
  }
}
