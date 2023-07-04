import * as React from "react";
import { useContext } from "react";
import { DropzoneInputProps, useDropzone } from "react-dropzone";
import * as _ from "lodash";
import axios from "axios";

import { CameraUploadContext } from "../../../contexts/CameraUploadContext";
import { Button } from "../Button";
import { createGuid } from "next-shared/src/helpers/guid";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "Dropzone");

export interface IFileUploadFile {
  fileKey: string;
  url: string;
}

export interface IFileUploadProps {
  /**
   * The accepted file types for upload
   * @see https://github.com/okonet/attr-accept for more types
   * @example image/* - accepts all images
   */
  acceptedFileTypes: string;
  /** The files that have been successfully uploaded */
  onFilesUploaded: (files: IFileUploadFile[]) => void;
  /** max amount of files this file uploader should be allowed to take */
  maxFiles?: number;
  /**
   * The maximum file size in **bytes**.
   * An alert will popup if a user attempts to upload something too large
   *
   * The default is 10Mb (1e+7 bytes)
   */
  maxFileSize?: number;
  /**
   * The namespace to pass to the file upload context!
   * @example "patient-profile-images" - will upload to the bucket with something like "patient-profile-images/123013r-sg-sfg-324234-sdsg".
   */
  uploadNameSpace: string;
  /**
   * Whether or not the file uploader is explicity disabled.
   * This component will disable the input if the uploaded files is greater than the maxFiles.
   * This includes the `existingFiles` prop
   */
  disabled?: boolean;
  /**
   * What to display when this component is disabled, see default below.
   */
  disabledMessage?: string;
  /**
   * Tells the context to use a guid as the file name.
   * This still uses the file extension found when a user uploads the file.
   */
  useGuidForFileName?: boolean;
}

/**
 * This component acts as a dropzone and enables users to upload files.
 * The intent for this component is to act a base component in which others extend/utilise from.
 * This component does not hold any state, it just consumes a context, uploads, does some validation,
 * and renders the children passed into it.
 *
 * You should use a wrapping component like `ImgUploader` to maintain state and preview the state
 * inside the dropzone/
 *
 * @note this component must be wrapped in a `CameraUploadContext`
 */
export const FileUploader: React.FC<IFileUploadProps> = ({
  acceptedFileTypes,
  onFilesUploaded,
  uploadNameSpace,
  disabled,
  disabledMessage,
  maxFiles = Infinity,
  maxFileSize = 1e7,
  children,
  useGuidForFileName,
}) => {
  const context = useContext(CameraUploadContext);
  const onDrop = async (acceptedFiles: File[]) => {
    /**
     * If you have a limit of 3 files, and 2 files already exist, only 1 file can be uploaded.
     */
    const numberOfFilesLeft = maxFiles;
    /**
     * Only get the files that we know we should be uploading
     *
     * Also account for a negative numberOfFilesLeft (which shouldn't occur, unless too many existing files have been submitted)
     */
    const validatedFiles =
      numberOfFilesLeft >= 0 ? acceptedFiles.slice(0, numberOfFilesLeft) : [];

    const uploadedFiles = await Promise.all(
      validatedFiles.map(async (file) => {
        const type = _.last(file.name.split("."));
        const details = await context.getUploadDetails(
          uploadNameSpace,
          useGuidForFileName ? `${createGuid()}.${type}` : file.name,
        );
        // upload
        await axios({
          method: details.method,
          url: details.url,
          headers: details.headers,
          data: file,
        });
        const url = await context.getSignedImageUrl(details.fileKey);
        return {
          url,
          fileKey: details.fileKey,
        };
      }),
    );
    onFilesUploaded(uploadedFiles);
    /**
     * If the file upload limit was reached, lets do something with the files over length to alert the user.
     */
    if (validatedFiles.length !== acceptedFiles.length) {
      const filesOverLimit = acceptedFiles.slice(numberOfFilesLeft);
      alert(
        `The following files were not uploaded as the max file limit of ${maxFiles} was hit.\n${filesOverLimit.map(
          (x) => "\n" + x.name,
        )}`,
      );
    }
  };

  const isDisabled = disabled;

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled: isDisabled,
    accept: acceptedFileTypes,
    maxSize: maxFileSize,
    onDropRejected(files: File[]) {
      const fileNames = files.map((f) => f.name);
      // warn the user that they need to reduce the file size
      alert(
        `The files below are over the ${
          maxFileSize / 1000000
        } Mb file size limit:\n${fileNames.join(
          ", ",
        )}\n\nPlease reduce their size and try re-uploading.`,
      );
    },
  });

  const { ...rootProps } = getRootProps();
  const { ...inputProps }: DropzoneInputProps = getInputProps();

  return (
    <div
      data-test="file-uploader"
      className={css("", { disabled: isDisabled })}
      {...rootProps}
    >
      <div className={css("internal")}>
        {children ? (
          children
        ) : (
          <div className={css("internal_noContent")}>
            {isDisabled ? (
              <div>{disabledMessage || "Uploading is disabled"}</div>
            ) : (
              <div>
                Drag files or <a>click here</a> to upload
              </div>
            )}
          </div>
        )}
        <input {...inputProps} />
      </div>
    </div>
  );
};
