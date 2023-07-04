import * as React from "react";
import { useMemo, useCallback, useState } from "react";
import { useMutation } from "react-query";

import {
  ICreditCard,
  IProvisionalCreditCard,
} from "next-shared/src/types/ICreditCard";
import { createGuid } from "next-shared/src/helpers/guid";

import { useRequiredContext } from "../../../hooks/useRequiredContext";
import {
  BookingContext,
  BOOKING_STAGES,
} from "../../../contexts/AppointmentBookingContext";
import { PayDockCreditCardForm } from "../../payments/PayDockCreditCardForm";
import { VStack } from "../../structure/VStack";
import { CreditCardSummary } from "../../payments/CreditCardSummary";
import { DialogFooter } from "../../structure/Dialog";
import { creditCardIsExpired } from "../../../helpers/creditCardIsExpired";
import { useClient } from "../../../hooks/useClient";
import { Message, MessageBody } from "../../generic/Message";
import { LoadingBlock } from "../../structure/LoadingBlock";
import {
  ModalBody,
  ModalHeader,
  Modal,
  ModalFooter,
} from "../../structure/Modal";
import { BookingSection } from "../BookingSection";
import { AppointmentTypeTable } from "../../atoms/AppointmentTypeTable";
import { usePatientPaymentDetailsForGatewayId } from "../../../hooks/patient/usePatientPaymentDetailsForGatewayId";
import { BookingPayDockHandler } from "../BookingPayDockHandler";
import { Disable } from "../../generic/Disable";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "BookingPayment");

interface IBookingPaymentProps {
  // callback on success
  onSuccess?: () => void;
}

/**
 * Renders payment options for bookings depending on appointment type and patient payment methods on record
 */
