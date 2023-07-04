import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { CompanionWelcomeView } from ".";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "CompanionWelcomeView",
      scenario: "standard",
    },
  });

  return <CompanionWelcomeView />;
};
