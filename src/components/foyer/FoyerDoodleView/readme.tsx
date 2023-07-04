import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { FoyerDoodleView } from ".";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "FoyerDoodleView",
      scenario: "standard",
    },
    isFixed: true,
  });

  return <FoyerDoodleView />;
};
