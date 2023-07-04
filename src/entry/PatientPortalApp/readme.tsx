import * as React from "react";

import { useDebug } from "../../debug/DemoWrapper";
import { PatientPortal } from ".";

export const DemoStandard = () => {
  useDebug({
    setSessionDebug: true,
    test: {
      componentName: "PatientPortalApp",
      scenario: "standard",
    },
  });

  return <PatientPortal />;
};
