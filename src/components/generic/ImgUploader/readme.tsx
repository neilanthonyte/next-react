import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { ImgUploader } from ".";
import { MockCameraUploadHandler } from "../../../handlers/MockCameraUploadHandler";
import { useState } from "react";
import { IFileUploadFile } from "../FileUploader";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "ImgUploader",
      scenario: "standard",
    },
  });
  const [image, setImage] = useState<IFileUploadFile[]>();

  return (
    <MockCameraUploadHandler>
      <ImgUploader
        onChange={setImage}
        existingImages={image}
        maxImages={5}
        uploadNameSpace="testing"
      />
    </MockCameraUploadHandler>
  );
};
