import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { TextNumberInput } from ".";
import { useEffect, useState } from "react";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "TextNumberInput",
      scenario: "standard",
    },
  });
  const [value, setValue] = useState<string>();
  useEffect(() => {
    setOutput(value);
  }, [value]);

  return <TextNumberInput onInputChange={setValue} value={value} />;
};
