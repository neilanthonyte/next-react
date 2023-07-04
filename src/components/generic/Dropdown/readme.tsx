import * as React from "react";

import { Dropdown, IDropdownProps } from ".";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

export const DemoSimple: React.FC = () => {
  const options = [
    "foo",
    "bar",
    "really long option to show how dropdown handles large options",
  ];
  const [selectedValue, setSelectedValue] = React.useState(options[0]);

  return (
    <div
      style={{
        width: "400px",
        height: "400px",
        border: "1px solid black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      data-test="Dropdown-scenario-standard"
    >
      <div>
        Selected value is: <span data-test="output">{selectedValue}</span>
      </div>
      <Dropdown
        staticLabel="Label that is really really long"
        options={options}
        selectedOption={selectedValue}
        onOptionChange={(option) => setSelectedValue(option)}
      />
    </div>
  );
};

export const DemoWidth: React.FC = () => {
  const options = [
    "foo",
    "bar",
    "really long option to show how dropdown handles large options",
  ];
  const [selectedValue, setSelectedValue] = React.useState(options[0]);

  return (
    <div
      style={{
        width: "900px",
        height: "400px",
        border: "1px solid black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      data-test="Dropdown-scenario-standard"
    >
      <div>
        <p>No width props</p>
        <Dropdown
          options={options}
          selectedOption={selectedValue}
          onOptionChange={(option) => setSelectedValue(option)}
        />
      </div>
      <div>
        <p>autoWidth</p>
        <Dropdown
          autoWidth
          options={options}
          selectedOption={selectedValue}
          onOptionChange={(option) => setSelectedValue(option)}
        />
      </div>
      <div>
        <p>widthInChars</p>
        <Dropdown
          widthInChars={20}
          options={options}
          selectedOption={selectedValue}
          onOptionChange={(option) => setSelectedValue(option)}
        />
      </div>
    </div>
  );
};

export const DemoMultiple: React.FC = () => {
  const dropdownValues: Omit<
    IDropdownProps,
    "selectedOption" | "onOptionChange"
  >[] = [
    {
      staticLabel: "foo",
      options: ["fooFoo", "fooBar", "fooBaz"],
    },
    {
      staticLabel: "bar",
      options: ["barFoo", "barBar", "barBaz"],
    },
    {
      staticLabel: "baz",
      options: ["bazFoo", "bazBar", "bazBaz"],
    },
  ];

  const [selectedValues, setSelectedValues] = React.useState(
    dropdownValues.map((d) => d.options[0]),
  );

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        border: "1px solid black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      data-test="Dropdown-scenario-multiple"
    >
      <div
        style={{
          display: "flex",
          width: "50%",
          justifyContent: "space-evenly",
        }}
      >
        {dropdownValues.map((props, index) => (
          <Dropdown
            key={props.staticLabel}
            options={props.options}
            selectedOption={selectedValues[index]}
            onOptionChange={(option) =>
              setSelectedValues((old) =>
                old.map((x, i) => (i === index ? option : x)),
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

export const DemoStandardSizing: React.FC = () => {
  const Inner = ({ size, n }: { size: EStandardSizes; n: number }) => (
    <Dropdown
      autoWidth
      options={options}
      selectedOption={selectedValues[n]}
      onOptionChange={(option) =>
        setSelectedValues((o) => o.map((x, i) => (i === n ? option : x)))
      }
      stdSize={size}
    />
  );

  const options = ["foo", "bar"];
  const [selectedValues, setSelectedValues] = React.useState([
    options[0],
    options[0],
    options[0],
    options[0],
  ]);

  return (
    <div
      style={{
        width: "900px",
        height: "400px",
        border: "1px solid black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      data-test="Dropdown-scenario-standard"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
          margin: "1em",
          alignItems: "center",
        }}
      >
        {Object.values(EStandardSizes).map((size, i) => (
          <div key={size}>
            <span>{`Size: ${size}`}</span>
            <Inner size={size} n={i} />
          </div>
        ))}
      </div>
    </div>
  );
};
