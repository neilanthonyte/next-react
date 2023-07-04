import * as React from "react";
import { useCallback } from "react";
import { useMemo } from "react";

import { Icon } from "../../generic/Icon";
import { GeoContext } from "../../../contexts/GeoContext";
import { SearchContext } from "../../../contexts/SearchContext";
import { useRequiredContext } from "../../../hooks/useRequiredContext";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "SearchLocation");

/**
 * Next search feature location toggle.
 * Allows users to base their search results from a particular location.
 * This can either be their current location, or a chosen suburb.
 */
export const SearchLocationToggle = () => {
  const {
    activeSuburb,
    clearActiveSuburb,
    disregardGeoLocation,
    toggleDisregardGeoLocation,
  } = useRequiredContext(SearchContext);
  const { latLng, setByBrowser } = useRequiredContext(GeoContext);

  const locationOnClick = useCallback(() => {
    if (activeSuburb) {
      clearActiveSuburb();
    } else if (latLng) {
      toggleDisregardGeoLocation();
    } else {
      disregardGeoLocation ? toggleDisregardGeoLocation() : setByBrowser();
    }
  }, [activeSuburb, clearActiveSuburb, latLng, setByBrowser]);

  const isActive = useMemo(
    () => !!activeSuburb || !!latLng,
    [activeSuburb, latLng],
  );

  return (
    <div
      className={css("", {
        "-color-active": isActive,
      })}
      onClick={locationOnClick}
      data-test={`filter-location${isActive ? "-active" : ""}`}
    >
      <Icon
        name="position"
        className={css("icon", {
          "-color-active": isActive,
        })}
      />
      <span className={css("text")}>
        {activeSuburb
          ? `Near ${activeSuburb.postcode}`
          : latLng
          ? "Near Me"
          : "Use Location"}
      </span>
    </div>
  );
};
