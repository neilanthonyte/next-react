import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { CaptureReviewView } from ".";
import { ProviderAppProvider } from "../ProviderAppProvider";
import { ProviderAppPatient } from "../ProviderAppPatient";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    setSessionDebug: true,
    requireSession: "provider",
    test: {
      componentName: "CaptureReviewView",
      scenario: "standard",
    },
  });

  return (
    <ProviderAppProvider>
      <p>HACK please use with a real client</p>
      <div style={{ height: "700px" }}>
        <CaptureReviewView />
        {/* allow them to pick a patient */}
        <ProviderAppPatient />
      </div>
    </ProviderAppProvider>
  );
};
