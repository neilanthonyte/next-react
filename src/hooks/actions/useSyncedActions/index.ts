import { useMemo } from "react";
import { Action } from "next-shared/src/models/Action";
import { IRetrieveActionsOptions } from "next-shared/src/types/IRetrieveActionsOptions";

import { useCachedSyncedData } from "../../core/useCachedSyncedData";
import { useClient } from "../../useClient";

interface IUseSyncedActionsResponse {
  actions?: Action[];
  error?: Error;
  isLoading: boolean;
}

/**
 * Hook handling fetching of synced action data
 */
export const useSyncedActions = (
  patientId: string,
  options?: IRetrieveActionsOptions,
): IUseSyncedActionsResponse => {
  const client = useClient();

  // must explicitly name each of the options as dependency to ensure useMemo's equality check.
  const actionsSyncMetadata = useMemo(
    () =>
      patientId
        ? client.actions.retrieveSyncedActions(patientId, options)
        : null,
    [patientId, options?.typeFilter, options?.includeResolved, options?.date],
  );

  // old sync approach
  // const actions: Action[] = useSyncedData(actionsSyncMetadata);
  // new cached approach
  const { data, error } = useCachedSyncedData(actionsSyncMetadata);

  return {
    actions: data?.actions,
    error,
    isLoading: data === undefined,
  };
};
