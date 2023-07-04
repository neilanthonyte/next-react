import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

// https://testcafe.io/documentation/402758/reference/test-api/selector/addcustommethods
interface ICustomMediaSelector extends Selector {
  hasSource: (el: HTMLMediaElement) => boolean;
  isPlaying: (el: HTMLMediaElement) => boolean;
}
const customMethods = {
  hasSource: (el: HTMLMediaElement) => !!el.srcObject,
  isPlaying: (el: HTMLMediaElement) =>
    !!(el.currentTime > 0 && !el.paused && !el.ended && el.readyState > 2),
};

export class StreamViewCtrl {
  // public subcomponent: SubcomponentCtrl;
  public streamView: Selector;
  public stream: ICustomMediaSelector;
  public childStream: ICustomMediaSelector;
  public controls: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.streamView = this.selector.find(toTestSelector("stream-view"));
    this.stream = this.streamView
      .find(toTestSelector("stream"))
      .addCustomMethods(customMethods) as ICustomMediaSelector;
    this.childStream = this.streamView.find(
      toTestSelector("child-stream"),
    ) as ICustomMediaSelector;
    this.controls = this.streamView.find(toTestSelector("controls"));
  }

  public async expectStream() {
    await this.stream.exists;
  }

  public async expectStreamToBePlaying() {
    (await this.stream.hasSource) && this.stream.isPlaying;
  }

  public async expectChildStream() {
    await this.childStream.exists;
  }

  public async expectChildStreamToBePlaying() {
    (await this.childStream.hasSource) && this.childStream.isPlaying;
  }

  public async expectControls() {
    await this.controls.exists;
  }
}
