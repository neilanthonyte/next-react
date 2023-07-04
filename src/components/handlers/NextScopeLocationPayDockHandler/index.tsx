import * as React from "react";
import { useMemo } from "react";

import { useClient } from "../../../hooks/useClient";
import {
  IPayDockContextValue,
  PayDockContext,
} from "../../../contexts/PayDockContext";
import { FhirPersonUtil } from "next-shared/src/fhirUtil/utilClasses/FhirPersonUtil";
import { NextLocation } from "next-shared/src/models/NextLocation";
import { fhirUtil } from "next-shared/src/fhirUtil";
import { useLocations } from "../../../hooks/content/useLocations";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { useActiveLocation } from "../../../hooks/core/useActiveLocation";

export interface INextScopeLocationPayDockHandlerProps {}

/**
 * Pulls the paydock details from the location associated to the current scope.
 */
export const NextScopeLocationPayDockHandler: React.FC<
  INextScopeLocationPayDockHandlerProps
> = ({ children }) => {
  const client = useClient();
  const { nextPatient } = useSyncedSessionData();
  const { activeLocation: currentLocation } = useActiveLocation();

  const paydockValue: IPayDockContextValue = useMemo(() => {
    if (!client.auth.session) {
      console.warn("No session");
      return null;
    }
    if (!client.auth.session.appId) {
      console.warn("Require App session");
      return null;
    }
    if (!currentLocation) {
      console.warn("Unable to find current location");
      return null;
    }

    const value = {
      gatewayId: currentLocation?.paydockServiceId,
      prefillData: nextPatient
        ? {
            nameOnCard: fhirUtil<FhirPersonUtil>(
              nextPatient.fhir,
            ).getDisplayName(),
            email: fhirUtil<FhirPersonUtil>(nextPatient.fhir).getPrimaryEmail(),
          }
        : null,
    };
    return value;
  }, [currentLocation, nextPatient, client.auth.session]);

  return (
    <PayDockContext.Provider value={paydockValue}>
      {children}
    </PayDockContext.Provider>
  );
};
