import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { ProviderAppSettingsView } from ".";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "ProviderAppSettingsView",
      scenario: "standard",
    },
  });

  return (
    <>
      <p>HACK please use with a real client</p>
      <ProviderAppSettingsView />
    </>
  );
};
