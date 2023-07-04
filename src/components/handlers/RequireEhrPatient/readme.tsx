import * as React from "react";

import { mockPatientSessionWithAssociation } from "next-shared/src/mockData/mockAuth";

import { RequireEhrPatient } from ".";
import { useClient } from "../../../hooks/useClient";
import { useDebug } from "../../../debug/DemoWrapper";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";

export const DemoStandard = () => {
  const client = useClient();
  const { ehrPatient } = useSyncedSessionData();
  const { setActions } = useDebug();

  const addPatient = () => {
    client.auth.setSession(mockPatientSessionWithAssociation);
  };
  const clearPatient = () => {
    client.auth.logout();
  };

  React.useEffect(() => {
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
    <RequireEhrPatient>
      <pre style={{ fontSize: "8pt" }}>
        {JSON.stringify(ehrPatient, null, 2)}
      </pre>
    </RequireEhrPatient>
  );
};
