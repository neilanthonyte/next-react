import * as React from "react";
import { Route, Switch } from "react-router";
import { MemoryRouter } from "react-router-dom";

import { NextSystemView } from "./";
import { ScopeView } from "../ScopeView";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      <MemoryRouter>
        <Switch>
          <Route path="/" exact={true} component={NextSystemView} />
          <Route path="/system/scopes/:scopeId" component={ScopeView} />
        </Switch>
      </MemoryRouter>
    </NextAppHandlerWeb>
  );
};
