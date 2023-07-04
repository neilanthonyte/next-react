import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { MultiOptionsInput } from ".";
import { useEffect, useState } from "react";

export const DemoStandard = () => {
  const { setOutput, setActions } = useDebug({
    test: {
      componentName: "MultiOptionsInput",
      scenario: "standard",
    },
  });

  const [value, setValue] = useState<string[]>([]);
  useEffect(() => {
    setOutput(value);
  }, [value]);
  useEffect(() => {
    setActions([
      {
        label: "Set foo",
        action: () => setValue(["foo"]),
      },
    ]);
  }, []);

  return (
    <MultiOptionsInput
      options={["foo", "bar", "baz", "qux"]}
      onInputChange={setValue}
      value={value}
    />
  );
};

// ### Select multiple options with default values

// ```jsx
// import { MultiOptionsInput } from "./";
// initialState = { value: ["bar", "baz"] };
// <div>
//   <MultiOptionsInput
//     options={["foo", "bar", "baz", "qux"]}
//     onInputChange={value => setState({ value })}
//     allowMultiple={true}
//     value={state.value}
//   />
//   <p>State: {JSON.stringify(state.output)} </p>
//   <p>
//     <a onClick={() => setState({ value: [] })}>Clear</a>
//     {" | "}
//     <a onClick={() => setState({ value: ["bar"] })}>Set to bar</a>
//   </p>
// </div>;
// ```

// ### Multiple options disabled with default values

// ```jsx
// import { MultiOptionsInput } from "./";
// initialState = { value: ["bar", "baz"] };
// <div>
//   <MultiOptionsInput
//     options={["foo", "bar", "baz", "qux"]}
//     onInputChange={value => setState({ value })}
//     allowMultiple={true}
//     value={state.value}
//     disabled={true}
//   />
//   <p>State: {JSON.stringify(state.output)} </p>
// </div>;
// ```

// ### Unknown value

// ```jsx
// import { MultiOptionsInput } from "./";
// initialState = { value: "unknown value" };
// <div>
//   <MultiOptionsInput
//     options={["foo", "bar", "baz", "qux"]}
//     onInputChange={value => setState({ value })}
//     value={state.value}
//   />
//   <p>State: {JSON.stringify(state.value)} </p>
//   <p>
//     <a onClick={() => setState({ value: null })}>Clear</a> |
//     <a onClick={() => setState({ value: "unknown value" })}>
//       Set to invalid value
//     </a>
//   </p>
// </div>;
// ```
