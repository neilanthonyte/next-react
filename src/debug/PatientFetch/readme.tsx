import * as React from "react";

import { PatientFetch } from ".";
import { useDebug } from "../DemoWrapper";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "PatientFetch",
      scenario: "standard",
    },
  });

  return <PatientFetch />;
};
