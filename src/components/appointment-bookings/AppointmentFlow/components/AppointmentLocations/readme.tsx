import * as React from "react";
import { useEffect } from "react";

import { AppointmentLocations } from ".";
import { BookingContext } from "../../../../../contexts/AppointmentBookingContext";
import { useDebug } from "../../../../../debug/DemoWrapper";
import { GeoHandler } from "../../../../../handlers/GeoHandler";
import { useRequiredContext } from "../../../../../hooks/useRequiredContext";
import { BookingProvider } from "../../../BookingProvider";

const Inner = () => {
  const { location } = useRequiredContext(BookingContext);

  const { setOutput } = useDebug({
    test: {
      componentName: "AppointmentLocations",
      scenario: "standard",
    },
  });

  useEffect(() => {
    setOutput(location);
  }, [location]);

  return <AppointmentLocations />;
};

export const Demo = () => {
  return (
    <GeoHandler>
      <BookingProvider>
        <Inner />
      </BookingProvider>
    </GeoHandler>
  );
};
