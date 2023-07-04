// import * as faker from "faker";

// import { IInputCtrl } from "../../BaseInput/_tests/IInputCtrl";
// import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
// import { RichContentEditorCtrl } from "../../../atoms/RichContentEditor/_tests/index.ctrl";

// export class RichContentEditorInputCrl implements IInputCtrl<string> {
//   public editor: RichContentEditorCtrl;

//   constructor(private selector: Selector, private t: TestController) {
//     this.editor = new RichContentEditorCtrl(
//       this.selector.find(toTestSelector("editor")),
//       this.t
//     );
//   }

//   public async enterValue(value: string) {
//     await this.editor.addContent(value);
//   }

//   public async getValue() {
//     await this.t.wait(500);
//     return await this.editor.getHtmlContent();
//   }

//   public async checkValue(value: string, selector: Selector) {
//     await this.t.wait(1000);
//     const output = await selector.find(toTestSelector("output")).innerText;
//     const cleanedOutput = output.replace(/&nbsp;/g, " ");
//     await this.t.expect(cleanedOutput).eql(value);
//   }

//   public async enterRandom() {
//     const rand = faker.random.words(10);
//     await this.editor.addContent(rand);
//     await this.t.wait(500);
//     const html = await this.editor.getHtmlContent();
//     return html;
//   }
// }
