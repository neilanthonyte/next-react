import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class HeroContentCtrl {
  private content: Selector;

  constructor(public selector: Selector, private t: TestController) {
    this.content = this.selector.find(toTestSelector("hero-content"));
  }
}
