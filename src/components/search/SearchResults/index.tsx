import { SearchContext } from "next-react/src/contexts/SearchContext";
import { useRequiredContext } from "next-react/src/hooks/useRequiredContext";
import * as React from "react";
import { PendingContent } from "../../structure/PendingContent";

import { SearchResultsAppointmentTypes } from "../SearchResultsAppointmentTypes";
import { SearchResultsHcps } from "../SearchResultsHcps";
import { SearchResultsLocations } from "../SearchResultsLocations";
import { SearchResultsSuburbs } from "../SearchResultsSuburbs";

/**
 * Collects, orders and displays search results as part of the next search
 * feature.
 */
export const SearchResults: React.FC = () => {
  const { isLoading, results: { displayOrder = [] } = {} } =
    useRequiredContext(SearchContext);

  // map from the field name in the results object and the result itself.
  const map = {
    hcps: <SearchResultsHcps key="hcps" />,
    locations: <SearchResultsLocations key="locations" />,
    appointmentTypes: <SearchResultsAppointmentTypes key="appointmentTypes" />,
  };

  return (
    <PendingContent check={!isLoading} isLocalised={true}>
      <SearchResultsSuburbs />
      {displayOrder
        // not showing appointment type results currently.
        .filter((x) => x !== "appointmentTypes")
        .map<JSX.Element>((name) => map[name])
        .filter((x) => !!x)}
    </PendingContent>
  );
};
