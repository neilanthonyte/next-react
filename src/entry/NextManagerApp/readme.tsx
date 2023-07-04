import * as React from "react";

import { NextManagerApp } from ".";
import { useDebug } from "../../debug/DemoWrapper";

export const DemoStandard = () => {
  useDebug({ isFixed: true });
  return (
    <div style={{ height: "100vh" }}>
      <NextManagerApp />
    </div>
  );
};
