module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  rules: {
    "react/prop-types": 0,
    "@typescript-eslint/indent": 0, // let prettier take care of this
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "interface",
        format: ["PascalCase"],
        custom: {
          regex: "^I[A-Z]",
          match: true,
        },
      },
    ],
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/no-inferrable-types": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/ban-types": 0,
    // TODO see if we can extend root eslint, doesnt seem to work
    "react/display-name": 1, // warn only
    "react/jsx-key": 1,
    "react/no-deprecated": 1,
    "react/jsx-no-target-blank": 1,
    "react/no-unescaped-entities": 1,
    "@typescript-eslint/no-this-alias": 1,
    "@typescript-eslint/no-empty-function": 1, // warn only; generated test files have these
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
