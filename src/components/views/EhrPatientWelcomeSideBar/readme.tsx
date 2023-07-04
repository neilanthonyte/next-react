import * as React from "react";
import { MemoryRouter } from "react-router";

import { EhrPatientWelcomeSideBar } from ".";

export const DemoStandard = () => {
  return (
    <div data-test="EhrPatientWelcomeSideBar-scenario-standard">
      <div data-test="component">
        <MemoryRouter>
          <EhrPatientWelcomeSideBar />
        </MemoryRouter>
      </div>
    </div>
  );
};
