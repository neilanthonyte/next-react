import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { FilterBar } from ".";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "FilterBar",
      scenario: "standard",
    },
  });

  return <FilterBar />;
};
