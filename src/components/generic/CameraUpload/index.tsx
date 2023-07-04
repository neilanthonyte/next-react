import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { CameraUploadContext } from "../../../contexts/CameraUploadContext";
import { Camera, FacingMode, ICameraProps } from "../Camera";
import axios from "axios";
import { CameraPreview } from "../Camera/components/CameraPreview";

export type fileKey = string;

/**
 * All this typescript magic is doing is remove returnType and onPhotoTaken from the ICameraProps interface.
 *
 * onPhotoTaken is implemented internally by the camera upload component.
 * returnType is also internally implemented, we hardcode this to be a blob as we need to upload a binary file.
 */
type ICameraPropsEmitted = Pick<
  ICameraProps,
  Exclude<keyof ICameraProps, "returnType" | "onPhotoTaken">
>;

export interface ICameraUploadProps extends ICameraPropsEmitted {
  /** Returns a new fileKey on a new image upload. */
  onChange?: (fileKey: fileKey) => void;
  /** A pre-existing file key */
  value?: fileKey;
  /**
   * Where this should be uploading the bucket, this might just be a folder name"
   * @example
   * uploadNamespace = "profile-images";
   * // the file key might look something like
   * fileKey = "profile-images/so3478s-g737g-sd7374f-ffsd/image.jpeg"
   */
  uploadNamespace: string;
}

/**
 * The CameraUpload component wraps the Camera component, and should be wrapped in a context (CameraUploadContext),
 * which contains methods that relate to uploading and getting the image.
 *
 * This component will call the `onChange` prop when a new image has been taken
 * The contents of the `value` prop should be a fileKey, that directly relates to the image stored in a Bucket,
 * The CameraUpload component will then use the methods provided by the context to get a "signed" url of the image,
 * this url is then passed directly to the Camera component, which will instead of showing the camera, render the image.
 */
export const CameraUpload: React.FC<ICameraUploadProps> = ({
  onChange,
  value = null,
  uploadNamespace,
  ...props
}) => {
  const context = useContext(CameraUploadContext);
  const [uploading, setUploading] = useState(false);
  /**
   * If a value is passed in on the first render, we know we are getting the value,
   * therefore set gettingUrl to true, which will in turn not show the Camera Component yet.
   */
  const [gettingUrl, setGettingUrl] = useState(!!value);
  const [image, setImage] = useState<string>(null);

  useEffect(() => {
    if (value === null) {
      // if the input has been cleared.
      if (image !== null) {
        setImage(null);
      }
      return;
    }
    if (value !== null) {
      setGettingUrl(true);
      (async () => {
        const url = await context.getSignedImageUrl(value);
        setImage(url);
        setGettingUrl(false);
        // tslint:disable-next-line:no-console
      })().catch(console.error);
    }
  }, [value]);

  if (image || gettingUrl || uploading) {
    const style = {
      height: props.videoWidth,
      width: props.videoWidth,
    };

    return (
      <div style={style}>
        <CameraPreview image={image} round={props.isRoundStyle} />
      </div>
    );
  }

  const customProps: ICameraProps = {
    ...props,
    returnType: "blob",
    onPhotoTaken: async (newImage) => {
      setUploading(true);

      const {
        url,
        headers,
        method,
        fileKey: key,
        body,
      } = await context.getUploadDetails(uploadNamespace, newImage);

      await axios({
        method,
        url,
        headers,
        data: body || newImage,
      });

      onChange(key);
      setUploading(false);
    },
  };
  return <Camera {...customProps} />;
};
