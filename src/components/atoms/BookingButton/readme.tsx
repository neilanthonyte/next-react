import * as React from "react";
import { useState } from "react";

import { BookingButton } from ".";
import { mockNextLocations } from "next-shared/src/mockData/mockLocations";

export const DemoStandard = () => {
  const [result, setResult] = useState<string>("");
  return (
    <>
      <BookingButton
        location={mockNextLocations.find((l) => l.usesExternalBookings())}
      >
        Book now
      </BookingButton>
      <BookingButton
        location={mockNextLocations.find((l) => l.allowBookings === true)}
        onBook={() => setResult("Booked!!")}
      >
        Book now
      </BookingButton>
      <div className="debug">
        <pre>{result}</pre>
      </div>
    </>
  );
};
