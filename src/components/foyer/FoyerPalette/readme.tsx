import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { FoyerPalette } from ".";
import CircularIcon from "../../generic/CircularIcon";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "FoyerPalette",
      scenario: "standard",
    },
  });

  const style: React.CSSProperties = {
    height: "800px",
    background: "lightblue",
    position: "relative",
  };

  return (
    <div style={style}>
      <FoyerPalette>
        <CircularIcon name="action-clear" size={EStandardSizes.Large} />
        <CircularIcon name="action-undo" size={EStandardSizes.Large} />
        <CircularIcon name="action-erase" size={EStandardSizes.Large} />
      </FoyerPalette>
    </div>
  );
};
