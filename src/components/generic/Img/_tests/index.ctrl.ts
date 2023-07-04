import { Selector } from "testcafe";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class ImgCtrl {
  constructor(private selector: Selector, private t: TestController) {}

  public async exists() {
    await this.t.expect(this.exists).ok();
  }

  public async expectSrcValue(value: string) {
    await this.t
      .expect(
        await this.selector.find(toTestSelector("image")).getAttribute("src"),
      )
      .eql(value);
  }

  public async expectStyleValue(property: string, value: string) {
    await this.t
      .expect(
        await this.selector
          .find(toTestSelector("image"))
          .getStyleProperty(property),
      )
      .eql(value);
  }
}
