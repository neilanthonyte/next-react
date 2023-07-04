import { IUploadDetails } from "../../../../client/modules/IUploadDetails";

export const provider = {
  getUploadDetails: async () => {
    const stuff = await fetch(
      "http://localhost:3000/files/getSignedUploadUrl?uploadDirectory=testing&fileName=image.jpeg&expiresIn=60",
    );
    const stuffJSON: IUploadDetails = await stuff.json();
    const encodedKey = encodeURIComponent(stuffJSON.fileKey);
    await fetch(
      `http://localhost:${6060}/upload-camera-image/set-key?key=${encodedKey}`,
    );
    return stuffJSON;
  },
  getSignedImageUrl: async (fileKey: string) => {
    const stuff = await fetch(
      `http://localhost:3000/files/getSignedFileUrl?fileKey=${fileKey}&expiresIn=60`,
    );
    const uploadUrl = await stuff.json();
    return uploadUrl;
  },
};

export const getPreExistingKey = async () => {
  const req = await fetch("http://localhost:6060/upload-camera-image/get-key");
  const key = await req.json();
  return key;
};

export const dummyProvider = {
  getUploadDetails: async (): Promise<IUploadDetails> => {
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
        resolve("http://via.placeholder.com/400/400");
      }, 1000);
    });
  },
};
