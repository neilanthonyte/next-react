import * as React from "react";
import { useEffect, useState } from "react";

import { ELayoutVariant } from "next-shared/src/types/layouts";
import { mockUpcomingAppointmentWithDetailsWithForm } from "next-shared/src/mockData/mockAppointments";

import { useDebug } from "../../../debug/DemoWrapper";
import { AppointmentCard } from ".";

export const DemoStandard = () => {
  const { setActions } = useDebug({
    test: { scenario: "standard", componentName: "AppointmentCard" },
  });

  const [layout, setLayout] = useState<ELayoutVariant>();

  useEffect(() => {
    setActions([
      {
        label: "Standard layout",
        action: () => setLayout(ELayoutVariant.Standard),
      },
      {
        label: "Compact layout",
        action: () => setLayout(ELayoutVariant.Compact),
      },
    ]);
  }, []);

  return (
    <AppointmentCard
      appointment={mockUpcomingAppointmentWithDetailsWithForm.appointment}
      hcp={mockUpcomingAppointmentWithDetailsWithForm.hcp}
      location={mockUpcomingAppointmentWithDetailsWithForm.location}
      layout={layout}
    />
  );
};

export const DemoRebook = () => {
  const { setOutput } = useDebug({
    test: { scenario: "rebook", componentName: "AppointmentCard" },
  });

  return (
    <AppointmentCard
      appointment={mockUpcomingAppointmentWithDetailsWithForm.appointment}
      hcp={mockUpcomingAppointmentWithDetailsWithForm.hcp}
      location={mockUpcomingAppointmentWithDetailsWithForm.location}
      onRebookAppoinmtent={setOutput}
    />
  );
};
