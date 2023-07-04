import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ImgBlockCtrl } from "../../../../ImgBlock/_tests/index.ctrl";

export class CameraPreviewCtrl {
  private preview: Selector;
  public imgBlock: ImgBlockCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.preview = this.selector.find(toTestSelector("preview"));
    this.imgBlock = new ImgBlockCtrl(this.preview, t);
  }

  public async exists() {
    return await this.preview().exists;
  }

  public async isRound() {
    return !!(await this.preview().getAttribute("data-test-is-round"));
  }
}
