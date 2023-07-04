import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useClient } from "../useClient";
import { useSyncedSessionData } from "../core/useSyncedSessionData";

/**
 * Sync the URL using the scope state.
 *
 * *** HACK ***
 * The scroll sync over-rides the URLs in the Consult Screen if this is used there,
 * so I've quarantined these changes to the Companion App for now. Bringing the logic
 * together between the two apps is a post-release job.
 */
export const useCompanionUrlSync = () => {
  const client = useClient();
  const history = useHistory();
  const location = useLocation();
  const { scope } = useSyncedSessionData();

  // handles scope location changes
  useEffect(() => {
    if (location.pathname !== scope?.state?.url) {
      history.push(scope?.state?.url ?? "/");
    }
  }, [scope?.state?.url]);

  // handles window location changes
  useEffect(() => {
    if (scope && location.pathname !== scope.state?.url) {
      client.scopes
        .updateScopeAppState(scope.scopeId, {
          ...scope.state,
          url: location.pathname,
        })
        .catch(console.error);
    }
  }, [location]);
};
