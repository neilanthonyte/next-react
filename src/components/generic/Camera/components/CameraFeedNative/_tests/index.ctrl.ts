import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class CameraFeedNativeCtrl {
  private input: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.input = this.selector.find(toTestSelector("native-feed"));
  }

  public async exists() {
    return await this.input.exists;
  }

  public async setCapturedPhoto(index: number) {
    await this.t.setFilesToUpload(this.input, `${__dirname}/img${index}.jpg`);
  }
}
