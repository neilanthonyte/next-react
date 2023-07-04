import * as React from "react";

import { CameraUpload, ICameraUploadProps } from "../../generic/CameraUpload";

export interface ICameraUploadInputProps extends ICameraUploadProps {
  value?: any;
  onInputChange?: (fileKey: string) => void;
}

const cameraUploadInputStyle = {
  display: "flex",
  justifyContent: "center",
};

/**
 * Provides a text input.
 */
export const CameraUploadInput: React.FC<ICameraUploadInputProps> = ({
  value = null,
  onInputChange,
  ...props
}) => {
  return (
    <div style={cameraUploadInputStyle}>
      <CameraUpload onChange={onInputChange} value={value} {...props} />
    </div>
  );
};
