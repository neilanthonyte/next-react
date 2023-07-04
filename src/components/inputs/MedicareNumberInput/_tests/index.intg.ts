// import { Selector } from "testcafe";
// import { MedicareNumberInputCtrl } from "./index.ctrl";

// fixture("MedicareNumberInput").page("http://localhost:6060/#!/MedicareNumberInput");

// import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

// test("returns numbers that are entered into the field", async t => {
//   const example = Selector(toTestSelector("standard-usage"));
//   const medicareNumber = new MedicareNumberInputCtrl(
//     example.find(toTestSelector("medicare-input")),
//     t
//   );

//   await medicareNumber.enterRandom();
//   await medicareNumber.checkValue("2222 22220 01", example);

//   await medicareNumber.clickMedicare();
//   await medicareNumber.pressKey("ctrl+a");
//   await medicareNumber.pressKey("backspace");
//   await medicareNumber.pressKey("backspace");
//   await medicareNumber.checkValue("", example);

//   await medicareNumber.enterValue("12345678909");
//   await medicareNumber.checkValue("1234 56789 09", example);

//   await medicareNumber.clickMedicare();
//   await medicareNumber.pressKey("end left");
//   await medicareNumber.pressKey("backspace");
//   await medicareNumber.pressKey("backspace");
//   await medicareNumber.pressKey("backspace");
//   await medicareNumber.pressKey("backspace");
//   await medicareNumber.checkValue("1234 5678", example);

//   await medicareNumber.enterValue("909");
//   await medicareNumber.checkValue("1234 56789 09", example);

//   await medicareNumber.clickIrn();
//   await medicareNumber.pressKey("end");
//   await medicareNumber.pressKey("backspace");
//   await medicareNumber.pressKey("backspace");
//   await medicareNumber.pressKey("backspace");
//   await medicareNumber.pressKey("backspace");
//   await medicareNumber.checkValue("1234 567", example);
// });

// test("DOM keypad can update the value of the field when user click on medicare number input", async t => {
//   const example = Selector(toTestSelector("standard-usage"));
//   const medicareNumberInput = new MedicareNumberInputCtrl(
//     example.find(toTestSelector("medicare-input")),
//     t
//   );

//   await medicareNumberInput.clickMedicare();
//   await medicareNumberInput.keypad.clickKey("1");
//   await medicareNumberInput.keypad.clickKey("9");
//   await medicareNumberInput.keypad.clickKey("3");
//   await medicareNumberInput.keypad.clickKey("5");
//   await medicareNumberInput.keypad.clickKey("7");
//   await medicareNumberInput.checkValue("1935 7", example);
// });

// test("DOM keypad can update the value of the field when user clicks irn input field", async t => {
//   const example = Selector(toTestSelector("standard-usage"));
//   const medicareNumberInput = new MedicareNumberInputCtrl(
//     example.find(toTestSelector("medicare-input")),
//     t
//   );
//   const output = example.find(toTestSelector("output"));

//   await medicareNumberInput.clickIrn();
//   await medicareNumberInput.keypad.clickKey("1");
//   await medicareNumberInput.keypad.clickKey("9");
//   await medicareNumberInput.keypad.clickKey("3");
//   await medicareNumberInput.keypad.clickKey("5");
//   await medicareNumberInput.keypad.clickKey("7");
//   await t.expect(output.innerText).eql("1935 7");
// });

// test("Contains a default value", async t => {
//   const example = Selector(toTestSelector("default-value"));
//   const output = example.find(toTestSelector("output"));

//   await t.expect(output.innerText).eql("12345678901");
// });

// test("Medicare number placeholder is present", async t => {
//   const example = Selector(toTestSelector("default-value"));
//   const medicareNumberInput = new MedicareNumberInputCtrl(
//     example.find(toTestSelector("medicare-input")),
//     t
//   );

//   await t
//     .expect(medicareNumberInput.medicareInput.getAttribute("placeholder"))
//     .eql("Medicare number");
// });

// test("Irn placeholder is present", async t => {
//   const example = Selector(toTestSelector("default-value"));
//   const medicareNumberInput = new MedicareNumberInputCtrl(
//     example.find(toTestSelector("medicare-input")),
//     t
//   );

//   await t
//     .expect(medicareNumberInput.irnInput.getAttribute("placeholder"))
//     .eql("IRN");
// });

// test("Value passed to input on button click", async t => {
//   const example = Selector(toTestSelector("value-click-button"));
//   const clickButton = new MedicareNumberInputCtrl(
//     Selector(toTestSelector("value-click-button")),
//     t
//   );
//   const output = example.find(toTestSelector("output"));

//   await clickButton.clickButton();
//   await t.expect(output.innerText).eql("12345678901");
// });
