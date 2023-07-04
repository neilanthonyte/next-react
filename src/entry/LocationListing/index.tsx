import * as React from "react";

import { NextLocationPicker } from "next-react/src/components/atoms/NextLocationPicker";
import { NextAppHandlerWeb } from "next-react/src/components/handlers/NextAppHandlerWeb";
import { GeoHandler } from "../../handlers/GeoHandler";

export interface ILocationListingProps {}

/**
 * Self contained Next Search component.
 */
export const LocationListing: React.FC<ILocationListingProps> = ({}) => {
  return (
    <NextAppHandlerWeb>
      <GeoHandler>
        <NextLocationPicker onlyBookable={false} />
      </GeoHandler>
    </NextAppHandlerWeb>
  );
};
