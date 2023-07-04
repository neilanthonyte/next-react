import * as React from "react";
import { useContext, useMemo } from "react";
import { NextStatisticsContext } from "../../../contexts/NextStatisticsContext";
import { FeedbackMetric } from "../../generic/FeedbackMetric";
import { round } from "lodash";
import { ITrend } from "../../generic/Trend";

export const PractitionerAppPhotosTakenMetric: React.FC = () => {
  const { statistics, isLoaded } = useContext(NextStatisticsContext);

  const [valueForCurrentPeriod, trend] = useMemo<
    [number | null, ITrend | null]
  >(() => {
    if (!isLoaded) {
      return [null, null];
    }
    const valueForCurrentPeriod = statistics.practitionerAppPhotos.current;
    const valueForPreviousPeriod = statistics.practitionerAppPhotos.previous;
    // floating point math in javascript can and will result in extraneous remainders, round off.
    const trend: ITrend = {
      value: round(valueForCurrentPeriod - valueForPreviousPeriod, 1),
    };

    return [valueForCurrentPeriod, trend];
  }, [isLoaded, statistics.clinicRating]);

  return (
    <FeedbackMetric
      value={valueForCurrentPeriod}
      name="Practitioner App Photos"
      icon="photo"
      trend={trend}
    />
  );
};
