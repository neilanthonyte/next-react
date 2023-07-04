import * as React from "react";
import { useCallback, useMemo } from "react";

import {
  ICreditCard,
  IProvisionalCreditCard,
} from "next-shared/src/types/ICreditCard";
import { generateBlankCreditCardForGateway } from "next-shared/src/helpers/generateBlankCreditCardForGateway";
import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirPatientUtil } from "next-shared/src/fhirUtil/utilClasses/FhirPatientUtil";

import { CreditCardSummary } from "../../payments/CreditCardSummary";
import { useClient } from "../../../hooks/useClient";
import { usePatientPaymentsDetails } from "../../../hooks/patient/usePatientPaymentsDetails";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { MessageBody, WarningMessage } from "../../generic/Message";
import {
  IPayDockContextValue,
  PayDockContext,
} from "../../../contexts/PayDockContext";
import { PayDockCreditCardForm } from "../../payments/PayDockCreditCardForm";

export enum EPaymentDetailsPatientSource {
  Session = "session",
  Props = "props",
}

export interface IPatientPaymentDetailsProps {
  gatewayId?: string;
  patientSource: EPaymentDetailsPatientSource;
  patient?: fhir3.Patient;
  showInlineForm?: boolean;
}

/**
 * Component responsible for showing patient available payments and providing a Paydock Context
 */
export const PatientPaymentDetails: React.FC<IPatientPaymentDetailsProps> = ({
  gatewayId,
  patientSource,
  patient,
  showInlineForm = false,
}) => {
  if (patientSource === EPaymentDetailsPatientSource.Props && !patient) {
    console.error("Missing patient prop based on patientSource value");
    return null;
  }
  const client = useClient();
  // provides a synced patient
  const { nextPatient } = useSyncedSessionData();

  const patientId =
    patientSource === EPaymentDetailsPatientSource.Session
      ? nextPatient?.patientId
      : undefined;

  const {
    patientPaymentsDetails: { creditCards },
    ...patientPaymentsQueryRest
  } = usePatientPaymentsDetails(
    patientId,
    nextPatient?.paymentInformationUpdatedAt,
  );

  // check if gatewayId is passed and if there is a card in the list for it
  const gatewayCards = useMemo(() => {
    if (!creditCards) return;
    if (!gatewayId) return creditCards;

    // we have a gateway, filter cards
    const filteredCards = creditCards.filter(
      (cc) => cc.gatewayId === gatewayId,
    );

    // if not in the list already, add
    if (filteredCards.length === 0) {
      const blankCard = generateBlankCreditCardForGateway(gatewayId);
      filteredCards.push(blankCard);
    }

    return filteredCards;
  }, [creditCards, gatewayId]);

  const handleOnSetCard = useCallback(
    async (card: IProvisionalCreditCard) => {
      if (!patientId) {
        throw new Error("Missing patient details");
      }
      if (!card?.cardToken) {
        throw new Error("Missing missing card details");
      }
      // update the patient's credit card
      await client.payments.setPaymentMethod(patientId, card.cardToken);
      // this should auto-update the screen care of sockets
    },
    [patientId],
  );

  const paydockContextValue = useMemo<IPayDockContextValue>(() => {
    if (
      (patientSource === EPaymentDetailsPatientSource.Props && !patient) ||
      (patientSource === EPaymentDetailsPatientSource.Session && !nextPatient)
    ) {
      return;
    }

    const contextGatewayId =
      gatewayCards?.length === 1 ? gatewayCards[0].gatewayId : gatewayId;

    if (!patient) {
      return {
        gatewayId: contextGatewayId,
        prefillData: {
          email: nextPatient.getFhirEmail(),
          nameOnCard: nextPatient.getDisplayName(),
        },
      };
    }
    const fhirPatientUtil = fhirUtil<FhirPatientUtil>(patient);
    return {
      gatewayId: contextGatewayId,
      prefillData: {
        email: fhirPatientUtil.getPrimaryEmail(),
        nameOnCard: fhirPatientUtil.getDisplayName(),
      },
    };
  }, [patient, patientSource, nextPatient, gatewayId, gatewayCards]);

  // if we have no cards, we have no reference to any locations
  if (gatewayCards?.length === 0) {
    return (
      <WarningMessage>
        <MessageBody>
          You cannot set a credit card at this time. Please book an appointment
          at one of our clinics first.
        </MessageBody>
      </WarningMessage>
    );
  }

  // if we have more than one card, we do not support this for now
  if (gatewayCards?.length > 1) {
    return (
      <WarningMessage>
        <MessageBody>
          You cannot update your cards at this time. You will be able to do so
          when you book an appointment with your clinic.
        </MessageBody>
      </WarningMessage>
    );
  }

  const creditCard = gatewayCards ? gatewayCards[0] : undefined;

  // if we have no cards (excluding the generated empty placeholder one if a getaway if passed in)
  const showForm = !creditCard?.cardNumberLast4 && showInlineForm;

  return (
    <LoadingBlock {...patientPaymentsQueryRest}>
      <PayDockContext.Provider value={paydockContextValue}>
        {showForm ? (
          <PayDockCreditCardForm onSuccess={handleOnSetCard} />
        ) : (
          <CreditCardSummary card={creditCard} onSetCard={handleOnSetCard} />
        )}
      </PayDockContext.Provider>
    </LoadingBlock>
  );
};
