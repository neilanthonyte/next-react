import * as React from "react";
import { AltButton } from "../../generic/Button";
import { GeoContext } from "../../../contexts/GeoContext";

import { SearchContext } from "../../../contexts/SearchContext";
import { useRequiredContext } from "../../../hooks/useRequiredContext";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "SearchNoResults");

/**
 * Shows users when no results were found when using the Next search feature,
 * and provides actions to expand searching criteria.
 */
export const SearchNoResults: React.FC = () => {
  const {
    activeSuburb,
    clearActiveSuburb,
    disregardGeoLocation,
    results,
    searchText,
    toggleDisregardGeoLocation,
    isLoading,
  } = useRequiredContext(SearchContext);
  const { latLng, setByBrowser } = useRequiredContext(GeoContext);

  if (isLoading) {
    return null;
  }

  if (!(searchText && results && !results.hasResults)) {
    // not showing appointment type results currently.
    // so, return don't return null if only appointment type results are
    // returned.
    if (
      results &&
      !(
        results.appointmentTypes.length > 0 &&
        results.hcps.length === 0 &&
        results.hcps.length === 0 &&
        results.suburbs.length === 0
      )
    ) {
      return null;
    }
  }

  let noResultsText = "No results";
  let btnTxt = null;
  let btnOnClick = null;

  if (activeSuburb) {
    noResultsText += ` near ${activeSuburb.postcode}`;
    btnTxt = "Search near you";
    btnOnClick = () => {
      clearActiveSuburb();
      if (disregardGeoLocation) {
        toggleDisregardGeoLocation();
      }
      if (!latLng) {
        setByBrowser();
      }
    };
  } else if (latLng && !disregardGeoLocation) {
    noResultsText += " near your current location";
    btnTxt = "Search everywhere";
    btnOnClick = () => {
      clearActiveSuburb();
      toggleDisregardGeoLocation();
    };
  }

  return (
    <div className={css("")} data-test="search-no-result">
      <div>{noResultsText}</div>
      {btnTxt && (
        <AltButton className={css("button")} onClick={btnOnClick}>
          {btnTxt}
        </AltButton>
      )}
    </div>
  );
};
