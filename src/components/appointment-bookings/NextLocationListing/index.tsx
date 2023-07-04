import * as React from "react";
import { useContext } from "react";

import { NextLocation } from "next-shared/src/models/NextLocation";
import { GeoContext } from "../../../contexts/GeoContext";
import { Cell, ICellAction } from "../../structure/Cell";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "NextLocationListing");

export interface INextLocationListingProps {
  location: NextLocation;
  onClick?: (location: NextLocation) => any;
}

// HACK - copied from LocationDetails
/**
 * Renders information about an available location for booking
 */
export const NextLocationListing: React.FC<INextLocationListingProps> = ({
  location,
  onClick,
}) => {
  const { latLng } = useContext(GeoContext);

  const callback = () => onClick(location);
  const actions: ICellAction[] = [
    {
      icon: "chevron-right",
      onClick: callback,
    },
  ];

  const distance = latLng ? location.getLocationsDistance(latLng) : null;

  return (
    <div data-test="cell">
      <Cell
        decorationImage={location.posterImage.squareMedium}
        actions={actions}
        onClick={callback}
        className={css("")}
      >
        <header className={css("header")}>
          <h5 className={css("heading")} data-test="title">
            {location.title}
          </h5>
          {!!distance && (
            <div className={css("label")}>
              {distance.toFixed(1)}
              <small>km away</small>
            </div>
          )}
        </header>
        {!!location.address?.fullAddress && (
          <p className={css("description")}>{location.address.fullAddress}</p>
        )}
      </Cell>
    </div>
  );
};
