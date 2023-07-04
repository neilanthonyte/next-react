import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { FoyerBackgroundView } from ".";
import { FoyerModesHandler } from "../FoyerModesHandler";

const modes = [
  {
    touchColors: {
      high: [255, 0, 0],
      mid: [255, 255, 255],
      low: [0, 255, 255],
    },
    showLogo: true,
    backgroundImageUrl: "http://localhost:6060/example-image/img1",
  },
  {
    touchColors: {
      high: [255, 0, 0],
      mid: [255, 255, 255],
      low: [0, 255, 255],
    },
    backgroundColor: [255, 0, 0],
  },
  {
    touchColors: {
      high: [255, 0, 0],
      mid: [255, 255, 255],
      low: [0, 255, 255],
    },
    backgroundColor: [0, 255, 0],
  },
  {
    touchColors: {
      high: [0, 255, 0],
      mid: [255, 255, 255],
      low: [255, 0, 255],
    },
    showArticle: false,
    backgroundImageUrl: "http://localhost:6060/example-image/img2",
  },
];

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "FoyerBackgroundView",
      scenario: "standard",
    },
    isFixed: true,
  });

  return (
    <FoyerModesHandler _modes={modes} cycleSpeed={4000}>
      <FoyerBackgroundView />
    </FoyerModesHandler>
  );
};
