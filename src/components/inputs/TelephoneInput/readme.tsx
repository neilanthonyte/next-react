import * as React from "react";
import { useEffect, useState } from "react";

import { TelephoneInput } from ".";
import { useDebug } from "../../../debug/DemoWrapper";

export const DemoStandard = () => {
  const [value, setValue] = useState<string>();
  return (
    <div data-test="standard-usage">
      <TelephoneInput
        onInputChange={(v) => setValue(v)}
        value={value}
        hideKeypad={true}
      />
      <p>
        Selected: <span data-test="output">{value}</span>
        <br />
        <a onClick={() => setValue("")}>Clear</a>
      </p>
    </div>
  );
};

export const DemoInitValue = () => {
  const { setActions, setOutput } = useDebug();
  const [value, setValue] = useState<string>("+61400000000");

  useEffect(() => {
    setOutput(value);
  }, [value]);

  useEffect(() => {
    setActions([
      {
        action: () => setValue(""),
        label: "Clear",
      },
      {
        action: () => setValue("+61400000000"),
        label: "+61400000000",
      },
      {
        action: () => setValue("+61400 000 000"),
        label: "+61400 000 000",
      },
      {
        action: () => setValue("0400000000"),
        label: "0400000000",
      },
      {
        action: () => setValue("6200 0000"),
        label: "6200 0000",
      },
      {
        action: () => setValue("0262000000"),
        label: "0262000000",
      },
    ]);
  }, []);

  return (
    <TelephoneInput onInputChange={setValue} value={value} hideKeypad={true} />
  );
};
