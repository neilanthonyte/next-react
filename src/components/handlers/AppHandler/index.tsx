import * as React from "react";
import { useContext, useState, useEffect, useCallback, useMemo } from "react";
import {
  ReactQueryConfig,
  ReactQueryConfigProvider,
  useQuery,
} from "react-query";

import { NextSessionInvalidatedError } from "next-shared/src/helpers/errorTypes";
import { ISimplePatientEhrAssociation } from "next-shared/src/types/IPatientEhrAssociation";
import { ClientSession } from "next-shared/src/models/ClientSession";

import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { PlatformContext } from "../../../contexts/PlatformContext";
import { ConfigContext } from "../../../contexts/ConfigContext";
import { PersistenceContext } from "../../../contexts/PersistenceContext";
import { useClient } from "../../../hooks/useClient";
import { AppContext, IAppContextValue } from "../../../contexts/AppContext";
import { useFirstRender } from "../../../hooks/useFirstRender";
import { chaosMonkey } from "../../../client/helpers/chaosMonkey";
import { CachedSyncedDataProvider } from "../../../providers/CachedSyncedDataProvider";

// do not change this as it will not load session on apps using this handler
export const PERSISTED_SESSION_ID_KEY = "@localStorage:savedSessionId";
// auto-migrate older session names
const LEGACY_SPG_SESSION_KEY = "spg-session-id";

export interface IAppHandlerProps {}

/**
 * Handler resposible for rendering platform specific components and
 * handling session persistence
 */
export const AppHandler: React.FC<IAppHandlerProps> = ({ children }) => {
  // check for undefined values to give more specific error instead of using useRequiredContext
  const platformContext = useContext(PlatformContext);
  if (Object.values(platformContext).some((x) => x === undefined)) {
    throw new Error(
      "Please wrap the AppHandler in a platform specific handler, such as AppHandlerWeb or AppHandlerRN",
    );
  }

  const { ErrorBoundary, ErrorResolverHandler, PersistenceHandler } =
    platformContext.components;

  const reactQueryCacheConfig: ReactQueryConfig = useMemo(
    () => ({
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
      mutations: {},
    }),
    [],
  );

  return (
    <ReactQueryConfigProvider config={reactQueryCacheConfig}>
      <CachedSyncedDataProvider>
        <ErrorBoundary>
          <ErrorResolverHandler>
            <PersistenceHandler>
              <AppHandlerInner>{children}</AppHandlerInner>
            </PersistenceHandler>
          </ErrorResolverHandler>
        </ErrorBoundary>
      </CachedSyncedDataProvider>
    </ReactQueryConfigProvider>
  );
};

