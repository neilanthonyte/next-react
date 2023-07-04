import * as React from "react";
import { useEffect, useState } from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { IntegerInput } from ".";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "IntegerInput",
      scenario: "standard",
    },
  });

  const [value, setValue] = useState<number>();
  useEffect(() => {
    setOutput(value);
  }, [value]);

  return <IntegerInput onInputChange={setValue} value={value} />;
};
