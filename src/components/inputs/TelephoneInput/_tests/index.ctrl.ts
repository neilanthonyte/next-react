// import { Selector } from "testcafe";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { KeypadCtrl } from "../../../generic/Keypad/_tests/index.ctrl";
import { IInputCtrl } from "../../BaseInput/_tests/IInputCtrl";
import { generateCode } from "../../../../helpers/generateCode";

export class TelephoneInputCtrl implements IInputCtrl<string> {
  public input: Selector;
  public keypad: KeypadCtrl;

  constructor(selector: Selector, private t: TestController) {
    this.input = selector.find(toTestSelector("input"));
    this.keypad = new KeypadCtrl(selector, t);
  }

  public async setValue(value: string) {
    await this.t.selectText(this.input).pressKey("delete");
    await this.t.typeText(this.input, value);
  }

  public async getValue() {
    return this.input.value;
  }

  public async appendValue(value: string) {
    await this.t.typeText(this.input, value);
  }

  public async expectValue(value: string) {
    await this.t.expect(await this.input.value).eql(value);
  }

  public async appendRandom() {
    const randomNumber = `04${generateCode(8, "012356789")}`;
    await this.appendValue(randomNumber);

    return this.getValue();
  }

  public async expectDesabled() {
    this.t.expect(this.input.hasAttribute("disabled"));
  }
}
//   public input: Selector;
//   public keypad: KeypadCtrl;
//   constructor(selector: Selector, private t: TestController) {
//     this.input = selector.find(toTestSelector("input"));
//     this.keypad = new KeypadCtrl(selector, t);
//     this.t = t;
//   }
//   public async enterValue(value: string) {
//     await this.typeText(value);
//   }
//   public async enterRandom() {
//     const hint = await this.input.getAttribute("data-hint");
//     const randomFormat = Math.round(Math.random() * 3);
//     let randomNumber;

//     if (!hint && randomFormat === 1) {
//       randomNumber = await this.randomMobileNumber();
//     } else if (!hint && randomFormat === 2) {
//       randomNumber = await this.randomLandline();
//     } else if (!hint && randomFormat === 3) {
//       randomNumber = await this.randomLandlineWithPrefix();
//     } else {
//       await this.enterValue(hint);
//       randomNumber = hint;
//     }

//     return randomNumber;
//   }

//   async randomMobileNumber() {
//     const randomNumber = "04" + Math.floor(Math.random() * 100000000);
//     await this.enterValue(randomNumber);
//     return randomNumber;
//   }

//   async randomLandline() {
//     const randomNumber = "02" + Math.floor(Math.random() * 100000000);

//     await this.enterValue(randomNumber);
//     return randomNumber;
//   }

//   async randomLandlineWithPrefix() {
//     const randomNumber = "+614" + Math.floor(Math.random() * 100000000);

//     await this.enterValue(randomNumber);
//     return randomNumber;
//   }

//   async typeText(value: string) {
//     await this.t.typeText(this.input, value);
//   }

//   async pressKey(keysCommand: string) {
//     await this.t.pressKey(keysCommand);
//   }

//   async click() {
//     await this.t.click(this.input);
//   }

//   async checkValue(value: string, selector: Selector) {
//     const enteredValue = await selector.find(toTestSelector("output"))
//       .innerText;
//     const strippedEnteredValue = enteredValue.replace(/\s+/g, "");
//     const strippedExpectedValue = value.replace(/\s+/g, "");
//     await this.t.expect(strippedEnteredValue).eql(strippedExpectedValue);
//   }

//   async checkAttribute(value: string, attributeName: string) {
//     await this.t.expect(this.input.getAttribute(attributeName)).eql(value);
//   }

//   async checkHasAttribute(value: boolean, attributeName: string) {
//     await this.t.expect(this.input.hasAttribute(attributeName)).eql(value);
//   }

//   async getValue() {
//     return await this.input.value;
//   }
// }
