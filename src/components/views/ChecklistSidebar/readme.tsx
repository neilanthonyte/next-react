import * as React from "react";
import { MemoryRouter } from "react-router";

import { ChecklistSidebar } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const DemoStandard = () => {
  return (
    <div data-test="ChecklistSidebar-scenario-standard">
      <MemoryRouter>
        <NextAppHandlerWeb>
          <ChecklistSidebar />
        </NextAppHandlerWeb>
      </MemoryRouter>
    </div>
  );
};
