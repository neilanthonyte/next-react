import * as React from "react";

import { NextConsultScreenApp } from ".";
import { useDebug } from "../../debug/DemoWrapper";

export const DemoStandard = () => {
  useDebug({ isFixed: true });

  return (
    <div style={{ height: "100vh" }}>
      <NextConsultScreenApp />
    </div>
  );
};
