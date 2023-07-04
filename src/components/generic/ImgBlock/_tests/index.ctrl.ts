import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class ImgBlockCtrl {
  private wrapper: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.wrapper = this.selector.find(toTestSelector("img-block-wrapper"));
  }

  public async exists() {
    return await this.wrapper.exists;
  }
}
