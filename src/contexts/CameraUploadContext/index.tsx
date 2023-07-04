import * as React from "react";
import { createContext, useMemo } from "react";
import { IUploadDetails } from "../../client/modules/IUploadDetails";

export interface ICameraUploadContextValue {
  getUploadDetails?: (
    uploadNameSpace: string,
    file: string | Blob,
  ) => Promise<IUploadDetails>;
  getSignedImageUrl?: (fileKey: string) => Promise<string>;
}

export const CameraUploadContext: React.Context<ICameraUploadContextValue> =
  createContext({});
