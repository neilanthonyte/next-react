// import { Selector } from "testcafe";
// import * as faker from "faker";

// import { IInputCtrl } from "../../BaseInput/_tests/IInputCtrl";
// import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

// export class PasswordInputCtrl implements IInputCtrl<string> {
//   private input: Selector;
//   constructor(selector: Selector, private t: TestController) {
//     this.input = selector.find(toTestSelector("input"));
//     this.t = t;
//   }

//   async enterValue(value: string) {
//     await this.t.typeText(this.input, value);
//   }

//   async enterRandom() {
//     const randomString = faker.random.word();

//     await this.enterValue(randomString);
//     return randomString;
//   }

//   async click() {
//     await this.t.click(this.input);
//   }

//   async pressKey(keysCommand: string) {
//     await this.t.pressKey(keysCommand);
//   }

//   async checkValue(value: string, selector: Selector) {
//     await this.t
//       .expect(selector.find(toTestSelector("output")).innerText)
//       .eql(value);
//   }

//   async getValue() {
//     return await this.input.value;
//   }
// }
