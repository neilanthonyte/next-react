import * as React from "react";
import { useEffect } from "react";

import { mockStaffMemberSession } from "next-shared/src/mockData/mockAuth";

import { useClient } from "../../../hooks/useClient";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { SessionPatientTypeDebug } from "../../debug/SessionPatientTypeDebug";
import { ProfilePanel } from ".";
import { NextBarHandler } from "../../handlers/NextBarHandler";

export const DemoStandard = () => {
  return (
    <div data-test="ProfilePanel-scenario-standard">
      <NextAppHandlerWeb configOverride={{ useRealClient: false }}>
        <NextBarHandler>
          <Inner />
        </NextBarHandler>
      </NextAppHandlerWeb>
    </div>
  );
};

const Inner: React.FC = () => {
  const client = useClient();

  useEffect(() => {
    client.auth.setSession(mockStaffMemberSession);
  }, []);

  return (
    <>
      <div data-test="component">
        <ProfilePanel />
      </div>
      <div className="debug">
        <SessionPatientTypeDebug />
      </div>
    </>
  );
};
