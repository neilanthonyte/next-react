import * as React from "react";
import { useEffect } from "react";

import { useClient } from "../../../hooks/useClient";
import { mockStaffSessionWithDashboardAppAndPatient } from "next-shared/src/mockData/mockAuth";
import { PatientCurtainView } from ".";

export const DemoStandard = () => {
  const client = useClient();

  useEffect(() => {
    client.auth.setSession(mockStaffSessionWithDashboardAppAndPatient);
  }, []);

  return (
    <>
      <PatientCurtainView />
      <div className="debug"></div>
    </>
  );
};
