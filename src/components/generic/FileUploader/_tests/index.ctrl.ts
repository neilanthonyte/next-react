import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class FileUploaderCtrl {
  private fileUploader: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.fileUploader = this.selector.find(toTestSelector("file-uploader"));
  }

  public async uploadFiles(numberOfFiles: number) {
    console.assert(
      numberOfFiles <= 7,
      "Cannot use more than 7 files in the test!",
    );

    const files = [];

    for (let i = 1; i <= numberOfFiles; i += 1) {
      files.push(`./bill_murray_${i}.jpg`);
    }

    await this.t.setFilesToUpload(this.fileUploader.find("input"), files);
  }
}
