import * as React from "react";
import { useContext, useMemo } from "react";
import { FeedbackMetric } from "../../generic/FeedbackMetric";
import { NextStatisticsContext } from "../../../contexts/NextStatisticsContext";
import { getPercentage } from "../../../helpers/getPercentage";
import { round } from "lodash";

/**
 * Self contained metric which visualises the amount of active users on the patient app.
 */
export const ActiveAppUsersMetric: React.FC = ({}) => {
  const { statistics, isLoaded } = useContext(NextStatisticsContext);

  const [percentageValueForCurrentPeriod, trendValue] = useMemo<
    [number, number]
  >(() => {
    if (!isLoaded) {
      return [null, null];
    }

    const currentPeriodPercentage = getPercentage(
      statistics.activeAppUsers.current,
      statistics.totalPatientCount,
    );

    const previousPeriodPercentage = getPercentage(
      statistics.activeAppUsers.previous,
      statistics.totalPatientCount,
    );

    const trend = round(previousPeriodPercentage - currentPeriodPercentage, 1);

    return [currentPeriodPercentage, trend];
  }, [isLoaded, statistics.totalPatientCount, statistics.activeAppUsers]);

  return (
    <FeedbackMetric
      name="Active App Users"
      icon="iphone"
      value={`${percentageValueForCurrentPeriod}%`}
      trend={{ value: trendValue, asPercent: true }}
    />
  );
};
