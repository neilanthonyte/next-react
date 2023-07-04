import * as React from "react";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import { NextAutoUpdate } from "../../components/atoms/NextAutoUpdate";
import { NextLogout } from "../../components/atoms/NextLogout";
import { AnchorScrolling } from "../../components/generic/AnchorScrolling";
import { NextAppHandlerWeb } from "../../components/handlers/NextAppHandlerWeb";
import { useDebug } from "../../debug/DemoWrapper";
import { NextManager } from "./components/NextManager";

export interface INextManagerAppProps {}

export const NextManagerApp: React.FC<INextManagerAppProps> = ({}) => {
  const { isDemo } = useDebug();
  return (
    <NextAppHandlerWeb configOverride={{ useRealClient: true }}>
      <NextAutoUpdate />
      {isDemo ? (
        <>
          <AnchorScrolling />
          <Switch>
            <Route path="/logout" component={NextLogout} />
            <Route path="/" component={NextManager} />
          </Switch>
        </>
      ) : (
        <BrowserRouter>
          <AnchorScrolling />
          <Switch>
            <Route path="/logout" component={NextLogout} />
            <Route path="/" component={NextManager} />
          </Switch>
        </BrowserRouter>
      )}
    </NextAppHandlerWeb>
  );
};
