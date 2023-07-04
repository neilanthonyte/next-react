import * as React from "react";
import { useEffect } from "react";

import { mockMedicalStaffSessionWithApp } from "next-shared/src/mockData/mockAuth";
import { ClientSession as Session } from "next-shared/src/models/ClientSession";

import { useClient } from "../../../hooks/useClient";
import { ActiveTimeHandler } from "../../handlers/ActiveTimeHandler";
import { MockNextBarHandler } from "../../handlers/MockNextBarHandler";
import { LettersPanel } from ".";
import { useDebug } from "../../../debug/DemoWrapper";

export const Demo = () => {
  const client = useClient();
  useDebug({ isFixed: false });

  useEffect(() => {
    client.auth.setSession(mockMedicalStaffSessionWithApp);
  }, [client]);

  return (
    <MockNextBarHandler>
      <ActiveTimeHandler>
        <LettersPanel />
      </ActiveTimeHandler>
    </MockNextBarHandler>
  );
};
