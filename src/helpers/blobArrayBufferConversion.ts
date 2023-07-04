/**
 * Converts data stored in an ArrayBuffer to a Blob (with the correct MIME type supplied as a parameter).
 *
 * @param {ArrayBuffer} buffer - The ArrayBuffer to convert.
 * @param {String} type - The MIME type of the Blob.
 * @returns {Blob} The Blob consisting of the data in the ArrayBuffer, with the specified MIME type.
 */
export const arrayBufferToBlob = (buffer: ArrayBuffer, type: string): Blob =>
  new Blob([buffer], { type: type });

/**
 * Asynchronously converts a Blob to an ArrayBuffer.
 *
 * @param {Blob} Blob - The Blob to convert.
 * @returns {Promise<[ArrayBuffer, string]>} Promise resolving to a tuple containing the converted ArrayBuffer and the MIME type of the blob.
 */
export const blobToArrayBuffer = (blob: Blob): Promise<[ArrayBuffer, string]> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("loadend", () =>
      resolve([reader.result as ArrayBuffer, blob.type]),
    );
    reader.addEventListener("error", reject);
    reader.readAsArrayBuffer(blob);
  });
