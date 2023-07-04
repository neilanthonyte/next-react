import * as React from "react";

import { SearchHandler } from ".";
import { NextAppHandlerWeb } from "../../components/handlers/NextAppHandlerWeb";
import { GeoContext } from "../../contexts/GeoContext";
import { SearchContext } from "../../contexts/SearchContext";
import { searchFiltersToNetworkSearchFilter } from "../../helpers/searchFiltersToNetworkSearchFilter";
import { useRequiredContext } from "../../hooks/useRequiredContext";
import {
  mockOutOfRangeSuburb,
  mockSearchFilters,
} from "next-shared/src/mockData/mockNetworkSearchData";
import { NextLocation } from "next-shared/src/models/NextLocation";
import { GeoHandler } from "../GeoHandler";

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      <GeoHandler>
        <SearchHandler>
          <Inner />
        </SearchHandler>
      </GeoHandler>
    </NextAppHandlerWeb>
  );
};

const Inner = () => {
  const { searchText, setSearchText } = useRequiredContext(SearchContext);
  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(evt.target.value);
  };
  return (
    <>
      <input type="text" value={searchText} onChange={handleOnChange} />
      <div className="debug">
        <SearchDebug />
      </div>
    </>
  );
};

const SearchDebug = () => {
  const {
    searchText,
    clearSearchText,
    isLoading,
    activeSuburb,
    setActiveSuburb,
    clearActiveSuburb,
    results,
    filters,
    setFilters,
    clearFilters,
    disregardGeoLocation,
    toggleDisregardGeoLocation,
  } = useRequiredContext(SearchContext);

  const { latLng } = useRequiredContext(GeoContext);

  return (
    <>
      <h4>Search text:</h4>
      <a onClick={clearSearchText}>clear search text</a>
      <pre>{JSON.stringify(searchText, null, 2)}</pre>
      <h4>Results:</h4>
      {/* <pre>{JSON.stringify(results, null, 2)}</pre> */}
      {!!results ? (
        <>
          Suburbs:
          <ul>
            {(results.suburbs || []).map((s) => (
              <li key={s.name}>{s.name}</li>
            ))}
          </ul>
          Hcps:
          <ul>
            {(results.hcps || []).map((s) => (
              <li key={s.fhirDisplayName}>{s.fhirDisplayName}</li>
            ))}
          </ul>
          Locations:
          <ul>
            {(results.locations || []).map((loc) => {
              const locDistance =
                NextLocation.unserialize(loc).getLocationsDistance(latLng);
              return (
                <li key={loc.title}>
                  {loc.title}
                  {latLng &&
                    locDistance &&
                    ` - Distance: ${locDistance.toFixed(2)}km`}
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p>no results</p>
      )}
      <h4>Disregard geo location:</h4>
      <a onClick={toggleDisregardGeoLocation}>toggle</a>
      <pre>{JSON.stringify(disregardGeoLocation, null, 2)}</pre>
      <h4>Active suburb:</h4>
      <a onClick={() => setActiveSuburb(mockOutOfRangeSuburb[0])}>
        set active suburb
      </a>
      {" - "}
      <a onClick={clearActiveSuburb}>clear active suburb</a>
      <pre>{JSON.stringify(activeSuburb, null, 2)}</pre>
      <h4>Filters:</h4>
      <a onClick={() => setFilters(mockSearchFilters)}>set filters</a>
      {" - "}
      <a onClick={clearFilters}>clear filters</a>
      <pre>{JSON.stringify(filters, null, 2)}</pre>
      <pre>
        {JSON.stringify(searchFiltersToNetworkSearchFilter(filters), null, 2)}
      </pre>
      <h4>Loading:</h4>
      <pre>{JSON.stringify(isLoading, null, 2)}</pre>
    </>
  );
};
