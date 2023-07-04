import * as React from "react";
import { useContext, useMemo } from "react";
import { NextStatisticsContext } from "../../../contexts/NextStatisticsContext";
import { FeedbackMetric } from "../../generic/FeedbackMetric";
import { Grid } from "../../structure/Grid";

/**
 * Displays a count of the current days appointments
 */
export const TodaysAppointmentsMetric: React.FC = () => {
  const { statistics, isLoaded } = useContext(NextStatisticsContext);

  const todaysAppointments = useMemo(() => {
    if (!isLoaded) {
      return null;
    }
    return statistics.todaysAppointments;
  }, [isLoaded, statistics.todaysAppointments]);

  return (
    <Grid>
      <FeedbackMetric
        value={todaysAppointments?.appointments}
        name="Total"
        icon="calendar"
      />
      <FeedbackMetric
        value={todaysAppointments?.preFilled}
        name="Pre-Filled"
        icon="write"
      />
    </Grid>
  );
};
