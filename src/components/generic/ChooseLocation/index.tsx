import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { sortBy } from "lodash";
import { has } from "lodash";
import { flatten } from "lodash";

import { GeoContext } from "../../../contexts/GeoContext";
import { australianStates } from "../../../helpers/australianStates";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { List, ListItem } from "../../structure/List";
import {
  Block,
  BlockHeader,
  BlockBody,
  BlockTitle,
} from "../../structure/Block";
import { NextLocation } from "next-shared/src/models/NextLocation";
import { SearchInput } from "../SearchInput";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
export const css = cssComposer(styles, "ChooseLocation");

// At the moment we show the nearest 5 stores
const NEAREST_COUNT = 5;

// HACK - make the state directly available on the location
const locationInState = (loc: NextLocation, state: string) => {
  return loc.address?.fullAddress.includes(state);
};

export interface IChooseLocationProps {
  locations: NextLocation[];
  renderLocation: (location: NextLocation) => JSX.Element;
  locationsIsLoading?: boolean;
  locationsError?: Error;
  locationsRefetch?: () => any;
}

export const ChooseLocation: React.FC<IChooseLocationProps> = ({
  locations,
  renderLocation,
  locationsIsLoading = false,
  locationsError,
  locationsRefetch,
}) => {
  const [searchingClosestStores, setSearchingClosestStores] =
    useState<boolean>(false);
  const { latLng, setByPostcode, clearByPostcode } =
    useRequiredContext(GeoContext);

  const [postcode, setPostcode] = useState<string>("");

  const closestLocations = useMemo(() => {
    // TODO: had to change locations check to undefined. seems like sync data is initialised to that. we should think of making this consistent.
    // added null check as some handlers set to null while fetching
    if (locations === undefined || locations === null || latLng === null)
      return;
    // get a object containing slug and distance
    const locationDistances = locations
      .filter((l) => l.isOnline)
      .map((location) => {
        return {
          location,
          distance: location.getLocationsDistance(latLng),
        };
      });
    // filter by distance
    const sortedLocationsByDistance = sortBy(
      locationDistances,
      (l) => l.distance,
    );
    // retain only the nearest stores
    const closestStores = sortedLocationsByDistance.slice(0, NEAREST_COUNT);
    // return just the location model
    const locationsToDisplay = closestStores.map(
      (closestStore) => closestStore.location,
    );
    return locationsToDisplay;
  }, [locations, latLng]);

  useEffect(() => {
    // reset location selection when the post code search is cleared
    if (!postcode) {
      clearByPostcode();
      return;
    }
    // respond to valid postcodes...
    if (!postcode.match(/^\d{4}$/)) {
      return;
    }
    setSearchingClosestStores(true);
    setByPostcode(postcode).then(() => {
      setSearchingClosestStores(false);
    });
  }, [postcode]);

  // catch for locations without google place info (i.e. on dev or demo)
  const stateLocations = useMemo(() => {
    // using synced locations now fails without this check
    if (!locations) {
      return;
    }
    const states: { [name: string]: NextLocation[] } = {};
    australianStates.map((state) => {
      const stateLocations = locations.filter((l) =>
        locationInState(l, state.abbreviation),
      );
      if (stateLocations.length > 0) {
        states[state.name] = stateLocations;
      }
    });
    return states;
  }, [locations]);

  const unknownLocations: NextLocation[] = useMemo(() => {
    if (!locations) {
      return [];
    }
    const knownLocations = flatten(Object.values(stateLocations));
    return locations.filter((l) => knownLocations.indexOf(l) === -1);
  }, [stateLocations]);

  return (
    <LoadingBlock isLoading={locationsIsLoading}>
      {locationsError && <ErrorPlaceholder retry={locationsRefetch} />}
      {Array.isArray(locations) && (
        <div className={css("")}>
          <Block open={true}>
            <BlockHeader>
              <BlockTitle>Nearest</BlockTitle>
            </BlockHeader>
            <BlockBody>
              <SearchInput
                onChange={setPostcode}
                value={postcode}
                placeholder="Search by postcode..."
                pattern="[0-9]{0,4}"
              />
              <List>
                {(closestLocations || []).map((location) => (
                  <ListItem key={location.id}>
                    {renderLocation(location)}
                  </ListItem>
                ))}
              </List>
              <LoadingBlock isLoading={!!searchingClosestStores} size="lg" />
            </BlockBody>
          </Block>
          {Object.keys(stateLocations).map((name) => (
            <Block open={false} key={name}>
              <BlockHeader>
                <BlockTitle>{name}</BlockTitle>
              </BlockHeader>
              <BlockBody>
                <List>
                  {stateLocations[name].map((l) => (
                    <ListItem key={l.slug}>{renderLocation(l)}</ListItem>
                  ))}
                </List>
              </BlockBody>
            </Block>
          ))}
          {unknownLocations.length > 0 && (
            <Block open={false}>
              <BlockHeader>
                <BlockTitle>Unsorted</BlockTitle>
              </BlockHeader>
              <BlockBody>
                <List>
                  {unknownLocations.map((l) => (
                    <ListItem key={l.slug}>{renderLocation(l)}</ListItem>
                  ))}
                </List>
              </BlockBody>
            </Block>
          )}
        </div>
      )}
    </LoadingBlock>
  );
};
