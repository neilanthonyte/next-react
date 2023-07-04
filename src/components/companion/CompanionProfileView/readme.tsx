import * as React from "react";
import { useEffect } from "react";

import {
  mockEhrPatientWithAssociation,
  mockEhrPatientNoAssociationOrMatch,
} from "next-shared/src/mockData/mockEhrPatients";

import { IDemoAction, useDebug } from "../../../debug/DemoWrapper";
import { useClient } from "../../../hooks/useClient";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { mockCompanionSessionWithPatient } from "next-shared/src/mockData/mockAuth";
import { CompanionProfileView } from ".";

export const DemoStandard = () => {
  const { setActions } = useDebug({
    setSessionDebug: true,
    test: { componentName: "ProfileViewCompanion", scenario: "standard" },
  });

  const client = useClient();
  const { scope } = useSyncedSessionData();

  useEffect(() => {
    // TODO not sure if this is the right type of patient
    client.auth.setSession(mockCompanionSessionWithPatient);
  }, []);

  useEffect(() => {
    const actions: IDemoAction[] = [];
    if (!scope) {
      console.warn("unable to find scope");
      return;
    }
    actions.push({
      label: `Set EHR patient`,
      action: () => {
        client.scopes.setScopeUsers(scope.scopeId, {
          ehrPatientId:
            mockEhrPatientNoAssociationOrMatch.association.ehrPatientId,
        });
      },
    });
    actions.push({
      label: `Set Next patient`,
      action: () => {
        client.scopes.setScopeUsers(scope.scopeId, {
          ehrPatientId: mockEhrPatientWithAssociation.association.ehrPatientId,
        });
      },
    });
    setActions(actions);
  }, [scope]);

  return <CompanionProfileView />;
};
