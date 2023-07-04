import * as React from "react";

import { FileUploader, IFileUploadFile } from "../FileUploader";
import { Grid } from "../../structure/Grid";
import {
  ImgPreview,
  ImgPreviewMainImage,
  ImgPreviewActions,
  ImgPreviewEmpty,
} from "../ImgPreview";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "ImgUploader");

export interface IImgUploaderProps {
  /** Maximum amount of images allowed to be uploaded */
  maxImages?: number;
  /** See FileUploader for more information on this prop and what default is set */
  maxFileSize?: number;
  /** Called when the images have been changed (uploaded or removed) */
  onChange?: (files: IFileUploadFile[]) => void;
  /** The previously uploaded images, or anything to preview  */
  existingImages?: IFileUploadFile[];
  /** Upload namespace for the uploading context */
  uploadNameSpace: string;
  /**
   * Tells the FileUploader component whether or not to use a guid as a file name
   */
  useGuidForFileName?: boolean;
}

/**
 * Utilises the base FileUploader component to upload and optionally preview images.
 *
 * @note this is used by the `ImageUploadInput` input.
 */
export const ImgUploader: React.FC<IImgUploaderProps> = ({
  existingImages = [],
  onChange,
  maxImages = Infinity,
  uploadNameSpace,
  maxFileSize,
  useGuidForFileName,
}) => {
  const onImagesUploaded = (files: IFileUploadFile[]) => {
    onChange && onChange([...existingImages, ...files]);
  };
  const onImageRemoved = (file: IFileUploadFile) => {
    onChange && onChange(existingImages.filter((x) => x.url !== file.url));
  };

  const filesLeft = maxImages - existingImages.length;
  const isDisabled = filesLeft <= 0;

  return (
    <div data-test="img-uploader">
      {!Array.isArray(existingImages) && (
        <div>ERROR: unexpected image data</div>
      )}
      {Array.isArray(existingImages) && (
        <FileUploader
          uploadNameSpace={uploadNameSpace}
          disabled={isDisabled}
          maxFiles={filesLeft}
          maxFileSize={maxFileSize}
          acceptedFileTypes="image/*"
          onFilesUploaded={onImagesUploaded}
          useGuidForFileName={useGuidForFileName}
        >
          {existingImages.length && (
            <Grid>
              {existingImages.map((x, i) => {
                return (
                  <div key={i} data-test={`existing-image existing-image-${i}`}>
                    <ImgPreview key={x.url}>
                      <ImgPreviewMainImage imageUrl={x.url} />
                      <ImgPreviewActions
                        actions={[
                          {
                            icon: "cancel",
                            onClick: (ev) => {
                              // we don't want the event bubbling up to the dropzone!
                              ev.stopPropagation();
                              onImageRemoved(x);
                            },
                          },
                        ]}
                      />
                    </ImgPreview>
                  </div>
                );
              })}
              {!isDisabled && (
                <div data-test="preview" className={css("preview")}>
                  <ImgPreview>
                    <ImgPreviewEmpty />
                  </ImgPreview>
                </div>
              )}
            </Grid>
          )}
        </FileUploader>
      )}
    </div>
  );
};
