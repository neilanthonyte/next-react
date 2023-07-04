import * as React from "react";
import { useMemo } from "react";

import { BookingProvider } from "../../components/appointment-bookings/BookingProvider";
import { useRequiredContext } from "../../hooks/useRequiredContext";
import {
  BookingContext,
  IAppointmentBookingPreselection,
} from "../../contexts/AppointmentBookingContext";
import {
  FlowSummary,
  FlowSummaryDestopHeader,
  FlowSummaryExpanded,
  FlowInlineSummaryMobile,
  FlowSummaryOffset,
} from "../../components/structure/FlowSummary";
import { Button } from "../../components/generic/Button";
import { AppointmentFlow } from "../../components/appointment-bookings/AppointmentFlow";
import { GeoHandler } from "../../handlers/GeoHandler";
import { AppointmentSelectionSummary } from "../../components/appointment-bookings/AppointmentSelectionSummary";
import { NextAppHandlerWeb } from "../../components/handlers/NextAppHandlerWeb";
import { AppointmentPopover } from "../../components/appointment-bookings/AppointmentPopover";
import { ISlotWithHcp } from "next-shared/src/types/ISlotWithHcp";
import { useParsedHash } from "../../hooks/useParsedHash";

interface IBackLink {
  path: string;
  label?: string;
}

interface IAppointmentInlineProps {
  allowLogin?: boolean;
  /** Sets a back path that will be navigated when clicking on the back button */
  backLink?: IBackLink;
  /** Instead of providing a backLink, a callback may also be provided. These are mutually exclusive. */
  onBack?: () => void;
}

const AppointmentInline: React.FC<IAppointmentInlineProps> = ({
  allowLogin,
  backLink,
  onBack,
}) => {
  const { clear, selectionHasBeenMade } = useRequiredContext(BookingContext);

  const back = useMemo(() => {
    return backLink ? (
      // for website support - take back to location/hcp page
      <Button to={backLink.path} forceLink={true}>
        {backLink.label || "Back"}
      </Button>
    ) : onBack ? (
      <Button onClick={onBack}>Back</Button>
    ) : (
      <Button onClick={clear} shouldConfirm={true}>
        Cancel
      </Button>
    );
  }, [backLink, onBack, clear]);

  return (
    <>
      <AppointmentFlow allowLogin={allowLogin} />
      <FlowSummaryOffset />
      <FlowSummary toggleSummary={true} open={selectionHasBeenMade}>
        <FlowSummaryDestopHeader>{back}</FlowSummaryDestopHeader>
        <FlowSummaryExpanded>
          <AppointmentSelectionSummary />
        </FlowSummaryExpanded>
        <FlowInlineSummaryMobile>{back}</FlowInlineSummaryMobile>
      </FlowSummary>
    </>
  );
};

export interface IBookingWidgetProps {
  allowLogin?: boolean;
  locationSlug?: string;
  hcpSlug?: string;
  appointmentTypeSlug?: string;
  slot?: ISlotWithHcp;
  onCompleteDismiss?: () => any;
  onBookingSuccess?: (locationSlug: string) => void;
  children?: any;
  /** Sets a back path that will be navigated when clicking on the back button */
  backLink?: IBackLink;
  /** Instead of providing a backLink, a callback may also be provided. These are mutually exclusive. */
  onBack?: () => void;
  covidRisk?: boolean;
  /** A window URL hash value to wait for */
  hash?: string;
  /** Makes the widget show over the top of the page */
  popover?: boolean;
  /** Force the flow into guest mode */
  guestMode?: boolean;
}

/**
 * Filters the supplied object for properties that are defined.
 * Useful if you're using spreads and a property has been explicitly set to undefined.
 * TODO write a couple of tests and move it into a utility function
 * @param obj an object with potentially undefined members
 * @returns a new object with any properties that were undefined removed
 */
function filterDefinedProperties<T>(
  obj: Record<string, T | undefined>,
): Record<string, T> {
  const filtered: Record<string, T> = {};
  for (const property of Object.keys(obj)) {
    if (obj[property] !== undefined) {
      filtered[property] = obj[property];
    }
  }
  return filtered;
}

export const BookingWidget: React.FC<IBookingWidgetProps> = ({
  locationSlug,
  hcpSlug,
  appointmentTypeSlug,
  slot,
  onCompleteDismiss,
  onBookingSuccess,
  allowLogin = true,
  backLink,
  onBack,
  covidRisk,
  popover,
  children,
  guestMode,
  hash,
}) => {
  const parsedHash = useParsedHash();

  // limit to showing when a hash is provided
  const matchesHash = hash in parsedHash;
  // popover when requested or when using hash mode
  const asPopover =
    typeof popover !== "undefined" || typeof hash !== "undefined";
  // show when not using a hash or when the hash matches
  const showPopover = typeof hash !== "undefined" ? matchesHash : popover;

  const location = locationSlug || parsedHash.locationSlug?.[0]?.toString();
  const hcp = hcpSlug || parsedHash.hcpSlug?.[0]?.toString();
  const appointmentType =
    appointmentTypeSlug || parsedHash.appointmentType?.[0]?.toString();

  const preselection: IAppointmentBookingPreselection = useMemo(
    () =>
      filterDefinedProperties({
        location,
        hcp,
        appointmentType,
        slot,
      }),
    [location, hcp, appointmentType, slot],
  );

  // 'backLink' and 'onBack' are mutually exclusive.
  if (backLink && onBack) {
    throw new Error(
      "Cannot provide both a backLink and onBack to AppointmentBookingApp.",
    );
  }

  // avoid loading if not needed (avoids the prefetch)
  if (asPopover && !showPopover) {
    return null;
  }

  return (
    <NextAppHandlerWeb>
      <GeoHandler>
        <BookingProvider
          preselection={preselection}
          onCompleteDismiss={onCompleteDismiss}
          onBookingSuccess={onBookingSuccess}
          covidRisk={covidRisk}
          guestMode={guestMode}
        >
          {asPopover ? (
            <AppointmentPopover isOpen={showPopover} onBack={onBack} />
          ) : (
            <AppointmentInline
              allowLogin={allowLogin}
              backLink={backLink}
              onBack={onBack}
            />
          )}
          {!!children && children}
        </BookingProvider>
      </GeoHandler>
    </NextAppHandlerWeb>
  );
};
