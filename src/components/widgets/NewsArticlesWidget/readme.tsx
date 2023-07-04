import * as React from "react";
import { MemoryRouter } from "react-router";

import { NewsArticlesWidget } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const DemoStandard = () => {
  return (
    <MemoryRouter>
      <NextAppHandlerWeb>
        <NewsArticlesWidget />
      </NextAppHandlerWeb>
    </MemoryRouter>
  );
};
