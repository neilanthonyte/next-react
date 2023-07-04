export const getCanvasBlob = async (
  canvas: HTMLCanvasElement,
): Promise<Blob> => {
  if (typeof canvas.toBlob !== "undefined") {
    return await new Promise((resolve) => {
      canvas.toBlob(resolve, "image/jpeg");
    });
  } else {
    // unsupported browser, IE, etc.
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob#Polyfill
    const binStr = atob(canvas.toDataURL("image/jpeg").split(",")[1]);
    const len = binStr.length;
    const arr = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      arr[i] = binStr.charCodeAt(i);
    }

    return new Blob([arr], { type: "image/jpeg" });
  }
};
