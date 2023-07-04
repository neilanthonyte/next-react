import * as React from "react";

import { useClient } from "../../../hooks/useClient";

import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

import { RequireAppSession } from ".";
import { mockPatientSession } from "next-shared/src/mockData/mockAuth";

const Inner = () => {
  const client = useClient();

  const setSession = () => {
    client.auth.setSession(mockPatientSession);
  };
  const logout = () => {
    client.auth.logout();
  };

  return (
    <>
      <div style={{ height: "100vh" }}>
        <RequireAppSession>
          {!!client.auth.session && <h1>Logged in!</h1>}
        </RequireAppSession>
      </div>
      <p>
        <a onClick={setSession}>Add session</a>
        {" | "}
        <a onClick={logout}>Log out</a>
      </p>
    </>
  );
};

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      <Inner />
    </NextAppHandlerWeb>
  );
};
