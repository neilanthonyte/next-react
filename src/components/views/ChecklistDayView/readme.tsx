import * as React from "react";
import { useEffect } from "react";
import { Switch, Route, MemoryRouter } from "react-router";
import { useHistory } from "react-router-dom";

import { ChecklistDayView } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { useClient } from "../../../hooks/useClient";
import { mockStaffMemberSession } from "next-shared/src/mockData/mockAuth";

const Inner = () => {
  const client = useClient();

  useEffect(() => {
    // pretend to have a session
    client.auth.setSession(mockStaffMemberSession);
  }, []);

  return <ChecklistDayView />;
};

const JumpTo: React.FC<{ path: string }> = ({ path }) => {
  const history = useHistory();

  useEffect(() => {
    // a historic day
    history.push(path);
  }, []);

  return null;
};

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      <MemoryRouter>
        <JumpTo path="/foo/1985-04-02" />
        <Switch>
          <Route path="/foo/:date" component={Inner} />
        </Switch>
      </MemoryRouter>
    </NextAppHandlerWeb>
  );
};
