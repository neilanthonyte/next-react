import * as React from "react";
import { IFileUploadFile } from "../../generic/FileUploader";
import { ImgUploader, IImgUploaderProps } from "../../generic/ImgUploader";

export interface IImageUploadInputProps
  extends Pick<
    IImgUploaderProps,
    "maxImages" | "uploadNameSpace" | "useGuidForFileName"
  > {
  value?: IFileUploadFile[];
  onInputChange: (files: IFileUploadFile[]) => void;
  metadata?: { [key: string]: any };
}

/**
 * An image upload input that can be used in forms

 * @see the `ImgUploader` and `FileUploader` atoms for more information
 */
export const ImageUploadInput: React.FC<IImageUploadInputProps> = ({
  metadata = {},
  ...props
}) => {
  return (
    <ImgUploader
      {...props}
      onChange={(images: IFileUploadFile[]) => {
        // attach the metadata if provided
        const withMetadata = images.map((img) => ({ ...metadata, ...img }));
        props.onInputChange(withMetadata);
      }}
      existingImages={props.value || []}
    />
  );
};
