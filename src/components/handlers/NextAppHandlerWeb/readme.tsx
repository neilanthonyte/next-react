import * as React from "react";

import { NextAppHandlerWeb } from "./";
import { SessionPersistenceDebug } from "../../debug/SessionPersistenceDebug";
import { ErrorBoundaryDebug } from "../../debug/ErrorBoundaryDebug";
import { ErrorResolverDebug } from "../../debug/ErrorResolverDebug";
import { GeoHandler } from "../../../handlers/GeoHandler";
import { BookingProvider } from "../../appointment-bookings/BookingProvider";
import { AppointmentLocations } from "../../appointment-bookings/AppointmentFlow/components/AppointmentLocations";

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      <div className="debug">
        <SessionPersistenceDebug />
        <ErrorBoundaryDebug />
        <ErrorResolverDebug />
      </div>
    </NextAppHandlerWeb>
  );
};

export const DemoOverride = () => {
  return (
    <NextAppHandlerWeb configOverride={{ persistSessionOnLoad: false }}>
      <div className="debug">
        <SessionPersistenceDebug />
      </div>
    </NextAppHandlerWeb>
  );
};

export const DemoComponent = () => {
  return (
    <NextAppHandlerWeb>
      <GeoHandler>
        <BookingProvider>
          <AppointmentLocations />
          <div className="debug"></div>
        </BookingProvider>
      </GeoHandler>
    </NextAppHandlerWeb>
  );
};
