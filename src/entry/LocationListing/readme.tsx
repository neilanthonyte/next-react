import * as React from "react";
import { MemoryRouter } from "react-router-dom";

import { LocationListing } from ".";

export const DemoStandard = () => {
  return (
    <MemoryRouter>
      <LocationListing />
    </MemoryRouter>
  );
};
