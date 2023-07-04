import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { CompanionApp } from ".";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "CompanionApp",
      scenario: "standard",
    },
  });

  return <CompanionApp />;
};
