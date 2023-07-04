import { inject, injectable } from "inversify";
import { IHttpConnection } from "../connections/HttpConnection";
import { IUploadDetails } from "./IUploadDetails";

export interface IFilesModule {
  requestSignedUploadUrl(
    uploadDirectory: string,
    fileName: string,
    contentType: string,
  ): Promise<IUploadDetails>;
  requestSignedFileUrl(fileKey: string): Promise<string>;
}

@injectable()
export class FilesModule implements IFilesModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async requestSignedUploadUrl(
    uploadDirectory: string,
    fileName: string,
    contentType: string,
  ): Promise<IUploadDetails> {
    return await this._httpConnection.makeRequest({
      url: "files/getSignedUploadUrl",
      method: "get",
      params: {
        uploadDirectory,
        fileName,
        contentType,
      },
    });
  }

  public async requestSignedFileUrl(fileKey: string): Promise<string> {
    return await this._httpConnection.makeRequest({
      url: "files/getSignedFileUrl",
      method: "get",
      params: {
        fileKey,
      },
    });
  }
}
