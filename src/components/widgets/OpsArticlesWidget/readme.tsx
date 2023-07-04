import * as React from "react";
import { MemoryRouter } from "react-router";

import { OpsArticlesWidget } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const DemoStandard = () => (
  <MemoryRouter>
    <NextAppHandlerWeb>
      <OpsArticlesWidget />
    </NextAppHandlerWeb>
  </MemoryRouter>
);
