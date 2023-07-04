import * as React from "react";

import { AppointmentOtherConcerns } from ".";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { BookingContext } from "../../../contexts/AppointmentBookingContext";
import { mockAppointmentTypes } from "next-shared/src/mockData/mockAppointmentTypes";
import { useEffect } from "react";
import { useDebug } from "../../../debug/DemoWrapper";
import { BookingProvider } from "../BookingProvider";

export const DemoStandard = () => {
  return (
    <BookingProvider>
      <Inner />
    </BookingProvider>
  );
};

const Inner = () => {
  const {
    appointmentType,
    setAppointmentType,
    additionalTimeRequired,
    appointmentLength,
    appointmentLengthWithExtensions,
  } = useRequiredContext(BookingContext);

  const { setActions } = useDebug({
    test: {
      componentName: "AppointmentOtherConcerns",
      scenario: "standard",
    },
  });

  useEffect(() => {
    const actions = mockAppointmentTypes.map((apptType) => ({
      test: `appointment-${apptType.slug}`,
      label: apptType.label,
      isActive: apptType.slug === appointmentType?.slug,
      action: () => setAppointmentType(apptType),
    }));
    setActions(actions);
  }, [appointmentType]);

  return (
    <>
      <AppointmentOtherConcerns />
      <div className="debug">
        <div>
          <p>
            Additional time required:{" "}
            <span data-test="additionalTimeRequired">
              {additionalTimeRequired}
            </span>
          </p>
          <p>Appointment length: {appointmentLength}</p>
          <p>
            Appointment length with extensions:{" "}
            {appointmentLengthWithExtensions}
          </p>
        </div>
      </div>
    </>
  );
};
