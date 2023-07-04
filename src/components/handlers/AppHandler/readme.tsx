import * as React from "react";

import { AppHandler } from ".";
import { ApiClientContext } from "../../../contexts/ApiClientContext";
import { ConfigContext } from "../../../contexts/ConfigContext";
import { PlatformContext } from "../../../contexts/PlatformContext";
import { ErrorBoundary } from "../../structure/ErrorBoundary";
import { ErrorResolverHandler } from "../ErrorResolverHandler";
import { PersistenceHandler } from "../../../handlers/PersistenceHandler";
import { nextClientFactoryMock } from "../../../client/nextClientFactoryMock";
import { NextClient } from "../../../client/NextClient";
import { AppConfig } from "next-shared/src/models/AppConfig";
import { useClient } from "../../../hooks/useClient";

export const DemoStandard = () => {
  const client = useClient();
  const errorClient = nextClientFactoryMock() as NextClient;
  errorClient.mockErrorResponse(["auth.setSessionFromSessionId"]);

  const platformComponents = {
    ErrorBoundary,
    ErrorResolverHandler,
    PersistenceHandler,
  };

  return (
    <ApiClientContext.Provider value={{ client }}>
      <ConfigContext.Provider value={{ config: new AppConfig() }}>
        <PlatformContext.Provider value={{ components: platformComponents }}>
          <AppHandler>
            <div className="debug"></div>
          </AppHandler>
        </PlatformContext.Provider>
      </ConfigContext.Provider>
    </ApiClientContext.Provider>
  );
};
