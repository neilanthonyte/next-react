import * as React from "react";
import { useContext, useMemo } from "react";
import { round } from "lodash";

import { NextStatisticsContext } from "../../../contexts/NextStatisticsContext";
import { FeedbackMetric } from "../../generic/FeedbackMetric";
import { ITrend } from "../../generic/Trend";

export const ClinicRatingMetric: React.FC = () => {
  const { statistics, isLoaded } = useContext(NextStatisticsContext);

  const [value, trend] = useMemo<[number | null, ITrend | null]>(() => {
    if (!isLoaded) {
      return [null, null];
    }
    const valueForCurrentPeriod = statistics.clinicRating.current.average;
    const valueForCurrentPeriodRounded = round(valueForCurrentPeriod, 1);
    const valueForPreviousPeriod = statistics.clinicRating.previous.average;
    // floating point math in javascript can and will result in extraneous remainders, round off.
    const trendValue = valueForCurrentPeriod - valueForPreviousPeriod;
    const trendValueRounded = round(trendValue, 1);

    const trend: ITrend = {
      value: trendValueRounded,
    };

    return [valueForCurrentPeriodRounded, trend];
  }, [isLoaded, statistics.clinicRating]);

  const networkAverage = useMemo<number>(() => {
    if (!isLoaded) {
      return null;
    }
    return round(statistics.networkClinicRating.current.average, 2);
  }, [isLoaded, statistics.networkClinicRating]);

  return (
    <FeedbackMetric
      value={value}
      name="Patient Feedback"
      label="out of 5"
      icon="faqs"
      trend={trend}
      description={`Next average ${networkAverage}`}
    />
  );
};
