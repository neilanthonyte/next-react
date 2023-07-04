import { useMemo } from "react";
import { ISummaryDateStringRange } from "next-shared/src/types/actionSummary";
import { useCachedSyncedData } from "../../core/useCachedSyncedData";
import { useClient } from "../../useClient";
import { IUseActionSummaryResponse } from "../useActionSummary";

/**
 * Hook handling fetching of action summary (daily scores) via web sockets
 * Please note that this is only applicable for medication actions at the moment.
 */
export const useSyncedActionSummary = (
  subjectId: string,
  options?: ISummaryDateStringRange,
): IUseActionSummaryResponse => {
  const client = useClient();

  // must explicitly name each of the options as dependency to ensure useMemo's equality check.
  const actionSummarySyncMetadata = useMemo(
    () => client.actions.retrieveSyncedActionSummary(subjectId, options),
    [subjectId, options?.fromDate, options?.toDate],
  );

  const { data, error } = useCachedSyncedData(actionSummarySyncMetadata);

  return {
    actionSummary: data?.actionSummary,
    error,
    isLoading: data === undefined,
  };
};
