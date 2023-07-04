import * as React from "react";
import { useContext, useMemo } from "react";

import { NextStatisticsContext } from "../../../contexts/NextStatisticsContext";
import { FeedbackMetric } from "../../generic/FeedbackMetric";

/**
 * Self contained metric which visualises the the amount of sign ups to the patient app.
 */
export const AppSignupsMetric: React.FC = () => {
  const { statistics, isLoaded } = useContext(NextStatisticsContext);

  const [value, trendValue] = useMemo<[number | null, number | null]>(() => {
    if (!isLoaded) {
      return [null, null];
    }
    const valueForCurrentPeriod = statistics.appSignups.current;
    const valueForPreviousPeriod = statistics.appSignups.previous;
    const trendValue = valueForCurrentPeriod - valueForPreviousPeriod;

    return [valueForCurrentPeriod, trendValue];
  }, [isLoaded, statistics.appSignups]);

  return (
    <FeedbackMetric
      value={value}
      label="Patients"
      name="Patient App Sign-Ups"
      icon="iphone"
      trend={{ value: trendValue }}
      // TODO - when the newPatient metric exists, add it here to quantify new patients to app signups
      description=""
    />
  );
};
