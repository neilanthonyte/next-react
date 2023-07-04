import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { COMPONENT_NAME } from ".";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "COMPONENT_NAME",
      scenario: "standard"
    }
  });

  return (
    <COMPONENT_NAME />
  );
};
