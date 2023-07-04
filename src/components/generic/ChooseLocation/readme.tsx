import * as React from "react";

import { ChooseLocation } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { mockNextLocations } from "next-shared/src/mockData/mockLocations";
import { NextLocation } from "next-shared/src/models/NextLocation";
import { GeoHandler } from "../../../handlers/GeoHandler";
import { NextLocationListing } from "../../appointment-bookings/NextLocationListing";

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      <GeoHandler>
        <ChooseLocation
          locations={mockNextLocations}
          renderLocation={(l) => (
            <NextLocationListing location={l as NextLocation} />
          )}
        />
      </GeoHandler>
    </NextAppHandlerWeb>
  );
};
