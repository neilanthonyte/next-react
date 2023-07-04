import * as React from "react";
import { NextProviderApp } from ".";

import { useDebug } from "../../debug/DemoWrapper";

export const DemoStandard = () => {
  useDebug({
    isFixed: false,
    fixedFullscreen: true,
    setSessionDebug: true,
  });

  return (
    <div style={{ height: "800px", width: "400px" }}>
      <NextProviderApp />
    </div>
  );
};
