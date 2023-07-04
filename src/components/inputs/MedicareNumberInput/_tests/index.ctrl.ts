// import { Selector } from "testcafe";

// import { IInputCtrl } from "../../BaseInput/_tests/IInputCtrl";
// import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
// import { KeypadCtrl } from "../../../atoms/Keypad/_tests/index.ctrl";

// export class MedicareNumberInputCtrl implements IInputCtrl<string> {
//   public medicareInput: Selector;
//   public irnInput: Selector;
//   private button: Selector;
//   public keypad: KeypadCtrl;
//   constructor(selector: Selector, private t: TestController) {
//     this.medicareInput = selector.find(toTestSelector("medicare-number"));
//     this.irnInput = selector.find(toTestSelector("irn-number"));
//     this.button = selector.find(toTestSelector("click-button"));
//     this.keypad = new KeypadCtrl(
//       selector.find(toTestSelector("medicare-keypad")),
//       t
//     );
//     this.t = t;
//   }
//   async enterValue(value: string) {
//     await this.t.typeText(this.medicareInput, value);
//   }
//   async enterRandom() {
//     // TODO: Write medicare number randomiser
//     // Gives static number for the time being so tests work
//     await this.t.typeText(this.medicareInput, "22222222001");
//     return "2222 22220 01";
//   }
//   async clickMedicare() {
//     await this.t.click(this.medicareInput);
//   }
//   async clickIrn() {
//     await this.t.click(this.irnInput);
//   }
//   async clickButton() {
//     await this.t.click(this.button);
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
//     const medicareNumber = await this.medicareInput.value;
//     const irnNumber = await this.irnInput.value;

//     return medicareNumber + irnNumber;
//   }
// }
