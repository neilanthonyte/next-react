// import { Selector } from "testcafe";
// import { RichContentEditorInputCrl } from "./test.ctrl";

// fixture("RichContentEditorInput").page(
//   "http://localhost:6060/#!/RichContentEditorInput"
// );

// import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

// test("The correct html is output based on the input", async t => {
//   const example = Selector(
//     toTestSelector("RichContentEditorInput-scenario-basic")
//   );
//   const richContentInput = new RichContentEditorInputCrl(example, t);

//   // enter random returns the html from the redactor controller
//   await richContentInput.enterValue("Hello world, foo bar baz! ");
//   await richContentInput.editor.selectBold();
//   await richContentInput.enterValue("I'm bold!");
//   const value = await richContentInput.getValue();
//   await richContentInput.checkValue(value, example);
// });

// test("The correct html is output based on random input", async t => {
//   const example = Selector(
//     toTestSelector("RichContentEditorInput-scenario-basic")
//   );
//   const richContentInput = new RichContentEditorInputCrl(example, t);

//   // enter random returns the html from the redactor controller
//   const htmlOutput = await richContentInput.enterRandom();
//   await richContentInput.checkValue(htmlOutput, example);
//   await richContentInput.editor.clearEditorContents();
//   await richContentInput.checkValue("", example);
// });
