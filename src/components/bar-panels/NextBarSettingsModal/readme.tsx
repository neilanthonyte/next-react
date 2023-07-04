import * as React from "react";
import { useEffect, useState } from "react";

import { mockMedicalStaffSessionWithApp } from "next-shared/src/mockData/mockAuth";
import { ClientSession as Session } from "next-shared/src/models/ClientSession";

import { useClient } from "../../../hooks/useClient";
import { ActiveTimeHandler } from "next-react/src/components/handlers/ActiveTimeHandler";
import { MockNextBarHandler } from "next-react/src/components/handlers/MockNextBarHandler";
import { NextBarSettingsModal } from ".";
import { useDebug } from "../../../debug/DemoWrapper";

export const Demo = () => {
  const client = useClient();
  useDebug({ isFixed: false });

  useEffect(() => {
    client.auth.setSession(mockMedicalStaffSessionWithApp);
  }, [client]);

  const [open, setOpen] = useState<boolean>(true);

  return (
    <MockNextBarHandler>
      <ActiveTimeHandler>
        <NextBarSettingsModal open={true} onClose={() => setOpen(false)} />
      </ActiveTimeHandler>
    </MockNextBarHandler>
  );
};
