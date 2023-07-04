import * as React from "react";
import { BookingSection, BookingSectionTitle } from "../BookingSection";
import { BookingOptions, BookingOption } from "../BookingOptions";

interface IPatientBookingForSelfOptions {
  selected: null | boolean;
  onSelect: (s: boolean) => void;
}

export const PatientBookingForSelfOptions: React.FC<
  IPatientBookingForSelfOptions
> = ({ selected, onSelect }) => {
  return (
    <BookingSection>
      <BookingSectionTitle>
        Is this appointment for you or for someone else?
      </BookingSectionTitle>
      <BookingOptions>
        <BookingOption
          selected={selected === true}
          onSelect={() => onSelect(true)}
        >
          <span data-test="forMe">For me</span>
        </BookingOption>
        <BookingOption
          selected={selected === false}
          onSelect={() => onSelect(false)}
        >
          <span data-test="someoneElse">Someone else</span>
        </BookingOption>
      </BookingOptions>
    </BookingSection>
  );
};
