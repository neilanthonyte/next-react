import { useMemo } from "react";

import { ISyncMetadata } from "next-shared/src/types/ISyncMetadata";

import { useDeepEqualEffect } from "../../useDeepEqualEffect";
import { useRequiredContext } from "../../useRequiredContext";
import {
  CachedSyncedDataContext,
  ICachedData,
} from "../../../providers/CachedSyncedDataProvider";

export function useCachedSyncedData<T>(
  /** The description of the sync endpoint. This should be memorised */
  syncMetadata?: ISyncMetadata<T> | void,
): undefined | ICachedData<T> {
  const { getData, registerClient, deregisterClient } = useRequiredContext(
    CachedSyncedDataContext,
  );

  // used for deep equal hook
  // QUESTION - perhaps we can memorise this so that we don't need the useDeepEqualEffect
  const syncMetadataNoFunc: ISyncMetadata<T> | false = syncMetadata
    ? {
        ...syncMetadata,
        // remove from the comparison
        emitter: undefined,
        unseralizeData: undefined,
      }
    : false;

  useDeepEqualEffect(() => {
    if (!syncMetadata) return;
    registerClient(syncMetadata);
    return () => {
      deregisterClient(syncMetadata);
    };
  }, [syncMetadataNoFunc]);

  return useMemo(() => {
    if (!syncMetadata) return { data: undefined, error: undefined };
    return getData(syncMetadata);
  }, [getData, syncMetadata]);
}
