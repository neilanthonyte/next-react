import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";

export class StreamControlsCtrl {
  public streamControls: Selector;
  public videoControl: Selector;
  public audioControl: Selector;
  public shareScreenControl: Selector;
  public toggleCameraControl: Selector;
  public streamSizeControl: Selector;
  public endStreamControl: ButtonCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.streamControls = this.selector.find(toTestSelector("stream-controls"));
    this.videoControl = this.streamControls.find(
      toTestSelector("control-video"),
    );
    this.audioControl = this.streamControls.find(
      toTestSelector("control-audio"),
    );
    this.shareScreenControl = this.streamControls.find(
      toTestSelector("control-share-screen"),
    );
    this.toggleCameraControl = this.streamControls.find(
      toTestSelector("control-toggle-camera"),
    );
    this.streamSizeControl = this.streamControls.find(
      toTestSelector("control-stream-size"),
    );

    this.endStreamControl = new ButtonCtrl(
      this.streamControls.find(toTestSelector("control-end-stream")),
      this.t,
    );
  }

  public async expectStreamControls() {
    await this.streamControls.exists;
  }

  public async expectVideoControl() {
    await this.videoControl.exists;
  }

  public async clickVideoControl() {
    await this.t.click(this.videoControl);
  }

  public async expectAudioControl() {
    await this.audioControl.exists;
  }

  public async clickAudioControl() {
    await this.t.click(this.audioControl);
  }

  public async expectShareScreenControl() {
    await this.shareScreenControl.exists;
  }

  public async clickShareScreenControl() {
    await this.t.click(this.shareScreenControl);
  }

  public async expectToggleCameraControl() {
    await this.toggleCameraControl.exists;
  }

  public async clickToggleCameraControl() {
    await this.t.click(this.toggleCameraControl);
  }

  public async expectEndStreamControl() {
    await this.endStreamControl.exists;
  }

  public async clickEndStreamControl() {
    await this.endStreamControl.click();
  }

  public async expectStreamSizeControl() {
    await this.streamSizeControl.exists;
  }

  public async clickStreamSizeControl() {
    await this.t.click(this.streamSizeControl);
  }
}
