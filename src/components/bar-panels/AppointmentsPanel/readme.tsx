import * as React from "react";
import { useEffect } from "react";

import { mockMedicalStaffSession } from "next-shared/src/mockData/mockAuth";

import { useClient } from "../../../hooks/useClient";
import { AppointmentsPanel } from ".";

export const DemoStandard = () => {
  const client = useClient();

  useEffect(() => {
    client.auth.setSession(mockMedicalStaffSession);
  }, []);

  // TODO add in local patient support

  return <AppointmentsPanel />;
};
