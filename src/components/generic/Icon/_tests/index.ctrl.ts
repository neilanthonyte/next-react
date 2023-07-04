import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class IconCtrl {
  public childIcon: Selector;
  constructor(public selector: Selector, private t: TestController) {
    this.selector = selector.find(toTestSelector("icon"));
    this.childIcon = selector.find(toTestSelector("child-icon"));
  }

  public async click() {
    await this.t.click(this.selector);
  }

  public async hasChildIcon(): Promise<boolean> {
    return this.childIcon.exists;
  }
}
