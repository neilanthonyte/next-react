import * as React from "react";
import { useState, useMemo } from "react";

import { FilterControl } from "../../generic/FilterControl";
import { LocationCard } from "../LocationCard";

import {
  Picker,
  PickerHeaderFilter,
  PickerBody,
  PickerFooter,
  PickerHeader,
} from "../../structure/Picker";
import { Button } from "../../generic/Button";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { Grid } from "../../structure/Grid";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { NextLocationsContext } from "../../../contexts/NextLocationsContext";
import { NextLocation } from "next-shared/src/models/NextLocation";

import { cloneModelObject } from "next-shared/src/helpers/cloneModelObject";
import { STATE_SELECTION_ALL } from "./constants";
import { useLocations } from "../../../hooks/content/useLocations";

export interface ILocationPickerProps {
  /**
   * An array of CMS locations, if this is an empty array AND the `selectedLocation` is of type `ILocation`,
   * then this component will not render a *change* button.
   */
  locations?: NextLocation[];
  onLocationSelected?: (location: NextLocation) => void;
  /**
   * If this prop exists, the location picker will display this location only.
   * If this prop is passed in, and the locations array is empty, this component will not give the option to change locations.
   */
  selectedLocation?: NextLocation;
  showAll?: boolean;
  previewAmount?: number;
  limit?: number;
  onlyBookable?: boolean;
}

export const NextLocationPicker: React.FC<ILocationPickerProps> = ({
  onLocationSelected,
  limit = -1,
  onlyBookable = true,
}) => {
  const { locations, isLoading } = useLocations();

  const [showAll, setShowAll] = useState(limit === -1);
  const [selectedState, setSelectedState] = useState(STATE_SELECTION_ALL);

  // filter based on whether we can book against a loation
  const bookableLocations: NextLocation[] = useMemo(() => {
    return (locations || []).filter((l) => !onlyBookable || l.allowBookings);
  }, [locations]);

  // filter based on state selection
  const filteredLocations: NextLocation[] = useMemo(() => {
    return bookableLocations.filter(
      (l) =>
        selectedState === STATE_SELECTION_ALL ||
        l.address.state === selectedState,
    );
  }, [bookableLocations, selectedState]);

  // trim the locations based on the limit and showAll status
  const trimmedLocations: NextLocation[] = useMemo(() => {
    return filteredLocations
      .slice(0, showAll ? filteredLocations.length : limit)
      .map((l) => {
        // HACK remove links if an onSelect is provided
        const loc = cloneModelObject(l);
        loc.url = onLocationSelected ? null : loc.url;
        return loc;
      });
  }, [filteredLocations, showAll]);

  // states for the bookable locations
  const australianStates = useMemo(() => {
    const uniqueStates = bookableLocations
      .map((l) => l.address.state)
      // unqiue values
      .filter((v, i, states) => states.indexOf(v) === i)
      // in order
      .sort();
    return [STATE_SELECTION_ALL, ...uniqueStates];
  }, [bookableLocations]);

  const isTrimmable = filteredLocations.length > limit;

  return (
    <LoadingBlock isLoading={isLoading}>
      {locations && (
        <Picker>
          <PickerHeader>
            <PickerHeaderFilter>
              <FilterControl
                condensed
                values={australianStates}
                selectedValue={selectedState}
                onClick={setSelectedState}
              />
            </PickerHeaderFilter>
          </PickerHeader>
          <PickerBody>
            <div data-test="locations">
              <Grid size="lg">
                {locations.map((loc) => (
                  <div data-test="location" key={loc.id}>
                    <LocationCard
                      key={loc.slug}
                      location={loc}
                      onSelect={
                        typeof onLocationSelected === "function"
                          ? () => onLocationSelected(loc)
                          : null
                      }
                    />
                  </div>
                ))}
              </Grid>
            </div>
          </PickerBody>
          <PickerFooter>
            <div data-test="show-more">
              {limit > -1 && (
                <Button
                  onClick={() => setShowAll(!showAll)}
                  disabled={!isTrimmable}
                >
                  {showAll ? "Show less" : "Show all"}
                </Button>
              )}
            </div>
          </PickerFooter>
        </Picker>
      )}
    </LoadingBlock>
  );
};
