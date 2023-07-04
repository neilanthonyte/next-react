import { useMemo } from "react";
import moment from "moment";

import {
  IActionFulfillmentStatistics,
  IActionFulfillmentSummary,
} from "next-shared/src/types/actionSummary";

import { ActiveTimeContext } from "../../../contexts/ActiveTimeContext";
import { useRequiredContext } from "../../useRequiredContext";
import { activeTimeContextDateFormat } from "../../../helpers/momentFormats";
import { useSyncedActionSummary } from "../useSyncedActionSummary";

export interface IUseDayAndWeekSyncedActionSummary {
  daySummary: IActionFulfillmentStatistics;
  weekSummary: IActionFulfillmentSummary;
  error: Error | void;
  isLoading: boolean;
}

/**
 * Hook handling fetching of action summary via web sockets for the active week and day
 * Depends on ActiveTimeContext
 */
export const useDayAndWeekSyncedActionSummary = (
  subjectId: string,
): IUseDayAndWeekSyncedActionSummary => {
  const { activeDate } = useRequiredContext(ActiveTimeContext);

  const { fromDate, toDate } = useMemo(() => {
    const momentActiveDate = moment(activeDate, activeTimeContextDateFormat);
    return {
      fromDate: momentActiveDate
        .startOf("isoWeek")
        .format(activeTimeContextDateFormat),
      toDate: momentActiveDate
        .endOf("isoWeek")
        .format(activeTimeContextDateFormat),
    };
  }, [activeDate]);

  const {
    actionSummary: weekSummary,
    error,
    isLoading,
  } = useSyncedActionSummary(subjectId, {
    fromDate,
    toDate,
  });

  return useMemo<IUseDayAndWeekSyncedActionSummary>(
    () => ({
      daySummary: (weekSummary || {})[activeDate],
      weekSummary,
      error,
      isLoading,
    }),
    [weekSummary, error, isLoading, activeDate],
  );
};
