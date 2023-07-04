import React from "react";
import { useDebug } from "next-react/src/debug/DemoWrapper";
import { PatientActionPlan } from ".";

export const DemoStandard = () => {
  useDebug({
    setSessionDebug: true,
    test: {
      componentName: "PatientActionPlan",
      scenario: "standard",
    },
  });
  return <PatientActionPlan />;
};
