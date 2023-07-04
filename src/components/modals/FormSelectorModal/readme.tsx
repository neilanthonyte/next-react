import * as React from "react";
import { useState, useEffect } from "react";

import { Scope } from "next-shared/src/models/Scope";

import { useClient } from "../../../hooks/useClient";
import { mockMedicalStaffSessionWithApp } from "next-shared/src/mockData/mockAuth";
import { useDebug } from "../../../debug/DemoWrapper";
import { FormSelectorModal } from ".";
import { useSyncedScopesForLocation } from "../../../hooks/core/useSyncedScopesForLocation";

export const DemoStandard = () => {
  useDebug({
    setSessionDebug: true,
    appConfig: {
      debugClientMethodsError: [
        "scopes.updateScopeAppState",
        "forms.retrievePatientFormsForLocation",
      ],
    },
  });
  return <Inner />;
};

const Inner = () => {
  const client = useClient();
  const { companions } = useSyncedScopesForLocation(
    client.auth.session?.locationId,
  );

  const [activeCompanion, setActiveCompanion] = useState<Scope>(null);

  useEffect(() => {
    client.auth.setSession(mockMedicalStaffSessionWithApp);
  }, []);

  return (
    <>
      {activeCompanion && (
        <FormSelectorModal
          close={() => setActiveCompanion(null)}
          scope={activeCompanion}
        />
      )}
      <div className="debug">
        <h4>Companions</h4>
        <ul>
          {(companions || []).map((c: Scope, i: number) => (
            <li key={i}>
              {c.label} <a onClick={() => setActiveCompanion(c)}>Assign form</a>
              <p>State:</p>
              <pre>{JSON.stringify(c.state, null, 2)}</pre>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