const AppHandlerInner: React.FC<IAppHandlerProps> = ({ children }) => {
  const { config } = useRequiredContext(ConfigContext);
  const [persistSession, setPersistSession] = useState<boolean>(
    config.persistSessionOnLoad,
  );
  const [sessionPersistenceComplete, setSessionPersistenceComplete] =
    useState<boolean>(false);

  const [storageSessionId, setStorageSessionId] = useState<string | null>(null);

  const [
    globalSimplePatientEhrAssociation,
    setGlobalSimplePatientEhrAssociation,
  ] = useState<ISimplePatientEhrAssociation>();

  const persistenceContext = useRequiredContext(PersistenceContext);
  const client = useClient();

  // calling 'mockRequestErrors', 'mockClientErrorResponse' and 'chaosMonkey'
  // methods was previously done inside a useEffect hook. however, as this does
  // not run until after the first render, some handlers/components would be
  // able to use client methods as usual for the first render, after which they
  // would then fail.
  // to fix this, we use 'useFirstRender' to ensure that any client methods
  // that should fail do so from the first render.
  useFirstRender(() => {
    if (
      config.debugChaosProbability ||
      config.debugRequestErrorCount ||
      config.debugClientMethodsError
    ) {
      // when only probability is specified, we default the count to 0
      if (
        config.debugChaosProbability &&
        config.debugRequestErrorCount === undefined
      ) {
        config.debugRequestErrorCount = 0;
      }
      chaosMonkey(
        client,
        config.debugChaosProbability,
        config.debugRequestErrorCount,
        config.debugClientMethodsError,
        config.useRealClient,
      );
    }
  });

  const {
    refetch: sessionPersistenceRetry,
    error: sessionPersistenceError,
    isLoading: sessionPersistenceLoading,
    clear,
  } = useQuery<ClientSession, Error>(
    ["sessionRestore", storageSessionId],
    () => client.auth.setSessionFromSessionId(storageSessionId),
    {
      enabled: false,
      retry: false,
      onSuccess: () => setSessionPersistenceComplete(true),
    },
  );

  // runs when persiting session (based on config.persistSessionOnLoad)
  useEffect(() => {
    if (persistSession === false) {
      return;
    }

    const handleSessionChange = async () => {
      // handle persistence of session id
      const session = client.auth.session;

      if (session?.sessionId) {
        await persistenceContext.setItem(
          PERSISTED_SESSION_ID_KEY,
          session.sessionId,
        );
      }
    };

    // this is needed in case the client.auth.logout fails as it will not trigger a sessionChange
    const handleBeforeLogout = async () => {
      // remove persisted sessionId
      await persistenceContext.removeItem(PERSISTED_SESSION_ID_KEY);
      // manually reset useQuery state
      clear();
      // set persistence complete to true as we just logged out, so there will not be a sessionId to persist
      // this avoids blocking UI responding to sessionPersitenceComplete when false
      setSessionPersistenceComplete(true);
    };

    client.auth.on("sessionChange", handleSessionChange);
    client.auth.on("beforeLogout", handleBeforeLogout);

    // LEGACY
    persistenceContext.getItem(LEGACY_SPG_SESSION_KEY).then((sessionId) => {
      if (sessionId) {
        console.warn("found an old session token - auto migrating");
        persistenceContext.setItem(PERSISTED_SESSION_ID_KEY, sessionId);
        persistenceContext.removeItem(LEGACY_SPG_SESSION_KEY);
      }

      // load session if any persisted
      persistenceContext.getItem(PERSISTED_SESSION_ID_KEY).then((sessionId) => {
        // set local storage sessionId in a state flag,
        // picked up by useEffect to call client.auth.setSessionFromSessionId via useQuery
        setStorageSessionId(sessionId || null);
        if (!sessionId) {
          // if no session to persist set completion flag
          setSessionPersistenceComplete(true);
          return;
        }
      });
    });

    return () => {
      client.auth.off("sessionChange", handleSessionChange);
      client.auth.off("beforeLogout", handleBeforeLogout);
    };
  }, [client.auth, persistSession]);

  // try and restore session when we have session id in local storage
  useEffect(() => {
    if (!storageSessionId) {
      return;
    }
    sessionPersistenceRetry();
  }, [storageSessionId, sessionPersistenceRetry]);

  // when error restoring session, check type
  useEffect(() => {
    if (!sessionPersistenceError) return;
    if (sessionPersistenceError instanceof NextSessionInvalidatedError) {
      // logout to kill session. clean up picked up by beforeLogout listener above
      client.auth.logout().catch(console.error);
    }
  }, [sessionPersistenceError]);

  // for manual override in case config.persistSessionOnLoad is false
  const handlePersistSession = useCallback(() => {
    setPersistSession(true);
  }, []);

  const appContextValue = useMemo<IAppContextValue>(
    () => ({
      persistSession: handlePersistSession,
      sessionPersistenceComplete,
      sessionPersistenceLoading,
      sessionPersistenceError,
      sessionPersistenceRetry,
      globalSimplePatientEhrAssociation,
      setGlobalSimplePatientEhrAssociation,
    }),
    [
      handlePersistSession,
      sessionPersistenceComplete,
      sessionPersistenceLoading,
      sessionPersistenceError,
      sessionPersistenceRetry,
      globalSimplePatientEhrAssociation,
    ],
  );

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};
