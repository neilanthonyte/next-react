import * as React from "react";

import { ApppointmentSlotCalendar } from ".";
import {
  mockAppointmentTypes,
  mockAppointmentTypeNoAvailabilitySlug,
} from "next-shared/src/mockData/mockAppointmentTypes";
import { mockNextLocations } from "next-shared/src/mockData/mockLocations";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { BookingContext } from "../../../contexts/AppointmentBookingContext";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { addParamsToUrl } from "../../../helpers/addParamsToUrl";
import { BookingProvider } from "../BookingProvider";

const Inner = () => {
  const { location, hcp, appointmentType, slot } =
    useRequiredContext(BookingContext);

  const selection = {
    location: location && location.slug,
    hcp: hcp && hcp.slug,
    appointmentType: appointmentType && appointmentType.slug,
  };

  return (
    <>
      <ApppointmentSlotCalendar />
      <div className="debug">
        <pre>{JSON.stringify(selection, null, 2)}</pre>
        <pre>{JSON.stringify(slot, null, 2)}</pre>
        <p>
          Please note - using the <code>BookingHandlerDebug</code> will cause
          issues when testing the error reporting
        </p>
      </div>
    </>
  );
};

export const DemoStandard = () => {
  const preselection = {
    location: mockNextLocations[0].slug,
    appointmentType: mockAppointmentTypes[1].slug,
  };

  return (
    <NextAppHandlerWeb>
      <BookingProvider preselection={preselection}>
        <Inner />
      </BookingProvider>
      <ul>
        <li>
          Add <code>?debugClientMethodsError=</code>{" "}
          <a
            href={addParamsToUrl({
              debugClientMethodsError: ["bookings.retrieveSlots"],
            })}
          >
            (add now)
          </a>
          <a
            href={addParamsToUrl({
              debugClientMethodsError: undefined,
            })}
          >
            (remove now)
          </a>
        </li>
      </ul>
    </NextAppHandlerWeb>
  );
};

export const DemoNoAvailability = () => {
  const preselection = {
    // HACK known to be at the second location
    location: mockNextLocations[1].slug,
    appointmentType: mockAppointmentTypeNoAvailabilitySlug,
  };

  return (
    <NextAppHandlerWeb>
      <BookingProvider preselection={preselection}>
        <Inner />
      </BookingProvider>
    </NextAppHandlerWeb>
  );
};

export const DemoErrors = () => {
  const preselection = {
    location: mockNextLocations[0].slug,
    appointmentType: mockAppointmentTypes[0].slug,
  };

  return (
    <NextAppHandlerWeb
      configOverride={{ debugClientMethodsError: ["bookings.retrieveSlots"] }}
    >
      <BookingProvider preselection={preselection}>
        <Inner />
      </BookingProvider>
    </NextAppHandlerWeb>
  );
};
