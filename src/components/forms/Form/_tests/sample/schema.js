module.exports = [
  {
    type: "text",
    map: "text",
    label: "My text input",
    placeholder: "Please enter...",
  },
  {
    type: "password",
    map: "password",
    label: "Password",
    placeholder: "Password goes here",
  },
  {
    type: "date",
    map: "date",
    label: "Date",
  },
  {
    type: "options",
    map: "dynamicOptions.0",
    options: ["foo", "bar"],
    label: "Dynamic Options",
  },
  {
    type: "options",
    map: "dynamicOptions.1",
    options: ["foo", "bar", "baz"],
  },
  {
    type: "options",
    map: "dynamicOptions.2",
    options: ["foo", "bar", "baz"],
    allowMultiple: true,
  },
  {
    type: "options",
    map: "buttonOptions.0",
    label: "Button Options - singleSelect",
    options: ["foo", "bar", "baz"],
    variant: "buttonSelect",
  },
  {
    type: "options",
    map: "buttonOptions.1",
    label: "Button Options - multiSelect",
    options: ["foo", "bar", "baz"],
    variant: "buttonSelect",
    allowMultiple: true,
  },
  {
    type: "options",
    map: "multiSelect",
    label: "MultiSelect Dropdown",
    options: ["foo", "bar", "baz"],
    variant: "multiSelect",
    allowMultiple: true,
  },
  {
    type: "options",
    map: "singleSelect",
    label: "SingleSelect Dropdown",
    options: ["foo", "bar", "baz"],
    variant: "inline",
  },
  {
    type: "boolean",
    map: "bool",
    label: "Boolean Input",
  },
  {
    type: "number",
    map: "number",
    placeholder: "Numbers go here",
    label: "Number Input",
  },
  {
    type: "email",
    map: "email",
    placeholder: "Email@email.com",
    label: "Email Input",
  },
  {
    type: "acceptLegals",
    map: "legals",
    contentUrl:
      "https://nextpracticehealth.com/legals/terms-and-conditions.json",
  },
  {
    type: "creditCard",
    map: "creditCard",
    label: "Credit Card",
  },
  {
    type: "medicare",
    map: "medicare",
    label: "Medicare",
  },
  {
    type: "phone",
    map: "phone",
    label: "Mixed Phone Number Input",
  },
  {
    type: "dvaNumber",
    map: "dvaNumber",
    label: "DVA Number",
  },
  {
    type: "individualHealthcareIdentifier",
    map: "IHN",
    label: "IHN",
  },
  {
    type: "hidden",
    map: "hidden",
    defaultValue: "This is a hidden field",
  },
];