export const BookingPayment: React.FC<IBookingPaymentProps> = ({
  onSuccess,
}) => {
  const {
    appointmentType,
    setStage,
    setExistingCard,
    setNewCard,
    newCard,
    location,
  } = useRequiredContext(BookingContext);

  const client = useClient();
  const { nextPatient } = useSyncedSessionData();
  const [formKey, setFormKey] = useState<string>(createGuid());

  const {
    patientPaymentDetails: { creditCard: loggedInUserCard },
    error,
    isLoading: isLoadingPayments,
    refetch: fetchPaymentsDetails,
  } = usePatientPaymentDetailsForGatewayId(
    nextPatient?.patientId,
    location?.paydockServiceId,
    location?.slug,
    nextPatient?.paymentInformationUpdatedAt,
  );

  // remember if we want to skip to the next section once the card is successfully set -
  // this logic is complicated by the need to handle errors, i.e. we still want to jump
  // to the next section after retrying an error
  const [skipToNextSection, setSkipToNextSection] = useState<boolean>(false);

  const [updateCardForLoggedInUser] = useMutation<
    void,
    Error,
    IProvisionalCreditCard
  >(
    (card: IProvisionalCreditCard) => {
      if (!nextPatient?.patientId) {
        console.warn("trying to update card without patient");
        return;
      }
      if (!card?.cardToken) {
        console.warn("trying to update card without token");
        return;
      }

      // update the patient's credit card
      return client.payments.setPaymentMethod(
        nextPatient?.patientId,
        card?.cardToken,
      );
    },
    {
      onSuccess: async () => {
        setErrorCard(null);
        if (skipToNextSection) {
          next();
        }
      },
      onError: (e, card) => {
        setErrorCard(card);
      },
    },
  );

  // used to wait until the update and refetch of logged in patient cc details are completed
  const [isUpdatingPayment, setIsUpdatingPayment] = useState<boolean>(false);

  // used for retry in case of error
  const [errorCard, setErrorCard] = useState<ICreditCard>(null);

  const skippable = !appointmentType?.requireCreditCard();

  const paymentInfoMessage = useMemo<string>(() => {
    if (!appointmentType) return;
    if (skippable) {
      if (loggedInUserCard) {
        return "Your card is securely saved for easy payment at the end of your appointment.";
      }
      return `You can optionally add your payment details now to make it easier to pay after the appointment. You will not be charged without consent.`;
    }
    if (appointmentType.deposit > 0) {
      return `This appointment requires a deposit of $${appointmentType.deposit.toFixed(
        2,
      )}. You will be charged when you complete the booking.`;
    }
    return "This appointment requires a valid credit card to be booked. No charges will be applied at the time of booking.";
  }, [appointmentType, skippable, loggedInUserCard]);

  const handleUpdatePaymentMethod = useCallback(
    async (card: IProvisionalCreditCard, saveToRecord: boolean) => {
      setIsUpdatingPayment(true);

      if (saveToRecord) {
        // update card on record
        await updateCardForLoggedInUser(card);
      } else {
        // put against the appointment only
        setNewCard(card);
        // clear existing just in case
        setExistingCard(null);
      }
      setIsUpdatingPayment(false);
    },
    [updateCardForLoggedInUser],
  );

  // handles advancement to next step.
  const next = useCallback(() => {
    onSuccess && onSuccess();
    setStage(BOOKING_STAGES.Review);
  }, [setStage, onSuccess]);

  // set the card to the current users
  const setCardAndNext = () => {
    if (!newCard && loggedInUserCard) {
      setExistingCard(loggedInUserCard);
    }
    next();
  };

  // do not use a card
  const clearCardAndNext = () => {
    setExistingCard(null);
    setNewCard(null);
    next();
  };

  // called when adding a new card via the form
  const onCardFormSuccess = async (
    card: IProvisionalCreditCard,
    saveToRecord: boolean,
  ) => {
    setSkipToNextSection(true);
    await handleUpdatePaymentMethod(card, saveToRecord);
  };

  // called when updating the card using the card summary
  const onCardSummarySuccess = async (
    card: IProvisionalCreditCard,
    saveToRecord: boolean,
  ) => {
    setSkipToNextSection(false);
    await handleUpdatePaymentMethod(card, saveToRecord);
  };

  const renderPaymentOptionsContent = useCallback(() => {
    // take the card from the booking or default to the user's card
    const card = newCard || loggedInUserCard;
    const ccExpired = creditCardIsExpired(card);

    const cardDisclaimer =
      card === newCard
        ? "This credit card will only be used for any charges related to this appointment."
        : null;

    const isProcessing = Boolean(isUpdatingPayment || errorCard);

    return (
      <BookingSection>
        <Disable disabled={isProcessing} showSpinner={true}>
          {cardDisclaimer && (
            <p className={css("disclaimer")}>{cardDisclaimer}</p>
          )}
          {card ? (
            <>
              <CreditCardSummary
                card={card}
                onSetCard={onCardSummarySuccess}
                includeSaveToRecord={!!nextPatient}
              />
              <DialogFooter
                acceptLabel="Next"
                onAccept={setCardAndNext}
                acceptDisabled={ccExpired}
                cancelLabel="Skip"
                onCancel={skippable ? clearCardAndNext : null}
              />
            </>
          ) : (
            <PayDockCreditCardForm
              onSuccess={onCardFormSuccess}
              onSkip={skippable ? next : null}
              key={formKey}
              includeSaveToRecord={!!nextPatient}
            />
          )}
        </Disable>
        {errorCard && (
          <Modal open={true} onClose={() => setErrorCard(null)}>
            <ModalHeader>Error</ModalHeader>
            <ModalBody>
              <p>An error occurred while updating your payments information.</p>
            </ModalBody>
            <ModalFooter
              onAccept={() => updateCardForLoggedInUser(errorCard)}
              acceptLabel="Retry"
              onCancel={() => {
                setErrorCard(null);
                setFormKey(createGuid());
              }}
            />
          </Modal>
        )}
      </BookingSection>
    );
  }, [
    newCard,
    loggedInUserCard,
    skippable,
    next,
    handleUpdatePaymentMethod,
    isUpdatingPayment,
    errorCard,
    updateCardForLoggedInUser,
  ]);

  const isLoading = !appointmentType || isLoadingPayments;

  return (
    <BookingPayDockHandler>
      <BookingSection>
        <VStack>
          {skippable && !loggedInUserCard && (
            <p>
              If you do not have time, you can{" "}
              <a onClick={next}>skip this step &gt;</a>
            </p>
          )}
          <LoadingBlock
            isLoading={isLoading}
            message="Loading appointment payment details"
            refetch={async () => await fetchPaymentsDetails()}
            error={error}
          >
            {!isLoading && (
              <>
                {paymentInfoMessage && (
                  <Message>
                    <MessageBody>{paymentInfoMessage}</MessageBody>
                    {appointmentType.price > 0 && (
                      <AppointmentTypeTable type={appointmentType} />
                    )}
                  </Message>
                )}
                {renderPaymentOptionsContent()}
              </>
            )}
          </LoadingBlock>
        </VStack>
      </BookingSection>
    </BookingPayDockHandler>
  );
};
