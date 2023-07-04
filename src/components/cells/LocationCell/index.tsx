import * as React from "react";
import {
  ICellAction,
  Cell,
  CellDescription,
  CellHeader,
} from "../../structure/Cell";
import { NextLocation } from "next-shared/src/models/NextLocation";

export interface ILocationCellProps {
  location: NextLocation;
  actions?: ICellAction[];
}

/**
 * Renders minimal information about a given location
 */
export const LocationCell: React.FC<ILocationCellProps> = ({
  location,
  actions,
}) => {
  return (
    <Cell decorationImage={location.posterImage.squareSmall} actions={actions}>
      <CellHeader>{location.title}</CellHeader>
      {location.address && (
        <CellDescription>
          <div>{location.address.streetAddress} </div>
          <div>
            {location.address.suburb} {location.address.state}{" "}
            {location.address.postcode}
          </div>
        </CellDescription>
      )}
    </Cell>
  );
};
