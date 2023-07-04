import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ImgUploaderCtrl } from "./index.ctrl";

fixture("ImgUploader").page("http://localhost:6060/#/ImgUploader");

test("Existing images are displayed", async (t) => {
  const example = Selector(toTestSelector("ImgUploader-standard-scenario"));
  const imgUploader = new ImgUploaderCtrl(example, t);

  const existingImages = await imgUploader.getImageCount();
  await t.expect(existingImages).eql(2);
});

test("onChange is called after images have been uploaded", async (t) => {
  const example = Selector(toTestSelector("ImgUploader-standard-scenario"));
  const imgUploader = new ImgUploaderCtrl(example, t);
  await imgUploader.removeAllImages();
  await t.wait(1000);
  await imgUploader.uploadImages(2);
  await t.wait(1000);
  await t.expect(await imgUploader.getImageCount()).eql(2);
  await imgUploader.removeAllImages();
  await t.wait(1000);
  await t.expect(await imgUploader.getImageCount()).eql(0);
  await imgUploader.uploadImages(3);
  await t.wait(1000);
  await t.expect(await imgUploader.getImageCount()).eql(3);
});

test("Removes the correct image and calls the onchange with the correct data when a user clicks on the 'x'", async (t) => {
  const example = Selector(toTestSelector("ImgUploader-removing-images"));
  const imgUploader = new ImgUploaderCtrl(example, t);

  const remove = async (indexOfImageToRemove: number, currentCount: number) => {
    await imgUploader.removeImage(indexOfImageToRemove);
    await t.wait(1000);
    const urlSpansSelector = await example
      .find(toTestSelector("output"))
      .find(toTestSelector("url"));
    const urlSpansCount = await urlSpansSelector.count;

    // current count - 1 because we have removed an image
    await t.expect(urlSpansCount).eql(currentCount - 1);

    for (let i = 0; i < urlSpansCount; i += 1) {
      const url = await urlSpansSelector.nth(i).innerText;
      // ensures that no urls contains the image that was removed
      await t.expect(!url.includes(`item=${indexOfImageToRemove}`)).ok();
    }
  };

  await remove(2, 4);
  await remove(2, 3);
  await remove(0, 2);
});

test("Empty image preview not shown if max image count is reached", async (t) => {
  const example = Selector(toTestSelector("ImgUploader-max-images-reached"));
  const imgUploader = new ImgUploaderCtrl(example, t);
  await t.expect(await imgUploader.isPreviewShowing()).notOk();
});

test("Image preview shown while there are still spots for images to be uploaded", async (t) => {
  const example = Selector(toTestSelector("ImgUploader-standard-scenario"));
  const imgUploader = new ImgUploaderCtrl(example, t);

  await imgUploader.removeAllImages();
  await t.wait(1000);

  // it should not show as there are no images (file uploader to display it's default)
  await t.expect(await imgUploader.isPreviewShowing()).notOk();
  await imgUploader.uploadImages(2);
  await t.wait(1000);
  // 2 images uploaded, should display the image preview
  await t.expect(await imgUploader.isPreviewShowing()).ok();

  await imgUploader.uploadImages(3);
  await t.wait(1000);
  // 5 is the limit, it should disappear
  await t.expect(await imgUploader.isPreviewShowing()).notOk();
});
