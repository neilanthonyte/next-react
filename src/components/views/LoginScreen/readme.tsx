import * as React from "react";
import { MemoryRouter } from "react-router";

import { AppLoginScreen } from ".";
import { useClient } from "../../../hooks/useClient";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

const Inner = () => {
  const client = useClient();

  return (
    <div data-test="LoginScreen-scenario-standard">
      <div data-test="component" style={{ height: "100vh" }}>
        <MemoryRouter>
          {client.auth.session ? (
            <>
              <h3>Already logged in</h3>
              <p>See below for session controls</p>
            </>
          ) : (
            <AppLoginScreen />
          )}
        </MemoryRouter>
      </div>
    </div>
  );
};

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      <Inner />
    </NextAppHandlerWeb>
  );
};
