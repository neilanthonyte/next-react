import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { SetAccountPasswordForm } from ".";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "SetAccountPasswordForm",
      scenario: "standard",
    },
  });

  return <SetAccountPasswordForm onSuccess={setOutput} />;
};
