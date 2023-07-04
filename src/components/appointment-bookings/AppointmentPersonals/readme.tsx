import * as React from "react";
import { useEffect, useState } from "react";
import moment from "moment";

import { AppointmentPersonals } from ".";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { BookingContext } from "../../../contexts/AppointmentBookingContext";
import { useBookingSlots, IDateRange } from "../../../hooks/useBookingSlots";
import { addParamsToUrl } from "../../../helpers/addParamsToUrl";
import { BookingPayDockHandler } from "../BookingPayDockHandler";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { PendingContent } from "../../structure/PendingContent";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import { BookingProvider } from "../BookingProvider";
import { useDebug } from "../../../debug/DemoWrapper";

interface IInnerProps {}

const Inner: React.FC<IInnerProps> = ({}) => {
  useDebug({ setSessionDebug: true });
  const {
    locations,
    location,
    setLocation,
    hcps,
    hcp,
    setHcp,
    appointmentType,
    appointmentTypes,
    setAppointmentType,
    patient,
    notes,
    setSlot,
  } = useRequiredContext(BookingContext);

  // auto-select first location
  useEffect(() => {
    if (!locations) return;
    // HACK - not sure why this is required
    setTimeout(() => {
      setLocation(locations[0]);
    });
  }, [locations]);

  // auto-select first location
  useEffect(() => {
    if (!location || !hcps) return;
    // HACK - not sure why this is required
    setTimeout(() => {
      setHcp(hcps[0]);
    });
  }, [location, hcps]);

  // auto-select first digital appointment
  useEffect(() => {
    if (!hcp || !appointmentTypes) return;
    const appointment = appointmentTypes.find((t) => t.method === "digital");
    if (!appointment) return;
    setAppointmentType(appointment);
  }, [location, appointmentTypes]);

  // auto-select first slot
  const [dateRange, setDateRange] = useState<IDateRange>(null);
  const {
    initDate,
    data: slots,
    isLoading: slotsIsLoading,
    error: slotsError,
    refetch: slotsRefetch,
  } = useBookingSlots(appointmentType, dateRange);
  useEffect(() => {
    setDateRange(
      initDate
        ? {
            startDate: moment(initDate).startOf("day").format("YYYY-MM-DD"),
            endDate: moment(initDate).endOf("day").format("YYYY-MM-DD"),
          }
        : null,
    );
  }, [initDate]);

  useEffect(() => {
    if (slots) setSlot(slots[0]);
  }, [slots]);

  const selection = { patient, notes };

  return (
    <>
      <BookingPayDockHandler>
        <PendingContent check={slotsIsLoading === false}>
          {slotsError && (
            <ErrorPlaceholder
              retryLabel="Error (in example) fetching slots. click to retry."
              retry={slotsRefetch}
            />
          )}
          <AppointmentPersonals />
        </PendingContent>
      </BookingPayDockHandler>
      <div className="debug">
        <p>
          Include payments: <code>?payments=</code> (
          <a href={addParamsToUrl({ payments: true })}>add</a>)
        </p>

        <h4>Selection</h4>
        <p>{JSON.stringify(selection, null, 2)}</p>
      </div>
    </>
  );
};

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      <BookingProvider>
        <Inner />
      </BookingProvider>
    </NextAppHandlerWeb>
  );
};

export const DemoMockWithErrors = () => {
  return (
    <NextAppHandlerWeb configOverride={{ debugRequestErrorCount: 1 }}>
      <BookingProvider>
        <Inner />
      </BookingProvider>
    </NextAppHandlerWeb>
  );
};
