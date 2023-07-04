import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { PatientLinkingDebug } from ".";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "PatientLinkingDebug",
      scenario: "standard",
    },
    requireSession: "patient",
    setSessionDebug: true,
  });

  return <PatientLinkingDebug setOutput={setOutput} />;
};
