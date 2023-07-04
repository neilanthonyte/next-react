import * as React from "react";
import { useEffect, useState } from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { TelehealthScreenView } from ".";

export const DemoStandard = () => {
  const { setActions } = useDebug({
    test: {
      componentName: "TelehealthScreenView",
      scenario: "standard",
    },
    isFixed: true,
  });

  const [canToggleSize, setCanToggleSize] = useState<boolean>(true);

  useEffect(() => {
    setActions([
      { label: "Toggle size", action: () => setCanToggleSize((s) => !s) },
    ]);
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <TelehealthScreenView canToggleSize={canToggleSize} />;
    </div>
  );
};
