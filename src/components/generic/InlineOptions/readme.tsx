import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { InlineOptions, Option } from ".";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { VStack } from "../../structure/VStack";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "InlineOptions",
      scenario: "standard",
    },
  });

  return (
    <VStack>
      <h3>Normal</h3>
      <InlineOptions>
        <Option selected>Hello</Option>
        <Option>World</Option>
        <Option>Foo</Option>
      </InlineOptions>
      <h3>Small</h3>
      <InlineOptions size={EStandardSizes.Small}>
        <Option selected>Hello</Option>
        <Option>World</Option>
        <Option>Foo</Option>
      </InlineOptions>
      <h3>Extra Small</h3>
      <InlineOptions size={EStandardSizes.ExtraSmall}>
        <Option selected>Hello</Option>
        <Option>World</Option>
        <Option>Foo</Option>
      </InlineOptions>
      <h3>Large</h3>
      <InlineOptions size={EStandardSizes.Large}>
        <Option selected>Hello</Option>
        <Option>World</Option>
        <Option>Foo</Option>
      </InlineOptions>
    </VStack>
  );
};

// ```jsx
// import { Option } from "./";
// const options = ["foo", "bar", "wiz"];
// const initialState = { value: options[0] };

// <InlineOptions>
//   {options.map(o => (
//     <Option
//       selected={state.value === o}
//       onClick={value => setState({ value: o })}
//       key={o}
//     >
//       {o}
//     </Option>
//   ))}
// </InlineOptions>;
// ```

// ### Single input

// Prebuilt inputs:

// ```jsx harmony
// import { SingleInlineOptions } from "./";
// const options = ["foo", "bar", "wiz"];
// const initialState = { selected: options[0] };

// <div data-test="example-single-input">
//     <SingleInlineOptions
//       options={options}
//       selected={state.selected}
//       onSelection={selected => setState({ selected })}
//     />
// </div>

// ;
// ```

// ### Multi select input

// ```jsx harmony
// import { MultiInlineOptions } from "./";
// const options = ["foo", "bar", "wiz"];
// const initialState = { selected: options.slice(0, 1) };

// <div data-test="example-multi-input">
//     <MultiInlineOptions
//       options={options}
//       selected={state.selected}
//       onSelection={selected => setState({ selected })}
//     />
// </div>;
// ```

// ### View toggle

// Prebuilt inputs:

// ```jsx
// import { ViewToggle } from "./";
// const options = ["foo", "bar", "wiz"];
// const initialState = { selected: options[0] };

// <ViewToggle
//   options={options}
//   selected={state.selected}
//   onSelection={selected => setState({ selected })}
// />;
// ```
