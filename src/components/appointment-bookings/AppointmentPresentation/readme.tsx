import * as React from "react";
import { useState, useCallback, useEffect } from "react";

import { AppointmentPresentation } from ".";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { BookingContext } from "../../../contexts/AppointmentBookingContext";
import { useClient } from "../../../hooks/useClient";
import { mockPatients } from "next-shared/src/mockData/mockPatients";
import { BookingProvider } from "../BookingProvider";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { useDebug } from "../../../debug/DemoWrapper";

export const DemoStandard = () => {
  const client = useClient();
  const { setOutput, setActions } = useDebug();
  const { setPatient } = useRequiredContext(BookingContext);
  const { nextPatient } = useSyncedSessionData();

  const handlePrefillMockPatient = useCallback(() => {
    setPatient(mockPatients[0].fhir);
  }, [setPatient]);

  const handlePrefillSessionPatient = useCallback(() => {
    setPatient(nextPatient.fhir);
  }, [client.auth.session]);

  useEffect(() => {
    setActions([
      {
        action: handlePrefillSessionPatient,
        label: "Session patient",
      },
      {
        action: handlePrefillMockPatient,
        label: "Mock patient",
      },
    ]);
  }, []);

  return (
    <BookingProvider>
      <AppointmentPresentation
        onSuccess={setOutput}
        onDismiss={() => setOutput("Skipped")}
      />
    </BookingProvider>
  );
};
