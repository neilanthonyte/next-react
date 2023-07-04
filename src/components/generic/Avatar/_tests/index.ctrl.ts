import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class AvatarCtrl {
  private image: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.image = this.selector.find(toTestSelector("image"));
  }

  public async exists() {
    await this.t.expect(await this.image.exists).ok();
  }

  public async expectSourceValue(value: string) {
    await this.t
      .expect(await this.image.getStyleProperty("background-image"))
      .contains(value);
  }

  public async expectCorrectSize(size: number) {
    await this.t
      .expect(await this.image.getStyleProperty("height"))
      .eql(`${size}px`);
    await this.t
      .expect(await this.image.getStyleProperty("width"))
      .eql(`${size}px`);
  }
}
