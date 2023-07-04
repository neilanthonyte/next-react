import * as React from "react";
import { useState } from "react";

import { AppointmentSelectionSummary } from ".";
import { IAppointmentBookingPreselection } from "../../../contexts/AppointmentBookingContext";
import { BookingPreselectionDebug } from "../../debug/BookingPreselectionDebug";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { BookingProvider } from "../BookingProvider";
import { BookingHandlerDebug } from "../BookingProvider/readme";

export const DemoStandard = () => {
  const [preselection, setPreselection] =
    useState<IAppointmentBookingPreselection>();
  return (
    <NextAppHandlerWeb>
      <BookingProvider
        preselection={preselection}
        key={JSON.stringify(preselection)}
      >
        <AppointmentSelectionSummary />
        <div className="debug">
          <BookingPreselectionDebug onChange={setPreselection} />
          <BookingHandlerDebug />
        </div>
      </BookingProvider>
    </NextAppHandlerWeb>
  );
};
