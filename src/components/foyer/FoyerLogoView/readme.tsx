import React from "react";

import { EFoyerLogoMode, IFoyerMode } from "next-shared/src/types/IFoyerMode";

import { useDebug } from "../../../debug/DemoWrapper";
import { FoyerLogoView } from ".";
import { FoyerModesHandler } from "../FoyerModesHandler";

const createFoyerMode = (logoType: EFoyerLogoMode) => ({
  touchColors: {
    high: [255, 0, 0],
    mid: [255, 255, 255],
    low: [0, 255, 255],
  },
  logoType,
});

const modes: IFoyerMode[] = [
  EFoyerLogoMode.DARK,
  EFoyerLogoMode.LIGHT,
  EFoyerLogoMode.COLOR,
  EFoyerLogoMode.ANIMATED,
].map(createFoyerMode);

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "FoyerLogoView",
      scenario: "standard",
    },
    isFixed: true,
  });

  return (
    <FoyerModesHandler _modes={modes} cycleSpeed={3000}>
      <div
        style={{
          position: "relative",
        }}
      >
        <div
          onClick={() => alert("allow clickthrough!")}
          style={{
            position: "absolute",
            height: "100vh",
            width: "100vw",
            backgroundColor: "pink",
          }}
        ></div>
        <FoyerLogoView />
      </div>
    </FoyerModesHandler>
  );
};
