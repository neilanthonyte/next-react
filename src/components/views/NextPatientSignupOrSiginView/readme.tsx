import * as React from "react";

import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { NextPatientSignupOrSiginView } from ".";
import { useDebug } from "../../../debug/DemoWrapper";

export const DemoStandard = () => {
  useDebug({
    setSessionDebug: true,
    test: {
      componentName: "NextPatientSignupOrSiginView",
      scenario: "standard",
    },
  });

  const { nextPatient } = useSyncedSessionData();

  return (
    <>
      {nextPatient ? (
        <h4> Logged in as {nextPatient.getDisplayName()} </h4>
      ) : (
        <NextPatientSignupOrSiginView />
      )}
    </>
  );
};
