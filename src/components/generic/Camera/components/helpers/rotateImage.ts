import * as Exif from "piexifjs";
import { DataType } from "../../index";
import { getCanvasBlob } from "./getCanvasBlob";
import { getImageTag } from "./getImage";

/**
 * Given a data url for a jpeg image, this will rotate it to be upwards, and then reset the orientation exif flag.
 * When the given data url is not for a jpeg image or is not of valid exif data, skip rotating and return the image in a format based on the return type.
 */
export const rotateImage = async (
  imageUrl: string,
  returnType: DataType,
): Promise<string | Blob> => {
  const canvas = document.createElement("canvas");

  // get an image element, we use this for width/height and drawing to the canvas.
  const imageElement = await getImageTag(imageUrl);

  // attempt to get the raw meta and exif data.
  let imageMeta, newImage;

  try {
    // when the image is jpeg with valid exif data
    imageMeta = Exif.load(imageUrl);
  } catch (e) {
    // when the image is not jpeg or not with valid exif data
    imageMeta = null;
  }

  // canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // const orientation: number = imageMeta ? imageMeta["0th"]["274"] : 1;
  // const spin: { [key: string]: number } = {
  //   1: 0, // the correct orientation, no adjustment is required.
  //   2: 0, // mirrored: image has been flipped back-to-front.
  //   3: 180, // image is upside down.
  //   4: 180, // mirrored: image has been flipped back-to-front and is upside down.
  //   5: 90, // image has been flipped back-to-front and is on its side.
  //   6: 90, // mirrored: image is on its side.
  //   7: 270, // image has been flipped back-to-front and is on its far side.
  //   8: 270, // mirrored: image is on its far side.
  // };

  // const degrees = spin[orientation.toString()];

  // if (degrees === 90 || degrees === 270) {
  //   canvas.width = imageElement.height;
  //   canvas.height = imageElement.width;
  // } else {
  //   canvas.width = imageElement.width;
  //   canvas.height = imageElement.height;
  // }
  canvas.width = imageElement.width;
  canvas.height = imageElement.height;

  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // if (degrees === 90 || degrees === 270) {
  //   ctx.translate(imageElement.height / 2, imageElement.width / 2);
  // } else {
  //   ctx.translate(imageElement.width / 2, imageElement.height / 2);
  // }
  ctx.translate(imageElement.width / 2, imageElement.height / 2);
  // ctx.rotate((degrees * Math.PI) / 180);
  ctx.drawImage(
    imageElement,
    -imageElement.width / 2,
    -imageElement.height / 2,
  );
  ctx.restore();

  return returnType === "blob"
    ? await getCanvasBlob(canvas)
    : canvas.toDataURL("image/jpeg");
};
