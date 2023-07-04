import * as React from "react";

import { OpsResourcesWidget } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { MemoryRouter } from "react-router";

export const DemoStandard = () => {
  return (
    <MemoryRouter>
      <NextAppHandlerWeb>
        <OpsResourcesWidget />
      </NextAppHandlerWeb>
    </MemoryRouter>
  );
};
