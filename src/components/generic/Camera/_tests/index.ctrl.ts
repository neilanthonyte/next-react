import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ButtonCtrl } from "../../Button/_tests/index.ctrl";
import { IconCtrl } from "../../Icon/_tests/index.ctrl";

import { CameraFeedCustomCtrl } from "../components/CameraFeedCustom/_tests/index.ctrl";
import { CameraFeedNativeCtrl } from "../components/CameraFeedNative/_tests/index.ctrl";
import { CameraFeedPlaceholderCtrl } from "../components/CameraFeedPlaceholder/_tests/index.ctrl";
import { CameraPreviewCtrl } from "../components/CameraPreview/_tests/index.ctrl";

export class CameraOptionsCtrl {
  private cameraOptionTakePhoto: Selector;
  private cameraOptionConfirmPhoto: Selector;

  public takePhoto: ButtonCtrl;
  private switchCamera: IconCtrl;
  private rejectPhoto: Selector;
  private acceptPhoto: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.cameraOptionTakePhoto = this.selector.find(
      toTestSelector("take-photo"),
    );
    this.cameraOptionConfirmPhoto = this.selector.find(
      toTestSelector("confirm-photo"),
    );
    this.takePhoto = new ButtonCtrl(this.cameraOptionTakePhoto, t);
    this.switchCamera = new IconCtrl(this.cameraOptionTakePhoto, t);
    this.rejectPhoto = this.cameraOptionConfirmPhoto
      .find(toTestSelector("icon"))
      .nth(0);
    this.acceptPhoto = this.cameraOptionConfirmPhoto
      .find(toTestSelector("icon"))
      .nth(1);
  }

  public async exists() {
    return (
      (await this.optionTakePhotoExists()) ||
      (await this.optionConfirmPhotoExists())
    );
  }

  public async optionTakePhotoExists() {
    return await this.cameraOptionTakePhoto.exists;
  }

  public async optionConfirmPhotoExists() {
    return await this.cameraOptionConfirmPhoto.exists;
  }

  public async switchCameraExists() {
    return await this.switchCamera.selector.exists;
  }

  public async rejectPhotoExists() {
    return await this.rejectPhoto.exists;
  }

  public async acceptPhotoExists() {
    return await this.acceptPhoto.exists;
  }

  public async clickTakePhoto() {
    await this.takePhoto.click();
  }

  public async clickSwitchCamera() {
    await this.switchCamera.click();
  }

  public async clickRejectPhoto() {
    await this.t.click(this.rejectPhoto);
  }

  public async clickAcceptPhoto() {
    await this.t.click(this.acceptPhoto);
  }
}
export class CameraCtrl {
  private camera: Selector;
  public cameraOptions: CameraOptionsCtrl;
  public cameraPreview: CameraPreviewCtrl;
  public cameraFeedPlaceholder: CameraFeedPlaceholderCtrl;
  public cameraFeedNative: CameraFeedNativeCtrl;
  public cameraFeedCustom: CameraFeedCustomCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.camera = this.selector.find(toTestSelector("camera"));
    this.cameraOptions = new CameraOptionsCtrl(this.camera, this.t);
    this.cameraPreview = new CameraPreviewCtrl(this.camera, this.t);
    this.cameraFeedPlaceholder = new CameraFeedPlaceholderCtrl(
      this.camera,
      this.t,
    );
    this.cameraFeedNative = new CameraFeedNativeCtrl(this.camera, this.t);
    this.cameraFeedCustom = new CameraFeedCustomCtrl(this.camera, this.t);
  }

  public async exists() {
    return await this.camera().exists;
  }
}
