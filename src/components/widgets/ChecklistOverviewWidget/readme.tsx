import * as React from "react";
import { MemoryRouter } from "react-router";

import { ChecklistOverviewWidget } from ".";
import { ChecklistHandler } from "../../handlers/ChecklistHandler";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const DemoStandard = () => {
  return (
    <MemoryRouter>
      <NextAppHandlerWeb>
        <ChecklistHandler>
          <ChecklistOverviewWidget />
        </ChecklistHandler>
      </NextAppHandlerWeb>
    </MemoryRouter>
  );
};
