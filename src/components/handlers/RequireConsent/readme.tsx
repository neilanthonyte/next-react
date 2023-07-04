import * as React from "react";
import { useState } from "react";

import { mockPatientSession } from "next-shared/src/mockData/mockAuth";
import { useClient } from "../../../hooks/useClient";
import { useFirstRender } from "../../../hooks/useFirstRender";
import { Button } from "../../generic/Button";
import { RequestErrorCountDebug } from "../../debug/RequestErrorCountDebug";
import { RequireConsent } from "./";

export const DemoStandard: React.FC = () => {
  const [showDemo, setShowDemo] = useState<boolean>(false);
  const client = useClient();

  useFirstRender(() => {
    // TODO need to set to a session that contains a patient that hasn't yet
    // consented
    throw new Error("unimplemented");

    // ensure terms are not accepted on mount.
    if (!client.auth.session) {
      client.auth.setSession(mockPatientSession);
      // e.g. client.auth.setSession(mockPatientSessionWithNoConsent);
    }
    // TODO should be set on the patient associated to the session above
    // client.auth.session.patient.hasAcceptedLatestTerms = false;
  });

  return (
    <div style={{ height: "800px" }}>
      {showDemo && (
        <RequireConsent>
          <div>Content that is only visible when consented</div>
        </RequireConsent>
      )}
      {showDemo ? (
        <Button onClick={() => location.reload()}>Reload page</Button>
      ) : (
        <Button onClick={() => setShowDemo(true)}>Start demo</Button>
      )}
      <div className="debug">
        <RequestErrorCountDebug />
      </div>
    </div>
  );
};
