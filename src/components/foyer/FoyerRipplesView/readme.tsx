import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { FoyerRipplesView } from ".";
import { FoyerModesHandler } from "../FoyerModesHandler";

const modes = [
  {
    touchColors: {
      high: [255, 0, 0],
      mid: [255, 255, 255],
      low: [0, 255, 255],
    },
  },
  {
    touchColors: {
      high: [255, 0, 0],
      mid: [255, 255, 255],
      low: [0, 255, 255],
    },
  },
];

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "FoyerRipplesView",
      scenario: "standard",
    },
    isFixed: true,
  });

  return (
    <FoyerModesHandler _modes={modes} cycleSpeed={4000}>
      <FoyerRipplesView />
    </FoyerModesHandler>
  );
};
