import * as React from "react";
import { ErrorMessage, MessageTitle } from "../../generic/Message";

import { AppPatientFormView } from "../../views/AppPatientFormView";
import {
  IPayDockContextValue,
  PayDockContext,
} from "../../../contexts/PayDockContext";
import { useActiveLocation } from "../../../hooks/core/useActiveLocation";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";

/**
 * Component rendering onboard multi form wrapped in paydock context for companion app
 */
export const CompanionOnboardForm = () => {
  const { nextPatient } = useSyncedSessionData();
  const { activeLocation: currentLocation, ...locationsFetchRest } =
    useActiveLocation();

  const payDockContextValue = React.useMemo<IPayDockContextValue>(() => {
    const nameOnCard = nextPatient ? nextPatient.getDisplayName() : null;
    const email = nextPatient ? nextPatient.getFhirEmail() : null;
    return {
      gatewayId: currentLocation?.paydockServiceId,
      prefillData: { nameOnCard, email },
      ...locationsFetchRest,
    };
  }, [nextPatient, currentLocation, locationsFetchRest]);

  // TODO find a more reusable approach to handle this scenario
  if (currentLocation && !currentLocation.paydockServiceId) {
    console.error(
      `Location ${currentLocation.title} is missing paydock configuration. Paydock forms will not be loaded.`,
    );
  }

  const formName = currentLocation?.formSlugs?.onboard;

  return (
    <PayDockContext.Provider value={payDockContextValue}>
      {formName ? (
        <AppPatientFormView formSlug={formName} successPath="/profile" />
      ) : (
        <ErrorMessage>
          <MessageTitle>Location misconfigured</MessageTitle>
        </ErrorMessage>
      )}
    </PayDockContext.Provider>
  );
};
