import * as React from "react";
import { useEffect } from "react";

import { mockStaffSessionWithNextBarApp } from "next-shared/src/mockData/mockAuth";
import {
  mockEhrPatientWithAssociation,
  mockEhrPatientWithAssociationAndUpdates,
  mockEhrPatientNoAssociation,
} from "next-shared/src/mockData/mockEhrPatients";

import { useDebug } from "../../../../../debug/DemoWrapper";
import { useClient } from "../../../../../hooks/useClient";
import { SubscriptionsPanel } from ".";
import { useSyncedSessionData } from "../../../../../hooks/core/useSyncedSessionData";
import { Scope } from "next-shared/src/models/Scope";

export const DemoStandard = () => {
  const { setActions } = useDebug({
    test: {
      componentName: "SubscriptionsPanel",
      scenario: "standard",
    },
  });

  const client = useClient();
  const { scope } = useSyncedSessionData();

  useEffect(() => {
    client.auth.setSession(mockStaffSessionWithNextBarApp);
  }, []);

  useEffect(() => {
    if (!scope) {
      console.warn("unable to find scope");
      return;
    }

    setActions([
      {
        label: "Set Next patient with card and subscription",
        action: () => {
          client.scopes.setScopeUsers(scope.scopeId, {
            ehrPatientId:
              mockEhrPatientWithAssociation.association.ehrPatientId,
          });
        },
      },
      {
        label: "Set Next patient with no card",
        action: () => {
          client.scopes.setScopeUsers(scope.scopeId, {
            ehrPatientId:
              mockEhrPatientWithAssociationAndUpdates.association.ehrPatientId,
          });
        },
      },
      {
        label: "Set EHR patient with appointment and payment",
        action: () => {
          client.scopes.setScopeUsers(scope.scopeId, {
            ehrPatientId: mockEhrPatientNoAssociation.association.ehrPatientId,
          });
        },
      },
    ]);
  }, [scope]);

  return <SubscriptionsPanel />;
};
