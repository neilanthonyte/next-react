import * as React from "react";
import { MemoryRouter, Route } from "react-router";

import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { OpsArticleView } from ".";

export const DemoStandard: React.FC = () => (
  <NextAppHandlerWeb>
    <MemoryRouter initialEntries={["/opening"]}>
      <Route path="/:slug" component={OpsArticleView} />
    </MemoryRouter>
  </NextAppHandlerWeb>
);
