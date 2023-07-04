import * as React from "react";
import { INetworkSearchResults } from "next-shared/src/types/INetworkSearchResults";
import { ISuburb } from "next-shared/src/types/ISuburb";
import { ISearchFilter } from "next-shared/src/types/ISearchFilter";

export interface IBookingSlugs {
  hcpSlug?: string;
  locationSlug?: string;
  appointmentTypeSlug?: string;
}

export interface ISearchContextValue {
  searchText: string;
  setSearchText: (text: string) => void;
  clearSearchText: () => void;
  filters: ISearchFilter[];
  setFilters: (filter: ISearchFilter[]) => void;
  clearFilters: () => void;
  results: INetworkSearchResults;
  activeSuburb: ISuburb;
  setActiveSuburb: (suburb: ISuburb) => void;
  clearActiveSuburb: () => void;
  isLoading: boolean;
  error: Error;
  fetchResults: () => Promise<INetworkSearchResults | void>;
  disregardGeoLocation: boolean;
  toggleDisregardGeoLocation: () => void;
  showBookingWidget: boolean;
  bookingSlugs: IBookingSlugs;
  initiateBooking: (slugs: IBookingSlugs) => void;
  abortBooking: () => void;
}

export const SearchContext = React.createContext<ISearchContextValue>({
  searchText: undefined,
  setSearchText: undefined,
  clearSearchText: undefined,
  filters: undefined,
  setFilters: undefined,
  clearFilters: undefined,
  results: undefined,
  activeSuburb: undefined,
  setActiveSuburb: undefined,
  clearActiveSuburb: undefined,
  isLoading: undefined,
  error: undefined,
  fetchResults: undefined,
  disregardGeoLocation: undefined,
  toggleDisregardGeoLocation: undefined,
  showBookingWidget: undefined,
  bookingSlugs: undefined,
  initiateBooking: undefined,
  abortBooking: undefined,
});
