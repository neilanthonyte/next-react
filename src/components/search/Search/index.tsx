import * as React from "react";

import { SearchNoResults } from "../SearchNoResults";
import { SearchResults } from "../SearchResults";
import { SearchBar } from "../SearchBar";

import styles from "./styles.scss";
import { useRequiredContext } from "next-react/src/hooks/useRequiredContext";
import { cssComposer } from "next-react/src/helpers/cssComposer";
import { SearchContext } from "next-react/src/contexts/SearchContext";
import { BookingWidget } from "next-react/src/entry/BookingWidget";
const css = cssComposer(styles, "Search");

/**
 * Next search component. Allows users to search for practitioners and
 * practices. Opens the booking widget upon selection.
 */
export const Search: React.FC = () => {
  const {
    showBookingWidget,
    bookingSlugs: { hcpSlug, locationSlug, appointmentTypeSlug },
    abortBooking,
  } = useRequiredContext(SearchContext);

  return (
    <div className={css("")} data-test="search">
      {showBookingWidget ? ( // HACK workaround for pre-fill behaviour
        <BookingWidget
          hcpSlug={hcpSlug}
          locationSlug={locationSlug}
          appointmentTypeSlug={appointmentTypeSlug}
          popover={showBookingWidget}
          onBack={abortBooking}
        />
      ) : null}
      <SearchBar />
      <SearchResults />
      <SearchNoResults />
    </div>
  );
};
