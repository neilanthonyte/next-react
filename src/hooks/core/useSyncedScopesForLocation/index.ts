import { Scope, TScopeType } from "next-shared/src/models/Scope";
import { useMemo } from "react";
import { useCachedSyncedData } from "../useCachedSyncedData";

import { useClient } from "../../useClient";

interface IUseSyncedScope {
  scopes?: Scope[];
  rooms?: Scope[];
  companions?: Scope[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * Provides a syncronised scope that automatically updates when altered remotely.
 */
export const useSyncedScopesForLocation = (
  locationId: string,
  type?: TScopeType,
): IUseSyncedScope => {
  const client = useClient();

  // must explicitly name each of the options as dependency to ensure useMemo's equality check.
  const scopesSyncMetadata = useMemo(
    () =>
      locationId
        ? client.scopes.retrieveSyncedScopesForLocation(locationId, type)
        : null,
    [locationId],
  );

  const { data: scopes, error } = useCachedSyncedData(scopesSyncMetadata);
  const companions = (scopes || []).filter((s) => s.type === "companion");
  const rooms = (scopes || []).filter((s) => s.type === "room");

  return {
    scopes,
    companions: scopes ? companions : undefined,
    rooms: scopes ? rooms : undefined,
    error,
    isLoading: scopes === undefined,
  };
};
