import * as React from "react";
import { useEffect } from "react";

import { mockEhrPatientNoAssociationOrMatch } from "next-shared/src/mockData/mockEhrPatients";

import { useDebug } from "../../../debug/DemoWrapper";
import { useClient } from "../../../hooks/useClient";
import {
  DebugUseSyncedSessionData,
  useSyncedSessionData,
} from "../../../hooks/core/useSyncedSessionData";
import { ScopeEhrPatientSignupFlow } from ".";

export const DemoStandard = () => {
  const { setActions, setDebugElement } = useDebug({
    setSessionDebug: true,
    test: {
      componentName: "ScopeEhrPatientSignupFlow",
      scenario: "standard",
    },
    appConfig: {
      debugClientMethodsError: [
        "patientApp.sendInviteSignupTwoFactorCode",
        "patients.createPatientAccountFromEhr",
        "patientApp.verifyInviteSignupTwoFactorCode",
      ],
    },
  });

  const client = useClient();
  const { scope } = useSyncedSessionData();

  useEffect(() => {
    setDebugElement(<DebugUseSyncedSessionData />);
  }, []);

  useEffect(() => {
    if (!scope) {
      console.warn("unable to find scope");
      return;
    }

    setActions([
      {
        label: `Set EHR patient`,
        action: () => {
          client.scopes.setScopeUsers(scope.scopeId, {
            ehrPatientId:
              mockEhrPatientNoAssociationOrMatch.association.ehrPatientId,
          });
        },
      },
      {
        label: "Remove patient",
        action: () => {
          client.scopes.setScopeUsers(scope.scopeId, {
            ehrPatientId: null,
            patientId: null,
          });
        },
      },
    ]);
  }, []);

  return (
    <>
      <ScopeEhrPatientSignupFlow />
    </>
  );
};
