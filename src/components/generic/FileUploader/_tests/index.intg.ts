import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { FileUploaderCtrl } from "./index.ctrl";

fixture("FileUploader").page("http://localhost:6060/#/FileUploader");

test("Uploads a single file", async (t) => {
  const example = Selector(toTestSelector("FileUploader-scenario-basic"));
  const fileUploader = new FileUploaderCtrl(example, t);

  await fileUploader.uploadFiles(1);

  const outputDiv = await example.find(toTestSelector("output"));
  const outputCount = await outputDiv.childNodeCount;
  const uploadedFileOutput = await outputDiv.find(toTestSelector("output-1"));
  const uploadedFileOutputInnerText = await uploadedFileOutput.innerText;
  const json = JSON.parse(uploadedFileOutputInnerText);
  const fileName = _.last(json.fileKey.split("/"));
  await t.expect(fileName).eql(`bill_murray_1.jpg`);
  await t.expect(outputCount).eql(1);
});

test("Uploads multiple files", async (t) => {
  const example = Selector(toTestSelector("FileUploader-scenario-basic"));
  const fileUploader = new FileUploaderCtrl(example, t);

  const numberOfFiles = _.random(2, 5, false);

  await fileUploader.uploadFiles(numberOfFiles);

  const outputDiv = await example.find(toTestSelector("output"));
  const outputCount = await outputDiv.childNodeCount;

  for (let i = 1; i <= numberOfFiles; i += 1) {
    const uploadedFileOutput = await outputDiv.find(
      toTestSelector(`output-${i}`),
    );
    const uploadedFileOutputInnerText = await uploadedFileOutput.innerText;
    const json = JSON.parse(uploadedFileOutputInnerText);
    const fileName = _.last(json.fileKey.split("/"));
    await t.expect(fileName).eql(`bill_murray_${i}.jpg`);
  }

  await t.expect(outputCount).eql(numberOfFiles);
});

test("Shows an alert when the user tries to upload too many files", async (t) => {
  const example = Selector(toTestSelector("FileUploader-scenario-max-files"));
  const fileUploader = new FileUploaderCtrl(example, t);

  // click okay on all dialogs, we use the testcafe api later to check how many times and the content of the alert
  await t.setNativeDialogHandler(() => true);

  await fileUploader.uploadFiles(3);

  await t.wait(2000);

  const dialogHistory = await t.getNativeDialogHistory();

  await t.expect(dialogHistory.length).eql(1);
});

test("The alert message correctly informs the user which files are over the limit", async (t) => {
  const example = Selector(toTestSelector("FileUploader-scenario-max-files"));
  const fileUploader = new FileUploaderCtrl(example, t);

  // click okay on all dialogs, we use the testcafe api later to check how many times and the content of the alert
  await t.setNativeDialogHandler(() => true);

  await fileUploader.uploadFiles(4);

  await t.wait(2000);

  const dialogHistory = await t.getNativeDialogHistory();

  /**
   * Because the limit on the readme is 2, and we've tried to upload 4, we should expect that images 3 and 4 will fail!
   */
  await t.expect(dialogHistory[0].text).contains("bill_murray_3.jpg");
  await t.expect(dialogHistory[0].text).contains("bill_murray_4.jpg");
  await t.expect(dialogHistory.length).eql(1);
});

test("Does not allow manipulation whilst in a disabled state", async (t) => {
  const example = Selector(toTestSelector("FileUploader-scenario-disabled"));
  const fileUploader = new FileUploaderCtrl(example, t);

  await fileUploader.uploadFiles(4);
  await fileUploader.uploadFiles(1);

  const outputDiv = await example.find(toTestSelector("output"));
  const outputCount = await outputDiv.childNodeCount;

  await t.expect(outputCount).eql(0);
});
