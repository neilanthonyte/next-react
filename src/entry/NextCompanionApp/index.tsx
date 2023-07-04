import * as React from "react";
import { BrowserRouter, MemoryRouter, Route, Switch } from "react-router-dom";

import { CompanionApp } from "../../components/companion/CompanionApp";

import { NextAutoUpdate } from "../../components/atoms/NextAutoUpdate";
import { NextLogout } from "../../components/atoms/NextLogout";
import { AnchorScrolling } from "../../components/generic/AnchorScrolling";
import { NextAppHandlerWeb } from "../../components/handlers/NextAppHandlerWeb";
import { useDebug } from "../../debug/DemoWrapper";

export const NextCompanionApp: React.FC = () => {
  const { isDemo } = useDebug();

  return (
    <NextAppHandlerWeb>
      <NextAutoUpdate />
      {isDemo ? (
        <MemoryRouter>
          <AnchorScrolling />
          <Switch>
            <Route path="/logout" component={NextLogout} />
            <Route path="/" component={CompanionApp} />
          </Switch>
        </MemoryRouter>
      ) : (
        <BrowserRouter>
          <AnchorScrolling />
          <Switch>
            <Route path="/logout" component={NextLogout} />
            <Route path="/" component={CompanionApp} />
          </Switch>
        </BrowserRouter>
      )}
    </NextAppHandlerWeb>
  );
};
