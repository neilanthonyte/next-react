import { Selector } from "testcafe";
import { FormCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("Form").page("http://localhost:6060/#/Form");

test("Fill and clear all input types", async (t) => {
  // HACK version with minimum set of inputs
  const example = Selector(toTestSelector("Form-scenario-testDebug"));
  // const example = Selector(toTestSelector("Form-scenario-inputTypes"));

  const form = example.find(toTestSelector("form"));
  const output = example.find(toTestSelector("output"));

  const formCtrl = new FormCtrl(form, t);

  // explicit filling
  // TODO support all types
  const values: { [key: string]: any } = {
    text: "Test single",
    textMultiLine: "Text multi-line",
    // boolean: true,
    // "options-inline-single": "one",
    // "options-inline-multi": ["one", "two"],
    // "options-dropdown-single": "one",
    // "options-dropdown-multi": ["one", "two"],
    // "options-auto-dropdown": "options-auto-dropdown",
    // "options-auto-inline": "options-auto-inline",
    // "likert-happiness": "likert-happiness",
    // "date-full": "date-full",
    // "date-yearMonth": "date-yearMonth",
    // "date-monthDay": "date-monthDay",
    // email: "email",
    // number: "number",
    // password: "password",
    // medicareNumber: "medicareNumber",
    // acceptLegals: "acceptLegals",
    // hidden: "hidden",
    // postcode: "postcode",
    // phone: "phone",
    // dvaNumber: "dvaNumber",
    // concessionCardNumber: "concessionCardNumber",
    // individualHealthcareIdentifier: "individualHealthcareIdentifier"
    // camera: "camera"
    // TODO: credit card
    // TODO: password confirm
  };

  await formCtrl.fill(values);
  await formCtrl.clickSubmit();
  Object.keys(values).map(async (key: string) => {
    await t.expect(output.innerText).contains(values[key]);
  });
  await formCtrl.expectValidationErrorCount(0);

  // can clear the form
  await formCtrl.clearForm();
  await formCtrl.clickSubmit();
  await t.expect(output.innerText).eql("{}");

  // random fill of all input types
  const fill = await formCtrl.fill(
    {},
    {
      randomFillChance: 1,
    },
  );
  Object.keys(values).map(async (key: string) => {
    await t.expect(output.innerText).contains(fill[key]);
  });
});

// test("Support one-time or resubmittable forms", async t => {
//   // form can only be submitted once
//   // TODO
//   // forms can submitted multiple times
//   // TODO
// });

// test("Support transformers", async t => {
//   // array to field
//   // TODO
//   // multi to single
//   // TODO
// });

// test("Support multiple values", async t => {
//   // simple inputs - no multi-instance support
//   // TODO
//   // multi-value inputs - directly support multiple values, e.g. options
//   // TODO
//   // groups, incl. pre-fill
//   // TODO
// });

// test("Support conditional fields", async t => {
//   // value is present
//   // TODO
//   // value is something specific
//   // TODO
//   // works with differnet input types: text, options, boolean
//   // target field is disabled
//   // TODO
//   // target field is hidden
//   // TODO
//   // works with multi-value groups
//   // TODO
// });

// test("Support date pre-processing", async t => {
//   // support for NOW()
//   // TODO
// });

// test("Support field validation", async t => {
//   // supports common validations, incl. async validations
//   // TODO
// });

// test("Disabled invalid data", async t => {
//   // data that fails validation check is disabled and passed through
//   // TODO
// });

// test("External errors on submit", async t => {
//   // can pass an error back to the form and have it handle the error
//   // TODO
// });
