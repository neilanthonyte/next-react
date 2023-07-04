import * as React from "react";

import { MockNextApiClient } from "../../handlers/MockNextApiClient";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { BookingContext } from "../../../contexts/AppointmentBookingContext";
import { AppointmentTypes } from ".";
import { ErrorResolverHandler } from "../../handlers/ErrorResolverHandler";
import { BookingHandlerDebug } from "../BookingProvider/readme";
import { BookingProvider } from "../BookingProvider";

const Inner = () => {
  const { appointmentType } = useRequiredContext(BookingContext);

  return (
    <>
      <AppointmentTypes />
      <div className="debug">
        <BookingHandlerDebug />
        <pre>{JSON.stringify(appointmentType, null, 2)}</pre>
      </div>
    </>
  );
};

export const Demo = () => {
  return (
    <MockNextApiClient>
      <ErrorResolverHandler>
        <BookingProvider>
          <Inner />
        </BookingProvider>
      </ErrorResolverHandler>
    </MockNextApiClient>
  );
};
