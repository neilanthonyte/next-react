/**
 * Given a data64Url of an image (maybe from a canvas?), this will return a `HTMLImageElement`.
 */
export const getImageTag = async (
  imageDataUrl: string,
): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.src = imageDataUrl;
  });
};
