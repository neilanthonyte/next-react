import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { PatientAppInstructions } from ".";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "PatientAppInstructions",
      scenario: "standard",
    },
  });

  return <PatientAppInstructions />;
};
