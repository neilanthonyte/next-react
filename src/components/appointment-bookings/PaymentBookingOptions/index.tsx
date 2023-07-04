import * as React from "react";
import { useMemo, useCallback, useState } from "react";

import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { BookingContext } from "../../../contexts/AppointmentBookingContext";
import { ICreditCard } from "next-shared/src/types/ICreditCard";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "../../structure/Modal";
import { Disable } from "../../generic/Disable";
import { useClient } from "../../../hooks/useClient";
import { BookingOptions, BookingOption } from "../BookingOptions";
import { BookingSectionTitle } from "../BookingSection";

interface IPaymentBookingOptions {
  isDisabled: boolean;
  creditCard: ICreditCard;
  skippable: boolean;
  setShowAppointmentCardOption: (IsAppointmentPayment: boolean) => void;
  showAppointmentCardOption: boolean;
}

/**
 * Component rendering payment options available when the appointment requires a payment
 * and we have a session
 *
 * We want to give an option to add/use a credit card on record or use a different
 * card that can only be used for the appointment that's being booked
 */
export const PaymentBookingOptions: React.FC<IPaymentBookingOptions> = ({
  isDisabled = false,
  creditCard,
  skippable,
  setShowAppointmentCardOption,
  showAppointmentCardOption,
}) => {
  const client = useClient();
  const session = client.auth.session;

  const { existingCard: appointmentPayment, setExistingCard } =
    useRequiredContext(BookingContext);

  const [showClearPaymentMethodWarning, setShowClearPaymentMethodWarning] =
    useState<boolean>(false);

  const handleUsePaymentOnRecord = useCallback(() => {
    const showWarningOnSwitch =
      !!appointmentPayment &&
      (!creditCard ||
        appointmentPayment.paymentToken !== creditCard.paymentToken);

    if (!showWarningOnSwitch) {
      setShowAppointmentCardOption(false);
      return;
    }
    setShowClearPaymentMethodWarning(true);
  }, [appointmentPayment, creditCard]);

  const handleConfirmPaymentSwitch = useCallback(() => {
    setShowAppointmentCardOption(false);
    setExistingCard(null);
    setShowClearPaymentMethodWarning(false);
  }, []);

  const title = useMemo(() => {
    if (!skippable) {
      return "Payment method";
    }
    if (!creditCard) {
      return "You can add a credit card to your Next Practice account to make future payments easier";
    }
    return "Is your card up to date?";
  }, [skippable, creditCard]);

  const recordCardLabel = creditCard
    ? "Use the card on your record"
    : "Add a new card to your record";

  return (
    <Disable disabled={isDisabled}>
      <BookingSectionTitle>{title}</BookingSectionTitle>
      {!skippable && session && (
        <BookingOptions>
          <BookingOption
            selected={!showAppointmentCardOption}
            onSelect={handleUsePaymentOnRecord}
          >
            {recordCardLabel}
          </BookingOption>
          <BookingOption
            selected={showAppointmentCardOption}
            onSelect={() => setShowAppointmentCardOption(true)}
          >
            Use a different card for this appointment
          </BookingOption>
        </BookingOptions>
      )}

      <Modal
        open={showClearPaymentMethodWarning}
        onClose={() => setShowClearPaymentMethodWarning(false)}
      >
        <ModalHeader>Please confirm</ModalHeader>
        <ModalBody>If you proceed your payment detail will be reset.</ModalBody>
        <ModalFooter
          onCancel={() => setShowClearPaymentMethodWarning(false)}
          onAccept={handleConfirmPaymentSwitch}
          acceptLabel="Proceed"
        />
      </Modal>
    </Disable>
  );
};
