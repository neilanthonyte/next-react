import { Scope } from "next-shared/src/models/Scope";
import { useMemo } from "react";
import { useCachedSyncedData } from "../useCachedSyncedData";

import { useClient } from "../../useClient";

interface IUseSyncedScope {
  scope: Scope;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Provides a syncronised scope that automatically updates when altered remotely.
 */
export const useSyncedScope = (scopeId: string): IUseSyncedScope => {
  const client = useClient();

  // must explicitly name each of the options as dependency to ensure useMemo's equality check.
  const scopesSyncMetadata = useMemo(
    () => (scopeId ? client.scopes.retrieveSyncedScope(scopeId) : null),
    [scopeId],
  );

  const { data, error } = useCachedSyncedData(scopesSyncMetadata);

  return {
    scope: data,
    error,
    isLoading: data === undefined,
  };
};
