import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ImgCtrl } from "../../../generic/Img/_tests/index.ctrl";

export class StaticLogoCtrl {
  private element: ImgCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.element = new ImgCtrl(this.selector.find(toTestSelector("image")), t);
  }

  public async exists() {
    await this.element.exists();
  }
}
