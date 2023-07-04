import * as React from "react";
import { useState } from "react";

import { InputDecoration } from "../../generic/InputDecoration";
import { MedicareNumberInput } from "./";

export const DemoStandard = () => {
  const [value, setValue] = useState<string>();
  return (
    <div data-test="standard-usage">
      <div data-test="medicare-input">
        <InputDecoration
          label="Medicare Card"
          description="Incididunt sit mollit occaecat in Lorem esse reprehenderit esse. Culpa veniam excepteur excepteur cupidatat elit ad adipisicing nisi ut aliquip mollit eu consectetur minim."
          descriptionImageUrl="https://d1qr34qzhiwpdo.cloudfront.net/medicare-guide.jpg"
        >
          <MedicareNumberInput onInputChange={setValue} value={value} />
        </InputDecoration>
      </div>
      <p>
        Selected: &quot;<span data-test="output">{value}</span>&quot;
        <br />
        <a onClick={() => setValue("")}>Clear</a>
      </p>
    </div>
  );
};

// ### No keypad

// ```jsx
// import { MedicareNumberInput } from "./";
// initialState = { output: null };
// <div>
//   <MedicareNumberInput
//     hideKeypad={true}
//     onInputChange={value => {
//       setState({ output: value });
//     }}
//     value={state.output}
//   />
// </div>;
// ```

// ### Value passed to input

// ```jsx
// import { MedicareNumberInput } from "./";
// initialState = { value: "12345678901" };
// <div data-test="default-value">
//   <div data-test="medicare-input">
//     <MedicareNumberInput
//       onInputChange={value => {
//         setState({ value });
//       }}
//       value={value}
//     />
//   </div>
//   <p>
//     Selected: "<span data-test="output">{value}</span>"<br />
//     <a onClick={() => setState({ value: "" })}>Clear</a>
//   </p>
// </div>;
// ```

// ### Value passed to input on button click

// ```jsx
// import { MedicareNumberInput } from "./";
// initialState = { value: "" };
// <div data-test="value-click-button">
//   <div data-test="medicare-input">
//     <MedicareNumberInput
//       onInputChange={value => {
//         setState({ value });
//       }}
//       value={value}
//     />
//   </div>
//   <p>
//     Selected: "<span data-test="output">{value}</span>"<br />
//     <a onClick={() => setState({ output: "" })}>Clear</a> <a
//       data-test="click-button"
//       onClick={() => setState({ value: "12345678901" })}
//     >
//       Set value
//     </a>
//   </p>
// </div>;
// ```

// ### Disabled

// ```jsx
// import { MedicareNumberInput } from "./";
// initialState = { output: null };
// <div>
//   <MedicareNumberInput
//     onInputChange={value => {
//       setState({ output: value });
//     }}
//     value={state.output}
//     disabled={true}
//   />
//   <p>State: {JSON.stringify(state.output)} </p>
//   <p>
//     <a onClick={() => setState({ output: "" })}>Clear</a>
//   </p>
// </div>;
// ```
