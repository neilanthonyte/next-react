import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { NextPatientUpcomingAppointments } from ".";

export const DemoStandard = () => {
  useDebug({
    requireSession: "patient",
    setSessionDebug: true,
    test: {
      componentName: "NextPatientUpcomingAppointments",
      scenario: "standard",
    },
  });

  return <NextPatientUpcomingAppointments />;
};
