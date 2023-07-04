import * as React from "react";

import { NextFoyerApp } from ".";
import { useDebug } from "../../debug/DemoWrapper";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "NextFoyerApp",
      scenario: "standard",
    },
  });

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <NextFoyerApp />
    </div>
  );
};
