import * as React from "react";
import { useEffect } from "react";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { BookingContext } from "../../../contexts/AppointmentBookingContext";
import { useDebug } from "../../../debug/DemoWrapper";
import { AppointmentMedicalStaff } from ".";
import { BookingProvider } from "../BookingProvider";

const Inner = () => {
  const { hcp, appointmentType } = useRequiredContext(BookingContext);

  const { setOutput } = useDebug({
    test: {
      componentName: "AppointmentMedicalStaff",
      scenario: "standard",
    },
  });

  useEffect(() => {
    setOutput({ hcp, appointmentType });
  }, [hcp, appointmentType]);

  return <AppointmentMedicalStaff />;
};

export const Demo = () => {
  return (
    <BookingProvider>
      <Inner />
    </BookingProvider>
  );
};
