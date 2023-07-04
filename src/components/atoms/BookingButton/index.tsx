import * as React from "react";
import { useState } from "react";

import { IButtonProps, Button } from "../../generic/Button";
import { NextLocation } from "next-shared/src/models/NextLocation";
import { ExternalBookingsModal } from "../../modals/ExternalBookingsModal";

export interface IBookingButtonProps extends IButtonProps {
  location: NextLocation;
  onBook?: (args?: any) => void;
}

/**
 * Wrapper component used to render a custom booking button based on the
 * location using an external booking system or the Next booking widget
 *
 * Used by LocationCards and Search Results
 */

export const BookingButton: React.FC<IBookingButtonProps> = (props) => {
  const [externalBookingsLocation, setExternalBookingsLocation] =
    useState<NextLocation>();
  const { children, location, onBook, ...buttonProps } = props;

  if (!location) {
    console.error("BookingButton expects a valid NextLocation");
    return null;
  }

  const bookingUrl =
    location.allowBookings && !onBook
      ? `#book&locationSlug=${location.slug}`
      : null;

  // early return if no onBook callback, no bookingUrl and not external
  if (!onBook && !bookingUrl && !location.usesExternalBookings()) {
    return null;
  }

  const handleOnClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setExternalBookingsLocation(location);
  };

  if (location.usesExternalBookings()) {
    return (
      <>
        <Button onClick={handleOnClick} {...buttonProps} variant="secondary">
          {children}
        </Button>
        <ExternalBookingsModal
          onClose={() => setExternalBookingsLocation(undefined)}
          location={externalBookingsLocation}
        />
      </>
    );
  }

  return (
    <Button onClick={onBook} to={bookingUrl} {...buttonProps} variant="primary">
      {children}
    </Button>
  );
};
