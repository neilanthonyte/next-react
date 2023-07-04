import * as React from "react";
import { useState, useCallback } from "react";

import { AppointmentConfirmAndProcess } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import {
  BookingContext,
  BOOKING_STAGES,
} from "../../../contexts/AppointmentBookingContext";
import { mockNextLocations } from "next-shared/src/mockData/mockLocations";
import { mockHcps } from "next-shared/src/mockData/mockHcps";
import { mockAppointmentTypes } from "next-shared/src/mockData/mockAppointmentTypes";
import { mockSlotsWithHcps } from "next-shared/src/mockData/mockSlots";
import { mockPatients } from "next-shared/src/mockData/mockPatients";
import { BookingProvider } from "../BookingProvider";

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      <BookingProvider>
        <Inner />
      </BookingProvider>
    </NextAppHandlerWeb>
  );
};

const Inner = () => {
  const [result, setResult] = useState<string>();

  const {
    setLocation,
    setHcp,
    setAppointmentType,
    setSlot,
    setStage,
    setPatient,
  } = useRequiredContext(BookingContext);

  const handlePrefill = useCallback(() => {
    setLocation(mockNextLocations[0]);
    setHcp(mockHcps[0]);
    setAppointmentType(mockAppointmentTypes[0]);
    setSlot(mockSlotsWithHcps[0]);
    setStage(BOOKING_STAGES.Complete);
    setPatient(mockPatients[0].fhir);
  }, [setLocation, setHcp, setAppointmentType, setSlot, setStage]);

  return (
    <>
      <AppointmentConfirmAndProcess
        onCompletion={() => setResult("Completed")}
      />
      <div className="debug">
        <button onClick={handlePrefill}>Prefill</button>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </>
  );
};
