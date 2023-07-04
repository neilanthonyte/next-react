import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { ToggleViews } from ".";
import { useState } from "react";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "ToggleViews",
      scenario: "standard",
    },
  });

  const [active, setActive] = useState<number>(0);

  const views = [
    <div key={1} style={{ backgroundColor: "pink", height: "100vh" }}>
      <a onClick={() => setActive(1)}>Next</a>
    </div>,
    <div key={2} style={{ backgroundColor: "yellow", height: "100vh" }}>
      <a onClick={() => setActive(2)}>Next</a>
    </div>,
    <div key={3} style={{ backgroundColor: "orange", height: "100vh" }}>
      <a onClick={() => setActive(0)}>Start again</a>
    </div>,
  ];

  return <ToggleViews views={views} activeIndex={active} />;
};
