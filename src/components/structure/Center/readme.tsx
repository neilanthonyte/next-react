import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { Center } from ".";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "Center",
      scenario: "standard",
    },
  });

  return <Center />;
};
