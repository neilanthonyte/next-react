import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import { VStack } from "../../structure/VStack";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import {
  BookingContext,
  BOOKING_STAGES,
} from "../../../contexts/AppointmentBookingContext";
import {
  BookingSection,
  BookingSectionTitle,
  BookingSectionFooter,
} from "../BookingSection";
import { BookingOptions, BookingOption } from "../BookingOptions";

const ADDITIONAL_LENGTHS = [10, 20];
const MAX_LENGTH = 40;

/**
 * Component rendering appointment length options based on the appointment type selected during the booking flow
 *
 * Only shown if the appointment location has bookingFeatureTimingOverridesEnabled
 */
export const AppointmentOtherConcerns: React.FC = () => {
  const {
    additionalTimeRequired,
    setAdditionalTimeRequired,
    appointmentType,
    appointmentLength,
    appointmentLengthWithExtensions,
    setStage,
  } = useRequiredContext(BookingContext);

  const [needsLonger, setNeedsLonger] = useState<null | boolean>(
    additionalTimeRequired === null ? null : !!additionalTimeRequired,
  );

  const handleNext = useCallback(() => {
    setStage(BOOKING_STAGES.Time);
  }, [setStage]);

  useEffect(() => {
    if (!needsLonger) {
      setAdditionalTimeRequired(0);
    }
  }, [needsLonger]);

  if (!appointmentType) {
    return null;
  }

  // cap the options to those that stay under the time limit
  const lengths = ADDITIONAL_LENGTHS.map((l) => l + appointmentLength).filter(
    (l) => l <= MAX_LENGTH,
  );

  if (lengths.length === 0) {
    return (
      <VStack>
        <BookingSection>
          <BookingSectionTitle>
            Your appointment is {appointmentLength} minutes long. If you think
            you need longer please book another appointment or contact the
            clinic.
          </BookingSectionTitle>
        </BookingSection>
        <BookingSectionFooter onAccept={handleNext} acceptLabel="Next" />
      </VStack>
    );
  }

  return (
    <VStack>
      <BookingSection>
        <BookingSectionTitle>
          Do you have any other concerns to discuss with your doctor - will you
          need longer than {appointmentLength} minutes?
        </BookingSectionTitle>
        {/* TODO: replace with the Choice component */}
        <BookingOptions>
          <BookingOption
            selected={needsLonger === true}
            onSelect={() => setNeedsLonger(true)}
          >
            Yes
          </BookingOption>
          <BookingOption
            selected={needsLonger === false}
            onSelect={() => {
              setNeedsLonger(false);
            }}
          >
            No
          </BookingOption>
        </BookingOptions>
      </BookingSection>
      {needsLonger && lengths.length === 1 && (
        <BookingSection>
          <BookingSectionTitle>
            How much time do you need with your doctor?
          </BookingSectionTitle>
          {/* TODO: replace with the Choice component */}
          <BookingOptions>
            <BookingOption
              selected={appointmentLength === appointmentLengthWithExtensions}
              onSelect={() => setAdditionalTimeRequired(0)}
            >
              Keep time ({appointmentLength} mins)
            </BookingOption>
            <BookingOption
              selected={appointmentLengthWithExtensions === lengths[0]}
              onSelect={() => setAdditionalTimeRequired(10)}
            >
              {lengths[0]} minutes
            </BookingOption>
          </BookingOptions>
        </BookingSection>
      )}
      {needsLonger && lengths.length > 1 && (
        <BookingSection>
          <BookingSectionTitle>
            How much time do you need with your doctor?
          </BookingSectionTitle>
          {/* TODO: replace with the Choice component */}
          <BookingOptions>
            {lengths.map((l) => (
              <BookingOption
                key={l}
                selected={appointmentLengthWithExtensions === l}
                onSelect={() =>
                  setAdditionalTimeRequired(l - appointmentLength)
                }
              >
                {l} minutes
              </BookingOption>
            ))}
          </BookingOptions>
        </BookingSection>
      )}
      <BookingSectionFooter onAccept={handleNext} acceptLabel="Next" />
    </VStack>
  );
};
