import * as React from "react";
import { useState } from "react";

import { IAppointmentBookingPreselection } from "../../../contexts/AppointmentBookingContext";
import { MockNextApiClient } from "../../handlers/MockNextApiClient";
import { ErrorResolverHandler } from "../../handlers/ErrorResolverHandler";
import { AppointmentFlow } from ".";
import { BookingProvider } from "../BookingProvider";
import { BookingPreselectionDebug } from "../../debug/BookingPreselectionDebug";
import { AppointmentBookingAppDebug } from "../../../entry/BookingWidget/readme";
import { GeoHandler } from "../../../handlers/GeoHandler";
import { useDebug } from "../../../debug/DemoWrapper";

export const Demo = () => {
  const [preselection, setPreselection] =
    useState<IAppointmentBookingPreselection>();
  return (
    <BookingProvider
      preselection={preselection}
      key={JSON.stringify(preselection)}
    >
      <GeoHandler>
        <AppointmentFlow />
        <div className="debug">
          <BookingPreselectionDebug onChange={setPreselection} />
          <AppointmentBookingAppDebug />
        </div>
      </GeoHandler>
    </BookingProvider>
  );
};

export const DemoErrors = () => {
  useDebug({
    appConfig: {
      debugClientMethodsError: [
        "bookings.retrieveLocations",
        "bookings.retrieveHcps",
        "bookings.retrieveAppointmentTypes",
        "bookings.retrieveNextAvailable",
        "bookings.retrieveSlots",
        "bookings.bookAppointment",
        "geo.getLatLngByPostcode",
      ],
    },
  });

  return (
    <BookingProvider>
      <GeoHandler>
        <AppointmentFlow />
      </GeoHandler>
    </BookingProvider>
  );
};
