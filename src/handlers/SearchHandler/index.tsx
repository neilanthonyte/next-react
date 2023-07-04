import * as React from "react";
import { useMemo, useState, useCallback } from "react";

import {
  ISearchContextValue,
  SearchContext,
  IBookingSlugs,
} from "../../contexts/SearchContext";
import { useSearchResults } from "../../hooks/useSearchResults";
import { useRequiredContext } from "../../hooks/useRequiredContext";
import { GeoContext, IGeoContextValue } from "../../contexts/GeoContext";
import { searchFiltersToNetworkSearchFilter } from "../../helpers/searchFiltersToNetworkSearchFilter";
import {
  TErrorHandlingApproach,
  ErrorResolverContext,
} from "../../contexts/ErrorResolver";
import { NextLocationsContext } from "next-react/src/contexts/NextLocationsContext";
import { ISearchFilter } from "next-shared/src/types/ISearchFilter";
import { ISuburb } from "next-shared/src/types/ISuburb";
import { INetworkSearchResults } from "next-shared/src/types/INetworkSearchResults";
import { NextLocation } from "next-shared/src/models/NextLocation";
import { useLocations } from "../../hooks/content/useLocations";

const DISTANCE_RANGE = 50; // 50km

export interface ISearchHandlerProps {
  errorApproach?: TErrorHandlingApproach;
}
export const SearchHandler: React.FC<ISearchHandlerProps> = ({
  children,
  errorApproach = "modal",
}) => {
  const { resolveError } = useRequiredContext(ErrorResolverContext);
  const geoContextValue = useRequiredContext(GeoContext);
  const { locations } = useLocations();

  const [searchText, setSearchText] = useState<string>("");
  const [filters, setFilters] = useState<ISearchFilter[]>(null);
  const [activeSuburb, setActiveSuburb] = useState<ISuburb>(null);
  const [disregardGeoLocation, setDisregardGeoLocation] =
    useState<boolean>(false);

  const geoContextValueOverride = useMemo<IGeoContextValue>(() => {
    // active suburbs has precedence
    if (activeSuburb) {
      return { ...geoContextValue, latLng: activeSuburb.geo };
    }
    // if disregardGeoLocation flag, override clearing the latLng
    if (disregardGeoLocation === true) {
      return { ...geoContextValue, latLng: null };
    }
    // else use the parent / global context value
    return geoContextValue;
  }, [disregardGeoLocation, activeSuburb, geoContextValue]);

  const { isLoading, error, data, refetch } = useSearchResults(
    searchText,
    geoContextValueOverride.latLng,
    searchFiltersToNetworkSearchFilter(filters),
  );

  // filter results locations and hcps by distance if latLng set
  const results = useMemo<INetworkSearchResults>(() => {
    if (
      !data ||
      !geoContextValueOverride.latLng ||
      (data && data.locations.length === 0 && data.hcps.length === 0)
    ) {
      return data;
    }

    const isLocationInRange = (loc: NextLocation): boolean => {
      const locationDistance = loc.getLocationsDistance(
        geoContextValueOverride.latLng,
      );
      if (!locationDistance) {
        return false;
      }
      return locationDistance <= DISTANCE_RANGE;
    };

    const inRangeLocations = data.locations.filter(isLocationInRange);

    const inRangeHcps = data.hcps.filter((hcp) => {
      const worksAtLocation =
        locations && locations.find((loc) => loc.slug === hcp.worksAt);
      if (!worksAtLocation) {
        return;
      }
      return isLocationInRange(worksAtLocation);
    });

    // remove data type in display order if the new filtered arrays are empty
    const newDisplayOrder = [...data.displayOrder];
    if (inRangeHcps.length === 0 && newDisplayOrder.indexOf("hcps") !== -1) {
      newDisplayOrder.splice(newDisplayOrder.indexOf("hcps"), 1);
    }
    if (
      inRangeLocations.length === 0 &&
      newDisplayOrder.indexOf("locations") !== -1
    ) {
      newDisplayOrder.splice(newDisplayOrder.indexOf("locations"), 1);
    }

    return {
      ...data,
      locations: inRangeLocations,
      hcps: inRangeHcps,
      displayOrder: newDisplayOrder,
      hasResults: newDisplayOrder.length > 0,
    };
  }, [data, locations, geoContextValueOverride.latLng]);

  // search text utility methods
  const handleSetSearchText = useCallback((newSearchText: string) => {
    setSearchText(newSearchText);
  }, []);
  const handleClearSearchText = useCallback(() => {
    setSearchText("");
  }, []);

  // filters utility methods
  const handleSetFilters = useCallback((newFilters: ISearchFilter[]) => {
    setFilters(newFilters);
  }, []);
  const handleClearFilters = useCallback(() => {
    setFilters(null);
  }, []);

  // active suburb utility methods
  const handleSetActiveSuburb = useCallback((newActiveSuburb: ISuburb) => {
    setActiveSuburb(newActiveSuburb);
  }, []);
  const handleClearActiveSuburb = useCallback(() => {
    setActiveSuburb(null);
  }, []);

  const handleToggleDisregardGeoLocation = useCallback(() => {
    setDisregardGeoLocation((s) => !s);
  }, []);

  // default overridable error handling
  React.useEffect(() => {
    if (!error) return;
    resolveError({
      title: "Unable to retrieve search results.",
      retry: () => refetch(),
      approach: errorApproach,
    });
  }, [error, refetch, errorApproach, resolveError]);

  const [bookingSlugs, setBookingSlugs] = useState<IBookingSlugs>({});

  const showBookingWidget = Boolean(
    bookingSlugs.hcpSlug ||
      bookingSlugs.locationSlug ||
      bookingSlugs.appointmentTypeSlug,
  );

  const handleBookingInitiated = setBookingSlugs;
  const handleBookingAborted = useCallback(() => setBookingSlugs({}), []);

  const value: ISearchContextValue = useMemo(
    () => ({
      searchText,
      setSearchText: handleSetSearchText,
      clearSearchText: handleClearSearchText,
      filters,
      setFilters: handleSetFilters,
      clearFilters: handleClearFilters,
      results,
      activeSuburb,
      setActiveSuburb: handleSetActiveSuburb,
      disregardGeoLocation,
      toggleDisregardGeoLocation: handleToggleDisregardGeoLocation,
      clearActiveSuburb: handleClearActiveSuburb,
      isLoading,
      error,
      fetchResults: refetch,
      showBookingWidget,
      bookingSlugs,
      initiateBooking: handleBookingInitiated,
      abortBooking: handleBookingAborted,
    }),
    [
      searchText,
      filters,
      results,
      activeSuburb,
      disregardGeoLocation,
      isLoading,
      error,
      refetch,
      handleSetSearchText,
      handleClearSearchText,
      handleSetActiveSuburb,
      handleClearActiveSuburb,
      handleSetFilters,
      handleClearFilters,
      handleToggleDisregardGeoLocation,
      showBookingWidget,
      bookingSlugs,
      handleBookingInitiated,
      handleBookingAborted,
    ],
  );

  return (
    <SearchContext.Provider value={value}>
      <GeoContext.Provider value={geoContextValueOverride}>
        {children}
      </GeoContext.Provider>
    </SearchContext.Provider>
  );
};
