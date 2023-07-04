import { useMemo } from "react";

import { IPatientPaymentDetails } from "next-shared/src/types/IPatientPaymentDetails";
import { unixTimestamp } from "next-shared/src/types/dateTypes";

import {
  IUsePatientPaymentsDetails,
  usePatientPaymentsDetails,
} from "../usePatientPaymentsDetails";

interface IPatientPaymentDetailsForGatewayId
  extends Omit<IUsePatientPaymentsDetails, "patientPaymentsDetails"> {
  patientPaymentDetails: IPatientPaymentDetails;
}

/**
 * Hook handling fetching of patient payment details and filtering down to a given gatewayId (location)
 */
export const usePatientPaymentDetailsForGatewayId = (
  patientId: string,
  gatewayId: string,
  /** required for subscriptions - typically the same as the CMS slug */
  gatewayName: string,
  lastPaymentUpdatedAt?: unixTimestamp,
): IPatientPaymentDetailsForGatewayId => {
  const { patientPaymentsDetails, ...rest } = usePatientPaymentsDetails(
    patientId,
    lastPaymentUpdatedAt,
  );

  // for now, assume 1 payment method and 1 subscription per gatewayId
  const patientPaymentDetails = useMemo<IPatientPaymentDetails>(() => {
    if (!patientPaymentsDetails) return;

    const gatewayCreditCards = (
      patientPaymentsDetails.creditCards || []
    ).filter((cc) => cc.gatewayId === gatewayId);

    const gatewaySubscriptions = (
      patientPaymentsDetails.subscriptions || []
    ).filter((sub) => sub?.gateway_name === gatewayName);

    return {
      creditCard: gatewayCreditCards.length ? gatewayCreditCards[0] : null,
      subscription: gatewaySubscriptions.length
        ? gatewaySubscriptions[0]
        : null,
    };
  }, [patientPaymentsDetails, gatewayId, gatewayName]);

  return useMemo<IPatientPaymentDetailsForGatewayId>(
    () => ({
      patientPaymentDetails,
      ...rest,
    }),
    [patientPaymentDetails, rest],
  );
};
