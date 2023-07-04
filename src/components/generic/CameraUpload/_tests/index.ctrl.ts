import { CameraCtrl } from "../../Camera/_tests/index.ctrl";

export class CameraUploadCtrl {
  public camera: CameraCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.camera = new CameraCtrl(this.selector, this.t);
  }
}
