import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { FileUploaderCtrl } from "../../FileUploader/_tests/index.ctrl";
import { ImgPreviewCtrl } from "../../ImgPreview/_tests/index.ctrl";

export class ImgUploaderCtrl {
  private readonly imgUploader: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.imgUploader = this.selector.find(toTestSelector("img-uploader"));
  }

  public async uploadImages(numberOfImages: number) {
    const fileUploaderCtrl = new FileUploaderCtrl(this.imgUploader, this.t);
    await fileUploaderCtrl.uploadFiles(numberOfImages);
  }

  /**
   * Preview is the icon that appears to the users so that they know they are able to upload more images.
   */
  public async isPreviewShowing() {
    const preview = this.imgUploader.find(toTestSelector("preview"));
    const exists = await preview.exists;

    return exists;
  }

  /**
   * Returns the number of currently uploaded/displayed images.
   *
   * @note this is NOT zero indexed
   */
  public async getImageCount(): Promise<number> {
    const existingImages = this.imgUploader.find(
      `[data-test~="existing-image"]`,
    );

    const count = await existingImages.count;

    return count;
  }

  public async removeAllImages() {
    const images = await this.getImageCount();

    for (let i = 0; i < images; i += 1) {
      // remove the first image each time
      await this.removeImage(0);
    }
  }

  /**
   *
   * @param imageNumber the index of the image you want to remove currently being previewed
   */
  public async removeImage(imageNumber: number) {
    const existingImage = this.imgUploader.find(
      `[data-test~="existing-image-${imageNumber}"]`,
    );
    const imagePreview = new ImgPreviewCtrl(existingImage, this.t);
    imagePreview.clickAction(0);
  }
}
