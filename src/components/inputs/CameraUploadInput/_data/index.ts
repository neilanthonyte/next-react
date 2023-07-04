export const provider = {
  getUploadDetails: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          url: "upload-camera-image",
          method: "PUT",
          headers: {},
          fileKey:
            "testing-folder/2eb7c43a-ea47-4573-9c01-c80508eaa811/no-pre-existing.jpeg",
        });
      }, 1500);
    });
  },
  getSignedImageUrl: async (fileKey: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("http://lorempixel.com/g/400/200/");
      }, 1000);
    });
  },
};
