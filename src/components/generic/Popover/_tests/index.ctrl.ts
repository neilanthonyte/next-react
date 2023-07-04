import { Selector } from "testcafe";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class PopoverCtrl {
  private body: Selector;

  constructor(private selector: Selector, private t: TestController) {
    // The popover is placed at the top of the DOM
    // for this reason we cant use this.selector.
    this.body = Selector(toTestSelector("popover-body"));
  }

  public async exists() {
    return this.t.expect(await this.body.exists).ok();
  }

  public async findInBody(text: string) {
    return this.body.find(toTestSelector(text));
  }
}
