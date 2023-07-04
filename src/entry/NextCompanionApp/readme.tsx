import * as React from "react";
import { useContext, useEffect } from "react";

import {
  mockEhrPatientWithAssociation,
  mockEhrPatientNoAssociation,
} from "next-shared/src/mockData/mockEhrPatients";

import { useClient } from "../../hooks/useClient";
import { ConfigContext } from "../../contexts/ConfigContext";
import { CompanionApp } from "../../components/companion/CompanionApp";
import { useDebug } from "../../debug/DemoWrapper";
import { useSyncedSessionData } from "../../hooks/core/useSyncedSessionData";
import { mockPatients } from "next-shared/src/mockData/mockPatients";

export const DemoStandard = () => {
  const client = useClient();
  const { scope } = useSyncedSessionData();
  const { ehrPatient } = useSyncedSessionData();

  const { config } = useContext(ConfigContext);
  const { setActions, setDebugElement } = useDebug({
    isFixed: true,
    setSessionDebug: true,
    requireSession: config.useRealClient ? null : "app",
    test: { componentName: "NextCompanionApp", scenario: "standard" },
  });

  useEffect(() => {
    if (config.useRealClient) return;
    setDebugElement(
      <>
        {ehrPatient && (
          <p>
            Ehr patient in scope: {ehrPatient.getDisplayName()}, email:{" "}
            {ehrPatient.getFhirEmail()}
          </p>
        )}
        <p>Available mock patients emails to test link on login </p>
        <ul>
          {mockPatients.map((p) => (
            <li key={p.getDisplayName()}>{p.getFhirEmail()}</li>
          ))}
        </ul>
      </>,
    );
  }, [ehrPatient]);

  useEffect(() => {
    if (config.useRealClient) return;
    if (!scope) {
      console.warn("unable to find scope");
      return;
    }

    const actions = [];
    actions.push({
      label: "Set EHR patient",
      action: () => {
        return client.scopes.setScopeUsers(scope.scopeId, {
          ehrPatientId: mockEhrPatientNoAssociation.association.ehrPatientId,
        });
      },
    });
    actions.push({
      label: "Set Next patient",
      action: () => {
        return client.scopes.setScopeUsers(scope.scopeId, {
          ehrPatientId: mockEhrPatientWithAssociation.association.ehrPatientId,
        });
      },
    });
    actions.push({
      label: "Remove EHR patient",
      action: () => {
        return client.scopes.setScopeUsers(scope.scopeId, {
          ehrPatientId: null,
        });
      },
    });
    setActions(actions);
  }, [config.useRealClient, scope]);

  return (
    <div style={{ height: "100vh" }}>
      <CompanionApp />
    </div>
  );
};
