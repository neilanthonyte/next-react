import * as React from "react";
import { useEffect, useMemo } from "react";

import { IAppConfig } from "next-shared/src/models/AppConfig";
import { AppConfig } from "next-shared/src/models/AppConfig";

import { nextClientFactoryMock } from "../../../client/nextClientFactoryMock";
import { RequireSessionPersistence } from "../../handlers/RequireSessionPersistence";
import {
  AppHandler,
  PERSISTED_SESSION_ID_KEY,
} from "../../handlers/AppHandler";
import { NextClient } from "../../../client/NextClient";
import { nextClientFactory } from "../../../client/nextClientFactory";
import { useClient } from "../../../hooks/useClient";
import { ApiClientContext } from "../../../contexts/ApiClientContext";
import { ConfigContext } from "../../../contexts/ConfigContext";
import { PlatformContext } from "../../../contexts/PlatformContext";
import { PersistenceHandler } from "../../../handlers/PersistenceHandler";
import { urlParamsToObject } from "next-shared/src/helpers/urlParamsToObject";
import { ErrorBoundary } from "../../structure/ErrorBoundary";
import { ErrorResolverHandler } from "../ErrorResolverHandler";

const LOCAL_STORAGE_CONFIG = "envConfig";

const localStorageConfig = () => {
  const val = localStorage.getItem(LOCAL_STORAGE_CONFIG);
  return val !== null ? JSON.parse(val) : null;
};

export interface INextAppHandlerWebProps {
  configOverride?: IAppConfig;
  // HACK needed to support old legacy storage key, will need a migration
  persistedSessionIdKey?: string;
}

/**
 * Top most handler passing config and Next client setup to platform specific handler
 *
 * The Client and Config providers are setup in the AppHandlerWeb via the onInit callback
 */
export const NextAppHandlerWeb: React.FC<INextAppHandlerWebProps> = ({
  children,
  configOverride,
  persistedSessionIdKey = PERSISTED_SESSION_ID_KEY,
}) => {
  // lift the compulsory requirement in case there is an AppHandler wrapping another app handler
  const existingClient = useClient(false);

  useEffect(() => {
    if (existingClient) {
      // split for more visual impact
      console.warn(
        "You have two NextAppHandlerWeb components.\nPlease ignore if you are testing an entry component.\nOtherwise please remove the AppHandler from the readme.",
      );
    }
  }, [existingClient]);

  if (existingClient) {
    return <>{children}</>;
  }

  // use a ref in case the handler rerenders and runs the init method more than once,
  // the client has to be a singleton
  // const client = useRef<NextClient>(null);

  const { config, client }: { config: AppConfig; client: NextClient } =
    useMemo(() => {
      const urlParams = urlParamsToObject();

      const webConfig = {
        ...window.env,
        // allow for example/app based overrides
        ...configOverride,
        // allow the values to be set using localStorage - allows for switching without restarting the app
        ...localStorageConfig(),
        // allow for URL based overrides
        ...urlParams,
      };

      // ensure phone numbers aren't treated as numbers (happens even with a leading '+')
      const { debugFillPhone } = urlParamsToObject(false, false);
      if (debugFillPhone) {
        webConfig.debugFillPhone = debugFillPhone;
      }

      if (
        typeof webConfig.useRealClient === "undefined" &&
        window.location.host.indexOf("localhost") === 0
      ) {
        // default to a mock client in examples
        webConfig.useRealClient = false;
      }

      // merge and validate configs
      const config = AppConfig.unserialize(webConfig);
      config.validate();

      if (config.debugSessionId) {
        localStorage.setItem(persistedSessionIdKey, config.debugSessionId);
      }

      // setup appropriate client
      const client = config.useRealClient
        ? nextClientFactory(config)
        : nextClientFactoryMock();

      return { config, client: client };
    }, []);

  const platformComponents = {
    ErrorBoundary,
    ErrorResolverHandler,
    PersistenceHandler,
  };

  return (
    <ApiClientContext.Provider value={{ client }}>
      <ConfigContext.Provider value={{ config }}>
        <PlatformContext.Provider value={{ components: platformComponents }}>
          <AppHandler>
            <RequireSessionPersistence>{children}</RequireSessionPersistence>
          </AppHandler>
        </PlatformContext.Provider>
      </ConfigContext.Provider>
    </ApiClientContext.Provider>
  );
};
