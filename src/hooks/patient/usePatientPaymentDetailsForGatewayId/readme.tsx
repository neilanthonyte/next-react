import * as React from "react";
import { useEffect, useState } from "react";

import { NextLocation } from "next-shared/src/models/NextLocation";

import { CreditCardCard } from "../../../components/payments/CreditCardCard";
import { HStack } from "../../../components/structure/HStack";
import { LoadingBlock } from "../../../components/structure/LoadingBlock";
import { NoDataFallback } from "../../../components/structure/NoDataFallback";
import { VStack } from "../../../components/structure/VStack";
import { PayDockSubscriptionCard } from "../../../components/subscriptions/PayDockSubscriptionCard";
import { useDebug } from "../../../debug/DemoWrapper";
import { useLocations } from "../../content/useLocations";
import { useSyncedSessionData } from "../../core/useSyncedSessionData";
import { usePatientPaymentDetailsForGatewayId } from ".";

export const DemoStandard = () => {
  const { setActions } = useDebug({
    requireSession: "patient",
    setSessionDebug: true,
  });

  const [activeLocation, setActiveLocation] = useState<NextLocation>();

  const { nextPatient } = useSyncedSessionData();
  const { locations } = useLocations();

  useEffect(() => {
    setActions(
      (locations || []).map((loc) => ({
        label: loc.title,
        action: () => setActiveLocation(loc),
      })),
    );
  }, [locations]);

  const { patientPaymentDetails } = usePatientPaymentDetailsForGatewayId(
    nextPatient?.patientId,
    activeLocation?.paydockServiceId,
    activeLocation?.slug,
    nextPatient?.paymentInformationUpdatedAt,
  );

  const { subscription, creditCard } = patientPaymentDetails || {};

  return (
    <VStack>
      {activeLocation
        ? `Active location: ${activeLocation?.title}`
        : "Pick a location"}
      <LoadingBlock isLoading={!patientPaymentDetails || !activeLocation}>
        <HStack>
          <NoDataFallback message="No cards stored at this location">
            {creditCard && (
              <CreditCardCard card={patientPaymentDetails?.creditCard} />
            )}
          </NoDataFallback>
          <NoDataFallback message="No subscriptions at this location">
            {subscription && (
              <PayDockSubscriptionCard
                subscription={patientPaymentDetails?.subscription}
              />
            )}
          </NoDataFallback>
        </HStack>
      </LoadingBlock>
    </VStack>
  );
};
