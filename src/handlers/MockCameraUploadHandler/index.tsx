import * as React from "react";
import { useMemo } from "react";

import {
  ICameraUploadContextValue,
  CameraUploadContext,
} from "../../contexts/CameraUploadContext";

import { createGuid } from "next-shared/src/helpers/guid";

const dummyProvider: ICameraUploadContextValue = {
  getUploadDetails: function (
    uploadNameSpace: string = "testing",
    filename?: string,
  ) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          url: "upload-camera-image",
          method: "PUT",
          headers: {},
          fileKey: `${uploadNameSpace}/${createGuid()}/${filename}`,
        });
      }, 250);
    });
  },
  getSignedImageUrl: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          "https://www.placecage.com/gif/200/200?randomNumber=" +
            Math.floor(Math.random() * 1000),
        );
      }, 250);
    });
  },
};

/**
 * A wrapper that can be used in examples instead of repeating the contexts.
 */
export const MockCameraUploadHandler: React.FC<{
  customProviderMethods?: ICameraUploadContextValue;
}> = ({ customProviderMethods = {}, children }) => {
  const provider = useMemo(() => {
    return {
      getSignedImageUrl:
        customProviderMethods.getSignedImageUrl ||
        dummyProvider.getSignedImageUrl,
      getUploadDetails:
        customProviderMethods.getUploadDetails ||
        dummyProvider.getUploadDetails,
    };
  }, [customProviderMethods]);

  return (
    <CameraUploadContext.Provider value={provider}>
      {children}
    </CameraUploadContext.Provider>
  );
};
