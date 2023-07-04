import { useContext, useEffect, useRef, useState } from "react";

import { ApiClientContext } from "../contexts/ApiClientContext";
import { createGuid } from "next-shared/src/helpers/guid";
import { NextClient } from "../client/NextClient";

/**
 * A generic hook that will return the client that has been setup
 * for the particular app through the ApiClientContext provider.
 *
 * @example
 * const client = useClient<NextClient>()
 * // will return the instantiated nextClient for the app
 * client.patient.get(21);
 * // use like you would normally.
 *
 * @note
 * this hook will re-render when the session changes, however, if your component is sensitive to session changes,
 * you should add `client.auth.session` as a dependency, as it is a nested property on the client,
 * and react hooks only do shallow comparisons.
 */
export const useClient = (requireClient: boolean = true): NextClient => {
  const context = useContext(ApiClientContext);
  const isMounted = useRef<boolean>(false);
  const [, setForceRerender] = useState(createGuid());

  useEffect(() => {
    const handleClientAuthChange = () => {
      if (isMounted.current === false) return;
      setForceRerender(createGuid());
    };

    if (!context.client) {
      if (requireClient) {
        throw new Error("missing client context - did you add an app wrapper?");
      } else {
        console.warn("client is not required");
        return;
      }
    }

    context.client.auth.on("sessionChange", handleClientAuthChange);
    context.client.auth.on(
      "sessionTemporaryAccessChange",
      handleClientAuthChange,
    );

    return () => {
      context.client.auth.off("sessionChange", handleClientAuthChange);
      context.client.auth.off(
        "sessionTemporaryAccessChange",
        handleClientAuthChange,
      );
    };
  }, [context.client]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // TODO
  return context.client;
};
