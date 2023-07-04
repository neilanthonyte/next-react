import { injectable } from "inversify";
import { IFilesModule } from "../modules/FilesModule";
import { IUploadDetails } from "../modules/IUploadDetails";

@injectable()
export class MockFilesModule implements IFilesModule {
  requestSignedUploadUrl(
    uploadDirectory: string,
    fileName: string,
    contentType: string,
  ): Promise<IUploadDetails> {
    throw new Error("Method not implemented.");
  }
  requestSignedFileUrl(fileKey: string): Promise<string> {
    return Promise.resolve(fileKey);
  }
}
