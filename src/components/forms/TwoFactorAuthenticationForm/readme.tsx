import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { TwoFactorAuthenticationForm } from ".";
import { useEffect, useState } from "react";

export const DemoStandard = () => {
  const { setOutput, setDebugElement } = useDebug({
    test: {
      componentName: "TwoFactorAuthenticationForm",
      scenario: "standard",
    },
  });

  const [retries, setRetries] = useState<number>(0);

  useEffect(() => {
    setDebugElement(<p>Retries: {retries}</p>);
  }, [retries]);

  const handleOnResend = async () => {
    setRetries((r) => (r += 1));
  };

  return (
    <TwoFactorAuthenticationForm
      onSuccess={setOutput}
      onResend={handleOnResend}
    />
  );
};
