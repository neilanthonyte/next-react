import * as React from "react";
import { MemoryRouter } from "react-router";

import { ChecklistSummaryView } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const DemoStandard = () => {
  return (
    <MemoryRouter>
      <NextAppHandlerWeb>
        <ChecklistSummaryView />
      </NextAppHandlerWeb>
    </MemoryRouter>
  );
};
