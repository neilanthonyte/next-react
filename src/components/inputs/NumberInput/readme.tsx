import * as React from "react";
import { useEffect, useState } from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { NumberInput } from ".";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "NumberInput",
      scenario: "standard",
    },
  });

  const [value, setValue] = useState<string>();
  useEffect(() => {
    setOutput(value);
  }, [value]);

  return <NumberInput onInputChange={setValue} value={value} />;
};
