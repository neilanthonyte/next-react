import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { DeviceListView } from ".";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "DeviceListView",
      scenario: "standard",
    },
  });

  return <DeviceListView />;
};
