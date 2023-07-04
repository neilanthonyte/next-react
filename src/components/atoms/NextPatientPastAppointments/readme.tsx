import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { NextPatientPastAppointments } from ".";

export const DemoStandard = () => {
  useDebug({
    requireSession: "patient",
    setSessionDebug: true,
    test: {
      componentName: "NextPatientPastAppointments",
      scenario: "standard",
    },
  });

  return <NextPatientPastAppointments />;
};
