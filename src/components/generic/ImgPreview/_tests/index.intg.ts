import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ImgPreviewCtrl } from "./index.ctrl";

fixture("ImgPreview").page("http://localhost:6060/#/ImgPreview");

test("Clicking an action has the expected the result", async (t) => {
  const example = Selector(toTestSelector("ImgPreview-scenario-action-click"));
  const imgPreview = new ImgPreviewCtrl(example, t);
  await imgPreview.clickAction(0);
  await imgPreview.clickAction(0);
  await imgPreview.clickAction(1);

  const outputDiv = await example.find(toTestSelector("output"));

  await t.expect(await outputDiv.exists).ok();

  const action0Output = await example.find(toTestSelector("output-0"));

  await t.expect(await action0Output.exists).ok();
  // we clicked the action twice
  await t.expect(await action0Output.count).eql(2);

  const action1Output = await example.find(toTestSelector("output-1"));

  await t.expect(await action1Output.exists).ok();
  // we clicked the action once
  await t.expect(await action1Output.count).eql(1);
});

test("Clicking an decoration has the expected the result", async (t) => {
  const example = Selector(
    toTestSelector("ImgPreview-scenario-decoration-click"),
  );
  const imgPreview = new ImgPreviewCtrl(example, t);
  await imgPreview.clickDecoration(0);
  await imgPreview.clickDecoration(0);
  await imgPreview.clickDecoration(1);

  const outputDiv = await example.find(toTestSelector("output"));

  await t.expect(await outputDiv.exists).ok();

  const decoration0Output = await example.find(toTestSelector("output-0"));

  await t.expect(await decoration0Output.exists).ok();
  // we clicked the decoration twice
  await t.expect(await decoration0Output.count).eql(2);

  const decoration1Output = await example.find(toTestSelector("output-1"));

  await t.expect(await decoration1Output.exists).ok();
  // we clicked the decoration once
  await t.expect(await decoration1Output.count).eql(1);
});

test("Clicking on the image preview calls the onclick", async (t) => {
  const example = Selector(toTestSelector("ImgPreview-scenario-onclick-click"));
  const imgPreview = new ImgPreviewCtrl(example, t);

  const decoration0Output = await example.find(toTestSelector("output-count"));
  // we haven't clicked yet
  await t.expect(await decoration0Output.innerText).eql("0");

  await imgPreview.clickImagePreview();
  await t.expect(await decoration0Output.innerText).eql("1");
  await imgPreview.clickImagePreview();
  await imgPreview.clickImagePreview();
  await t.expect(await decoration0Output.innerText).eql("3");
});
