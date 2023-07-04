import { useCallback } from "react";

import { useClient } from "../../useClient";

interface IUseSendBookingConfirmation {
  /**
   * send booking confirmation email.
   * @param appointmentId - this should be a Helix appointment ID
   */
  sendBookingConfirmation: (appointmentId: string) => Promise<string>;
  error: Error | null;
}

/**
 * Hook handling fetching of anatomy articles
 */
export const useSendBookingConfirmation = (): IUseSendBookingConfirmation => {
  const client = useClient();

  // TODO use react-query
  const sendBookingConfirmation = useCallback(
    (helixAppointmentId: string) =>
      client.appointments
        .sendBookingConfirmation(helixAppointmentId)
        .then(() => {
          return "Booking confirmation email sent to patient";
        })
        .catch((e) => {
          console.error(e);
          return "Unable to send booking confirmation to patient";
        }),
    [],
  );

  return {
    sendBookingConfirmation,
    // TODO
    error: null,
  };
};
