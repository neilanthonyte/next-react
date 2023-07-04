import * as React from "react";
import { useEffect } from "react";
import { Router, MemoryRouter } from "react-router";
import { Switch, Route, useHistory } from "react-router-dom";

import { StaffMemberPanel } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { useHcps } from "../../../hooks/content/useHcps";

export interface IInnerProps {}

export const Inner: React.FC<IInnerProps> = ({}) => {
  const history = useHistory();
  const { hcps: allHcps } = useHcps();

  useEffect(() => {
    if (!allHcps) {
      return;
    }
    history.push(`/hcps/${allHcps[0].npServicesId}`);
  }, [allHcps]);

  return (
    <Router history={history}>
      <Switch>
        <Route path="/hcps/:id" component={StaffMemberPanel} />
      </Switch>
    </Router>
  );
};

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb configOverride={{ useRealClient: false }}>
      <MemoryRouter>
        <Inner />
      </MemoryRouter>
    </NextAppHandlerWeb>
  );
};
