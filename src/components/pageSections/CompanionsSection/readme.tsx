import * as React from "react";
import { MemoryRouter } from "react-router-dom";

import { CompanionsSection } from "./";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      <MemoryRouter>
        {" "}
        <CompanionsSection />{" "}
      </MemoryRouter>
    </NextAppHandlerWeb>
  );
};
