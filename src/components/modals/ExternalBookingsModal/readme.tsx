import * as React from "react";
import { useState } from "react";

import { ExternalBookingsModal } from ".";
import { Button } from "../../generic/Button";
import { mockNextLocations } from "next-shared/src/mockData/mockLocations";
import { NextLocation } from "next-shared/src/models/NextLocation";

export const DemoStandard = () => {
  const [location, setLocation] = useState<NextLocation>(null);
  return (
    <>
      <Button
        onClick={() =>
          setLocation(mockNextLocations.find((l) => l.usesExternalBookings()))
        }
      >
        Set location with external bookings
      </Button>
      <ExternalBookingsModal
        onClose={() => setLocation(null)}
        location={location}
      />
    </>
  );
};

export const DemoMoreInfo = () => {
  const [location, setLocation] = useState<NextLocation>(null);
  return (
    <>
      <Button
        onClick={() =>
          setLocation(mockNextLocations.find((l) => l.usesExternalBookings()))
        }
      >
        Set location with external bookings
      </Button>
      <ExternalBookingsModal
        onClose={() => setLocation(null)}
        location={location}
        showLocationPageLink={true}
      />
    </>
  );
};
