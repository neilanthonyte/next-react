import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { Notifications } from ".";

export const DemoStandard = () => {
  useDebug({
    test: {
      componentName: "Notifications",
      scenario: "standard",
    },
  });

  return <Notifications amount={4} />;
};
