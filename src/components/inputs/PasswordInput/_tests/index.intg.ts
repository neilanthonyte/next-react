// import { Selector } from "testcafe";
// import { PasswordInputCtrl } from "./index.ctrl";

// fixture("PasswordInput").page("http://localhost:6060/#!/PasswordInput");

// import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

// test("returns text that is entered into the input field", async t => {
//   const example = Selector(toTestSelector("standard-usage"));
//   const passwordInput = new PasswordInputCtrl(
//     example.find(toTestSelector("text-input")),
//     t
//   );

//   const password = await passwordInput.enterRandom();
//   await passwordInput.checkValue(password, example);

//   await passwordInput.click();
//   await passwordInput.pressKey("ctrl+a");
//   await passwordInput.pressKey("backspace");
//   const password1 = await passwordInput.enterRandom();
//   await passwordInput.checkValue(password1, example);
// });
