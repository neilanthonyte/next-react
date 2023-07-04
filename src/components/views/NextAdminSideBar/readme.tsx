import * as React from "react";

import { NextAdminSideBar } from ".";
import { MemoryRouter } from "react-router";

export const DemoStandard = () => {
  return (
    <MemoryRouter>
      <NextAdminSideBar />
    </MemoryRouter>
  );
};
