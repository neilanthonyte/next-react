import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { ProviderAppPatient } from ".";
import { ProviderAppProvider } from "../ProviderAppProvider";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "ProviderAppPatient",
      scenario: "standard",
    },
    setSessionDebug: true,
    requireSession: "provider",
  });

  return (
    <ProviderAppProvider>
      <p>HACK please use with a real client</p>
      <ProviderAppPatient />
    </ProviderAppProvider>
  );
};
