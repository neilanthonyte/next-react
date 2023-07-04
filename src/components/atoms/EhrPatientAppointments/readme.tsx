import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { EhrPatientAppointments } from ".";

export const DemoStandard = () => {
  useDebug({
    requireSession: "patient",
    setSessionDebug: true,
    test: {
      componentName: "EhrPatientUpcomingAppointments",
      scenario: "standard",
    },
  });

  return <EhrPatientAppointments />;
};
