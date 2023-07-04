import * as React from "react";
import { useState, useMemo } from "react";

import { NextLocation } from "next-shared/src/models/NextLocation";

import { BookingContext } from "../../../../../contexts/AppointmentBookingContext";
import { useRequiredContext } from "../../../../../hooks/useRequiredContext";
import { ChooseLocation } from "../../../../generic/ChooseLocation";
import { ExternalBookingsModal } from "../../../../modals/ExternalBookingsModal";
import { NextLocationListing } from "../../../NextLocationListing";

export interface IAppointmentLocationsProps {}

/**
 * Component rendering a list of available location for booking
 * and handling external booking system scenarios
 */
export const AppointmentLocations: React.FC<
  IAppointmentLocationsProps
> = ({}) => {
  const { locations, setLocation } = useRequiredContext(BookingContext);

  const allLocations = useMemo(() => {
    // limit to clinics that support Next Practice bookings or have external booking system
    // there shouldnt be a third option but this would handles dome cms misconfiguration
    return (locations || []).filter(
      (l) => l.allowBookings || l.usesExternalBookings(),
    );
  }, [locations]);

  const [externalBookingsLocation, setExternalBookingsLocation] =
    useState<NextLocation>(null);

  const renderLocation = (location: NextLocation) => {
    // trust me, I'm a doctor
    const nextLocation = location;
    return (
      <NextLocationListing
        location={nextLocation}
        onClick={() => {
          if (nextLocation.usesExternalBookings()) {
            setExternalBookingsLocation(nextLocation);
            return;
          }
          setLocation(nextLocation);
        }}
      />
    );
  };

  return (
    <>
      <ChooseLocation
        locations={allLocations}
        renderLocation={renderLocation}
      />
      <ExternalBookingsModal
        location={externalBookingsLocation}
        onClose={() => setExternalBookingsLocation(undefined)}
        showLocationPageLink={true}
      />
    </>
  );
};
