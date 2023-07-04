import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class PlaceholderViewCtrl {
  public element: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.element = this.selector.find(toTestSelector("placeholder-view"));
    // this.subcomponent = new SubcomponentCtrl(
    //   this.selector.find(toTestSelector("componentSelector")),
    //   this.t,
    // );
  }

  public async exists() {
    await this.t.expect(this.element.exists).ok();
  }
}
