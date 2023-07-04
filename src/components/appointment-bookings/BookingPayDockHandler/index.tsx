import * as React from "react";

import { FhirPersonUtil } from "next-shared/src/fhirUtil/utilClasses/FhirPersonUtil";
import { fhirUtil } from "next-shared/src/fhirUtil";

import {
  IPayDockContextValue,
  PayDockContext,
} from "../../../contexts/PayDockContext";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { BookingContext } from "../../../contexts/AppointmentBookingContext";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";

export interface IBookingPayDockHandlerProps {
  shouldPrefill?: boolean;
}

export const BookingPayDockHandler: React.FC<IBookingPayDockHandlerProps> = ({
  children,
  shouldPrefill = true,
}) => {
  const { nextPatient } = useSyncedSessionData();
  const { location, patient: bookingPatient } =
    useRequiredContext(BookingContext);

  // shouldPrefill should be passed as false when a patient opts to enter a card for the appointment only
  // otherwise give precedence to logged in patient
  // or if not logged in and payment required, whatever details entered in the demographic form (patient from context)
  const prefillPatient = shouldPrefill
    ? nextPatient?.fhir || bookingPatient
    : null;

  const paydockValue: IPayDockContextValue = {
    gatewayId: location && location.paydockServiceId,
    prefillData: prefillPatient
      ? {
          nameOnCard: fhirUtil<FhirPersonUtil>(prefillPatient).getDisplayName(),
          email: fhirUtil<FhirPersonUtil>(prefillPatient).getPrimaryEmail(),
        }
      : null,
  };

  return (
    <PayDockContext.Provider value={paydockValue}>
      {children}
    </PayDockContext.Provider>
  );
};
