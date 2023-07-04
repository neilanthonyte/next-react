import { Selector } from "testcafe";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ImgCtrl } from "../../Img/_tests/index.ctrl";

export class ImageTextPairCtrl {
  public image: ImgCtrl;
  public text: Selector;
  constructor(private selector: Selector, private t: TestController) {
    this.image = new ImgCtrl(this.selector, this.t);
    this.text = this.selector.find(toTestSelector("text"));
  }
}
