import * as React from "react";

import { Hcp } from "next-shared/src/models/Hcp";
import { NextLocation } from "next-shared/src/models/NextLocation";

import {
  ICellAction,
  Cell,
  CellHeader,
  CellDescription,
} from "../../structure/Cell";

export interface IHcpCellProps {
  hcp: Hcp;
  actions?: ICellAction[];
  location?: NextLocation;
}

/**
 * Renders minimal information about a given hcp
 */
export const HcpCell: React.FC<IHcpCellProps> = ({
  hcp,
  actions,
  location,
}) => {
  return (
    <Cell decorationImage={hcp.profileImage.squareSmall} actions={actions}>
      <CellHeader>{hcp.title}</CellHeader>
      {location && <CellDescription>{location.title}</CellDescription>}
    </Cell>
  );
};
