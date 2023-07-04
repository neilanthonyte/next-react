import * as React from "react";
import { useState } from "react";

import { ICmsSubscription } from "next-shared/src/types/ICmsSubscription";

import { useActiveLocation } from "../../../../../hooks/core/useActiveLocation";
import { useClient } from "../../../../../hooks/useClient";
import { useSyncedSessionData } from "../../../../../hooks/core/useSyncedSessionData";
import { CreatePatientSubscriptionModal } from "../../../../modals/CreatePatientSubscriptionModal";
import { NoDataFallback } from "../../../../structure/NoDataFallback";
import { VStack } from "../../../../structure/VStack";
import { PayDockSubscriptionCard } from "../../../../subscriptions/PayDockSubscriptionCard";
import { LoadingBlock } from "../../../../structure/LoadingBlock";
import { usePatientPaymentDetailsForGatewayId } from "../../../../../hooks/patient/usePatientPaymentDetailsForGatewayId";

export interface ISubscriptionsPanelProps {}

/**
 * Component showing subscriptions for the Next patient in session and handling setup of available ones in the current ehr
 */
export const SubscriptionsPanel: React.FC<ISubscriptionsPanelProps> = ({}) => {
  const client = useClient();
  const { nextPatient } = useSyncedSessionData();
  const { activeLocation: currentLocation } = useActiveLocation();

  const [selectSubscriptionModal, setSubscriptionModal] =
    useState<boolean>(false);

  const {
    patientPaymentDetails: { subscription },
    ...patientPaymentsQueryRest
  } = usePatientPaymentDetailsForGatewayId(
    nextPatient?.patientId,
    currentLocation?.paydockServiceId,
    currentLocation?.slug,
  );

  const availableSubscriptions =
    currentLocation && currentLocation.subscriptions;

  const allowPayments = currentLocation && currentLocation.paydockServiceId;

  const canCreateSubscription =
    availableSubscriptions &&
    allowPayments &&
    !subscription &&
    nextPatient?.paydockCustomerId;

  const existingSubscription =
    nextPatient && nextPatient.subscriptions && nextPatient.subscriptions[0];

  const handlePickSubscription = async (subscription: ICmsSubscription) => {
    if (existingSubscription || !subscription) {
      await client.payments.cancelSubscription(nextPatient.patientId);
    }
    if (subscription) {
      await client.payments.createSubscription(
        nextPatient.patientId,
        subscription.uuid,
      );
    }
    await patientPaymentsQueryRest.refetch();
    setSubscriptionModal(false);
  };

  // if no next patient or no available subscriptions in location return a filler div
  // if (!nextPatient || !availableSubscriptions) return <div />;

  return (
    <VStack size="compact">
      <h4>Subscriptions</h4>
      <LoadingBlock {...patientPaymentsQueryRest}>
        {subscription ? (
          <PayDockSubscriptionCard
            subscription={subscription}
            onChange={() => setSubscriptionModal(true)}
          />
        ) : (
          <NoDataFallback
            message={
              nextPatient
                ? nextPatient.paydockCustomerId
                  ? "No active subscriptions"
                  : "No cards saved on patient record"
                : "Patient not signed up"
            }
            actions={
              canCreateSubscription && [
                {
                  label: "Create subscription",
                  onClick: () => setSubscriptionModal(true),
                },
              ]
            }
          />
        )}
        {selectSubscriptionModal && (
          <CreatePatientSubscriptionModal
            patient={nextPatient}
            availableSubscriptions={availableSubscriptions}
            handlePickSubscription={handlePickSubscription}
            close={() => setSubscriptionModal(false)}
          />
        )}
      </LoadingBlock>
    </VStack>
  );
};
