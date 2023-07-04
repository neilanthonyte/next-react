import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { TouchBackground } from ".";
import { useEffect, useState } from "react";

export const DemoStandard = () => {
  const { setActions } = useDebug({
    test: {
      componentName: "TouchBackground",
      scenario: "standard",
    },
  });

  const [dotSize, setDotSize] = useState(10);

  useEffect(() => {
    setActions([
      {
        label: "Increase dot",
        action: () => setDotSize((ds) => ds + 2),
      },
      {
        label: "Decrease dot",
        action: () => setDotSize((ds) => ds - 2),
      },
    ]);
  }, []);

  return (
    <div style={{ height: "80vh", position: "relative" }}>
      <TouchBackground key={dotSize} dotSize={dotSize} />
    </div>
  );
};
