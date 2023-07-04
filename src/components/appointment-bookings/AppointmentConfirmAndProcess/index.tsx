import * as React from "react";
import { useCallback } from "react";
import { AxiosError } from "axios";

import { useRequiredContext } from "../../../hooks/useRequiredContext";
import {
  BookingContext,
  BOOKING_STAGES,
} from "../../../contexts/AppointmentBookingContext";
import { BlockButton } from "../../generic/Button";
import { AppointmentSelectionSummary } from "../AppointmentSelectionSummary";
import { VStack } from "../../structure/VStack";
import { ErrorResolverContext } from "../../../contexts/ErrorResolver";
import {
  SuccessMessage,
  MessageTitle,
  MessageBody,
} from "../../generic/Message";
import { BookingSection, BookingSectionTitle } from "../BookingSection";

export interface IProcessProps {
  onCompletion?: () => any;
}

/**
 * Processes an appointment booking.
 */
export const AppointmentConfirmAndProcess: React.FC<IProcessProps> = ({
  onCompletion,
}) => {
  const {
    bookAppointment,
    stage,
    onCompleteDismiss: onComplete,
  } = useRequiredContext(BookingContext);

  const { resolveError } = useRequiredContext(ErrorResolverContext);

  const book = useCallback(async () => {
    try {
      await bookAppointment();
      onCompletion && onCompletion();
    } catch (e) {
      // add specific case to handle booking conflicts
      console.warn(e);
      // TODO - ErrorHandling - update this after discussion of a standard error handling approach with the team
      if ((e as AxiosError)?.response?.status === 409) {
        resolveError({
          title: "Unfortunately the appointment time is no longer available",
          description: `The appointment time you have chosen is no longer available. To select a new time, please dismiss this message, then select "Change" next to Time of Day. `,
          approach: "modal",
        });
      } else {
        resolveError({
          title: "Unable to book appointment",
          description:
            "Please try again. If you continue to experience issues, please contact us.",
          approach: "modal",
        });
      }
    }
  }, [bookAppointment, onCompletion]);

  return (
    <VStack>
      <BookingSection>
        <BookingSectionTitle>
          Please review your appointment
        </BookingSectionTitle>
        <div>
          <AppointmentSelectionSummary />
        </div>
      </BookingSection>
      {stage !== BOOKING_STAGES.Complete ? (
        <BlockButton onClick={book}>Book now</BlockButton>
      ) : (
        <>
          <SuccessMessage>
            <MessageTitle>Your appointment has been booked</MessageTitle>
            <MessageBody>
              You will receive a confirmation email shortly
            </MessageBody>
          </SuccessMessage>
          <BlockButton onClick={onComplete}>Close</BlockButton>
        </>
      )}
    </VStack>
  );
};
