import { useMemo } from "react";
import { useQuery } from "react-query";
import {
  IActionFulfillmentSummary,
  ISummaryDateStringRange,
} from "next-shared/src/types/actionSummary";
import { useClient } from "../../useClient";
export interface IUseActionSummaryResponse {
  actionSummary: IActionFulfillmentSummary;
  isLoading: boolean;
  error: Error | void;
}
/**
 * Hook handling fetching of action summary (daily scores)
 * Please note that this is only applicable for medication actions at the moment.
 */
export const useActionSummary = (
  subjectId: string,
  options: ISummaryDateStringRange,
) => {
  const client = useClient();

  const {
    data: actionSummary,
    isLoading,
    error,
  } = useQuery<IActionFulfillmentSummary, Error>(
    ["retrieveActionSummary", subjectId, options],
    () => client.actions.retrieveActionSummary(subjectId, options),
    {
      enabled: !!(subjectId && client && options?.fromDate && options?.toDate),
      // https://react-query.tanstack.com/guides/paginated-queries#better-paginated-queries-with-keeppreviousdata
      // This avoids the summary disappearing and reappiring on key change
      // (e.g. if the previous summary is still showing in the UI, a new key will temporarely set data to undefined and isLoading to true)
      // this will keep the previously fethced data and swap it when the new data is fetched
      keepPreviousData: true,
    },
  );

  return useMemo<IUseActionSummaryResponse>(
    () => ({
      actionSummary,
      isLoading,
      error,
    }),
    [actionSummary, isLoading, error],
  );
};
