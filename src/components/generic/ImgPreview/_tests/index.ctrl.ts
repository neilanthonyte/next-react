import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { CircularIconCtrl } from "../../CircularIcon/_tests/index.ctrl";

export class ImgPreviewCtrl {
  private imgPreview: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.imgPreview = this.selector.find(toTestSelector("img-preview"));
  }

  /**
   * @note actionNumber starts at 0
   */
  public async clickAction(actionNumber: number) {
    const actionSelector = this.imgPreview.find(
      toTestSelector(`action-${actionNumber}`),
    );
    const actionCircularIcon = new CircularIconCtrl(actionSelector, this.t);
    await actionCircularIcon.click();
  }

  public async clickDecoration(decorationNumber: number) {
    const decorationSelector = this.imgPreview.find(
      toTestSelector(`decoration-${decorationNumber}`),
    );
    const decorationCircularIcon = new CircularIconCtrl(
      decorationSelector,
      this.t,
    );
    await decorationCircularIcon.click();
  }

  public async clickImagePreview() {
    await this.t.click(this.imgPreview);
  }
}
