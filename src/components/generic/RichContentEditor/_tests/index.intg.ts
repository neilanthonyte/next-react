import { Selector } from "testcafe";
import * as faker from "faker";

import { RichContentEditorCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("RichContentEditor").page("http://localhost:6060/#/RichContentEditor");

test("Raw value inside rich content editor is equal to its input", async (t) => {
  const example = Selector(toTestSelector("RichContentEditor-scenario-basic"));
  const editor = new RichContentEditorCtrl(example, t);
  const rawValue = "Esse do dolor deserunt culpa";
  await editor.addContent(rawValue);
  await t.wait(500);
  const value = await editor.getRawContent();

  await t.expect(value).eql(rawValue);
});

test("Outputs the expected HTML content", async (t) => {
  const example = Selector(toTestSelector("RichContentEditor-scenario-basic"));
  const editor = new RichContentEditorCtrl(example, t);
  await editor.addContent("hello world");
  await editor.addContent(" ");
  await editor.selectBold();
  await editor.addContent("lorem ipsum de ja vu");
  await t.wait(500);
  const htmlValue = await editor.getHtmlContent();

  await t
    .expect(htmlValue)
    .eql("<p>hello world <strong>lorem ipsum de ja vu</strong></p>");
});

test("Correctly handles pre-existing values through props", async (t) => {
  const example = Selector(toTestSelector("RichContentEditor-scenario-preset"));
  const editor = new RichContentEditorCtrl(example, t);
  // redactor needs a sec to realize that it has content inside it
  await t.wait(2000);
  const content = await editor.getHtmlContent();
  await t.expect(content).eql("<p> Default value <strong> SUP </strong></p>");
});

test("The test controller supports multiple redactor instances on one page", async (t) => {
  const selectorOne = Selector(
    toTestSelector("RichContentEditor-scenario-multiple-1"),
  );
  const selectorTwo = Selector(
    toTestSelector("RichContentEditor-scenario-multiple-2"),
  );

  const editorOne = new RichContentEditorCtrl(selectorOne, t);
  const editorTwo = new RichContentEditorCtrl(selectorTwo, t);

  const editorOneContent = faker.random.words(15);
  const editorTwoContent = faker.random.words(20);

  await editorOne.addContent(editorOneContent);
  await editorTwo.addContent(editorTwoContent);

  const editorOneValue = await editorOne.getRawContent();
  const editorTwoValue = await editorTwo.getRawContent();

  await t.expect(editorOneValue).eql(editorOneContent);
  await t.expect(editorTwoValue).eql(editorTwoContent);
});
