import * as React from "react";
import { useState } from "react";

import { NextLocation } from "next-shared/src/models/NextLocation";

import { BookingContext } from "../../../../../contexts/AppointmentBookingContext";
import { useRequiredContext } from "../../../../../hooks/useRequiredContext";
import { ViewToggle } from "../../../../generic/InlineOptions";
import { VStack } from "../../../../structure/VStack";
import { AppointmentTypePromptIsNew } from "../../../AppointmentTypePromptIsNew";
import { BookingSection, BookingSectionTitle } from "../../../BookingSection";
import { AppointmentMedicalStaff } from "../../../AppointmentMedicalStaff";
import { AppointmentTypes } from "../../../AppointmentTypes";
import { PatientBookingForSelfOptions } from "../../../PatientBookingForSelfOptions";

/**
 * Component rendering some initial flow options and hcps / appoinmtent type picker
 */
export const AppointmentTypeAndHcpSelection: React.FC = () => {
  const {
    location,
    patientType,
    setPatientType,
    patientBookingForSelf,
    setPatientBookingForSelf,
  } = useRequiredContext(BookingContext);
  const options = ["By person", "By type"];
  const bookingPrimarySelectionToOption: Record<
    NextLocation["bookingPrimarySelection"],
    typeof options[number]
  > = {
    hcp: "By person",
    appointmentType: "By type",
  };

  const [show, setShow] = useState<string>(
    location && location.bookingPrimarySelection
      ? bookingPrimarySelectionToOption[location.bookingPrimarySelection]
      : options[0],
  );

  const showNewOrExisting = patientBookingForSelf !== null;

  const showTypeSelection = patientType !== undefined;

  return (
    <VStack>
      <PatientBookingForSelfOptions
        selected={patientBookingForSelf}
        onSelect={(x) => setPatientBookingForSelf(x)}
      />
      {showNewOrExisting && (
        <AppointmentTypePromptIsNew
          selected={patientType}
          onSelect={(v) => setPatientType(v)}
        />
      )}
      {showTypeSelection && (
        <BookingSection>
          <BookingSectionTitle>
            Please select your main reason for visit:
          </BookingSectionTitle>
          <VStack>
            <div style={{ textAlign: "center" }}>
              <ViewToggle
                options={options}
                selected={show}
                onSelection={setShow}
              />
            </div>
            {show === options[0] ? (
              <AppointmentMedicalStaff />
            ) : (
              <AppointmentTypes />
            )}
          </VStack>
        </BookingSection>
      )}
    </VStack>
  );
};
