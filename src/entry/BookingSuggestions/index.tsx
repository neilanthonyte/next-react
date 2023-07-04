import * as React from "react";
import { useEffect, useMemo, useState } from "react";

import { NextAppHandlerWeb } from "next-react/src/components/handlers/NextAppHandlerWeb";
import { List, ListItem } from "next-react/src/components/structure/List";
import { LoadingBlock } from "next-react/src/components/structure/LoadingBlock";
import { useAppointmentTypes } from "next-react/src/hooks/useAppointmentTypes";
import { AppointmentType } from "next-shared/src/models/AppointmentType";
import { ISlotWithHcp } from "next-shared/src/types/ISlotWithHcp";

import { AvailableSlots } from "../../components/appointment-bookings/AvailableSlots";

import { BookingWidget } from "../BookingWidget";

export interface IBookingSuggestionsProps {
  locationSlug: string;
  appointmentTypeSlugs: string[];
  hcpId?: string;
  hcpSlug?: string;
  disableWidget?: boolean;
  onSelection?: (
    appointmentType: AppointmentType,
    hcpSlug?: string,
    slot?: ISlotWithHcp,
  ) => any;
  onBookingAborted?: () => unknown;
  onBookingSuccess?: (locationSlug: string) => unknown;
}

/**
 * A widget that displays, as buttons, a list of upcomining appointments slots for a given:
 *
 * - location: shows all the featured appointments
 * - appointment type: shows all the HCPs offering said type
 * - HCP: shows all appointment types for said HCP
 */
export const BookingSuggestions: React.FC<IBookingSuggestionsProps> = (
  props,
) => {
  return (
    <NextAppHandlerWeb>
      <_BookingSuggestions {...props} />
    </NextAppHandlerWeb>
  );
};

const _BookingSuggestions: React.FC<IBookingSuggestionsProps> = ({
  locationSlug,
  appointmentTypeSlugs,
  hcpId,
  hcpSlug,
  onSelection,
  onBookingAborted,
  onBookingSuccess,
  disableWidget = false,
}) => {
  const [selection, setSelection] = useState<{
    appointmentType: AppointmentType;
    slot?: ISlotWithHcp;
  }>();

  const { data, isLoading, error, refetch } = useAppointmentTypes();
  const appointmentTypes = useMemo(() => {
    const slugIndexLookup = Object.fromEntries(
      appointmentTypeSlugs.map((slug, index) => [slug, index]),
    );
    // data is a big array, so performance is somewhat important here
    const types = (data || []).filter((t) =>
      slugIndexLookup.hasOwnProperty(t.slug),
    );
    // ordering needs to be based off appointmentTypeSlugs' ordering
    types.sort((a, b) => slugIndexLookup[a.slug] - slugIndexLookup[b.slug]);
    return types;
  }, [data, appointmentTypeSlugs]);

  const handleSelectionMade = (
    appointmentType: AppointmentType,
    slot: ISlotWithHcp,
  ) => {
    onSelection && onSelection(appointmentType, hcpSlug, slot);
    !disableWidget && setSelection({ appointmentType, slot });
  };

  const handleBookingAborted = () => {
    if (onBookingAborted) {
      // allow booking widget handling to be overridden
      onBookingAborted();
    } else {
      setSelection(undefined);
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-undef
    <LoadingBlock isLoading={isLoading}>
      {!isLoading && (
        <List variant="separator" scale="compact">
          {(appointmentTypes || []).map((t) => (
            <ListItem key={t.slug}>
              <AvailableSlots
                appointmentType={t}
                hcpId={hcpId}
                onSelection={handleSelectionMade}
              />
            </ListItem>
          ))}
        </List>
      )}
      {!!selection && (
        <BookingWidget
          popover={true}
          locationSlug={locationSlug}
          appointmentTypeSlug={selection.appointmentType.slug}
          hcpSlug={hcpSlug}
          slot={selection.slot}
          onBack={handleBookingAborted}
          onBookingSuccess={() => onBookingSuccess(locationSlug)}
        />
      )}
    </LoadingBlock>
  );
};
