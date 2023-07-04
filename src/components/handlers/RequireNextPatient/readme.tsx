import * as React from "react";

import { RequireNextPatient } from ".";
import { useClient } from "../../../hooks/useClient";
import { mockPatientSession } from "next-shared/src/mockData/mockAuth";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { useDebug } from "../../../debug/DemoWrapper";
import { useEffect } from "react";

export const DemoStandard = () => {
  const client = useClient();
  const { nextPatient } = useSyncedSessionData();
  const { setActions } = useDebug();

  const addPatient = () => {
    client.auth.setSession(mockPatientSession);
  };
  const clearPatient = () => {
    client.auth.logout();
  };

  useEffect(() => {
    setActions([
      {
        action: addPatient,
        label: "Add patient",
      },
      {
        action: clearPatient,
        label: "Clear patient",
      },
    ]);
  }, [setActions]);

  return (
    <RequireNextPatient>
      <pre style={{ fontSize: "8pt" }}>
        {JSON.stringify(nextPatient, null, 2)}
      </pre>
    </RequireNextPatient>
  );
};
