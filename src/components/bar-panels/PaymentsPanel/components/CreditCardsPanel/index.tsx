import * as React from "react";
import { useMemo, useState } from "react";
import { useMutation } from "react-query";

import {
  ICreditCard,
  IProvisionalCreditCard,
} from "next-shared/src/types/ICreditCard";
import { Patient } from "next-shared/src/models/Patient";
import { IAppointmentWithDetails } from "next-shared/src/types/IAppointmentWithDetails";

import { useClient } from "../../../../../hooks/useClient";
import { useSyncedSessionData } from "../../../../../hooks/core/useSyncedSessionData";
import { CreditCardModal } from "../../../../modals/CreditCardModal";
import { OneTimePaymentModal } from "../../../../modals/OneTimePaymentModal";
import { CreditCardCard } from "../../../../payments/CreditCardCard";
import { NoDataFallback } from "../../../../structure/NoDataFallback";
import { VStack } from "../../../../structure/VStack";
import { LoadingBlock } from "../../../../structure/LoadingBlock";
import { useActiveLocation } from "../../../../../hooks/core/useActiveLocation";
import { ICellAction } from "../../../../structure/Cell";
import { usePatientPaymentDetailsForGatewayId } from "../../../../../hooks/patient/usePatientPaymentDetailsForGatewayId";
import { PayDockContext } from "../../../../../contexts/PayDockContext";

export enum EPaymentDetailsAction {
  Edit = "Edit",
  Charge = "Charge",
}

export interface IActivePaymentActionState {
  action: EPaymentDetailsAction;
  patient?: Patient;
  appointmentWithDetails?: IAppointmentWithDetails;
}

export interface IPatientCreditCardsPanelProps {}

/**
 * Component rendering credit card details associated to the Next patient record in session
 * and a list of available credit cards saved against upcoming appointments if any
 */
export const PatientCreditCardsPanel: React.FC<
  IPatientCreditCardsPanelProps
> = () => {
  const client = useClient();
  const { nextPatient, ehrPatient } = useSyncedSessionData();
  const { activeLocation: currentLocation } = useActiveLocation();

  if (currentLocation && !currentLocation.paydockServiceId) {
    console.warn(
      "EHR not setup to receive payments, missing paydock settings.",
    );
  }

  // TODO this will be replaced by new synced patient payment
  const { patientPaymentDetails, ...patientPaymentsQueryRest } =
    usePatientPaymentDetailsForGatewayId(
      nextPatient?.patientId,
      currentLocation?.paydockServiceId,
      currentLocation?.slug,
      nextPatient?.paymentInformationUpdatedAt,
    );

  const [setPatientPaymentMethod, {}] = useMutation(
    (creditCard: IProvisionalCreditCard) =>
      client.payments.setPaymentMethod(
        nextPatient?.patientId,
        creditCard.cardToken,
      ),
    {
      onSuccess: () => {
        setActivePaymentAction(null);
      },
    },
  );

  const [activePaymentAction, setActivePaymentAction] =
    useState<IActivePaymentActionState>(null);

  const patientCreditCardActions = useMemo<ICellAction[]>(() => {
    const actions: ICellAction[] = [
      {
        label: "Edit",
        onClick: () =>
          setActivePaymentAction({
            action: EPaymentDetailsAction.Edit,
          }),
        variant: "primary",
      },
    ];
    // only allow to charge if paydock is setup on patient and location
    if (nextPatient?.paydockCustomerId && currentLocation?.paydockServiceId) {
      actions.push({
        label: "Charge",
        onClick: () =>
          setActivePaymentAction({
            action: EPaymentDetailsAction.Charge,
            patient: nextPatient,
          }),
        variant: "secondary",
      });
    }
    return actions;
  }, [patientPaymentDetails, currentLocation, nextPatient]);

  const paydockContextValue = useMemo(() => {
    return {
      gatewayId: currentLocation?.paydockServiceId,
      prefillData: {
        nameOnCard:
          nextPatient?.getDisplayName() || ehrPatient?.getDisplayName(),
        email: nextPatient?.getFhirEmail() || ehrPatient?.getFhirEmail(),
      },
    };
  }, [nextPatient, ehrPatient, currentLocation]);

  const showPatientOneTimePaymentModal =
    activePaymentAction?.patient &&
    activePaymentAction.action === EPaymentDetailsAction.Charge;

  const showCreditCardModal =
    activePaymentAction &&
    activePaymentAction.action === EPaymentDetailsAction.Edit;

  return (
    <>
      <VStack size="compact">
        <h4>Patient Credit Card</h4>
        {nextPatient ? (
          <LoadingBlock {...patientPaymentsQueryRest}>
            {patientPaymentDetails?.creditCard ? (
              <>
                <CreditCardCard
                  card={patientPaymentDetails.creditCard}
                  actions={patientCreditCardActions}
                />
              </>
            ) : (
              <NoDataFallback
                message="No cards on record"
                actions={[
                  {
                    label: "Add a card",
                    onClick: () =>
                      setActivePaymentAction({
                        action: EPaymentDetailsAction.Edit,
                      }),
                  },
                ]}
              />
            )}
          </LoadingBlock>
        ) : (
          <NoDataFallback message="Patient not signed up" />
        )}
      </VStack>
      {showPatientOneTimePaymentModal && (
        <OneTimePaymentModal
          patient={activePaymentAction.patient}
          close={() => setActivePaymentAction(null)}
        />
      )}
      {showCreditCardModal && (
        <PayDockContext.Provider value={paydockContextValue}>
          <CreditCardModal
            onSuccess={(card) => setPatientPaymentMethod(card)}
            onClose={() => setActivePaymentAction(null)}
          />
        </PayDockContext.Provider>
      )}
    </>
  );
};
