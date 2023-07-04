import * as React from "react";
import { TAppointmentTypePatientType } from "next-shared/src/models/AppointmentType";
import { BookingSection, BookingSectionTitle } from "../BookingSection";
import { BookingOptions, BookingOption } from "../BookingOptions";
import { BookingContext } from "../../../contexts/AppointmentBookingContext";
import { useRequiredContext } from "../../../hooks/useRequiredContext";

interface IAppointmentTypePromptIsNewProps {
  selected: TAppointmentTypePatientType;
  onSelect: (s: TAppointmentTypePatientType) => void;
}

export const AppointmentTypePromptIsNew: React.FC<
  IAppointmentTypePromptIsNewProps
> = ({ selected, onSelect }) => {
  const { patientBookingForSelf } = useRequiredContext(BookingContext);
  return (
    <BookingSection>
      <BookingSectionTitle>
        Have {patientBookingForSelf ? "you" : "they"} been to this clinic
        before?
      </BookingSectionTitle>
      {/* TODO: replace with the Choice component */}
      <BookingOptions>
        <BookingOption
          onSelect={() => onSelect("returning")}
          selected={selected === "returning"}
        >
          Yes
        </BookingOption>
        <BookingOption
          onSelect={() => onSelect("new")}
          selected={selected === "new"}
        >
          Not yet
        </BookingOption>
      </BookingOptions>
    </BookingSection>
  );
};
