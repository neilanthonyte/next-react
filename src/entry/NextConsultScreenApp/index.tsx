import * as React from "react";
import { BrowserRouter, MemoryRouter, Route, Switch } from "react-router-dom";

import { NextAutoUpdate } from "../../components/atoms/NextAutoUpdate";
import { NextLogout } from "../../components/atoms/NextLogout";
import { AnchorScrolling } from "../../components/generic/AnchorScrolling";
import { NextAppHandlerWeb } from "../../components/handlers/NextAppHandlerWeb";
import { useDebug } from "../../debug/DemoWrapper";
import { ConsultScreenApp } from "./components/ConsultScreenApp";

export interface INextConsultScreenAppProps {}

export const NextConsultScreenApp: React.FC<
  INextConsultScreenAppProps
> = ({}) => {
  const { isDemo } = useDebug();
  return (
    <NextAppHandlerWeb configOverride={{ useRealClient: true }}>
      <NextAutoUpdate />
      {isDemo ? (
        <MemoryRouter>
          <AnchorScrolling />
          <Switch>
            <Route path="/logout" component={NextLogout} />
            <Route path="/" component={ConsultScreenApp} />
          </Switch>
        </MemoryRouter>
      ) : (
        <BrowserRouter>
          <AnchorScrolling />
          <Switch>
            <Route path="/logout" component={NextLogout} />
            <Route path="/" component={ConsultScreenApp} />
          </Switch>
        </BrowserRouter>
      )}
    </NextAppHandlerWeb>
  );
};
