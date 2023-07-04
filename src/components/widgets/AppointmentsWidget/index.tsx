import * as React from "react";
import { useContext } from "react";

import { NextStatisticsContext } from "../../../contexts/NextStatisticsContext";
import { TodaysAppointmentsMetric } from "../../metrics/TodaysAppointments";
import { Grid } from "../../structure/Grid";
import { Widget } from "../../generic/Widget";

export const AppointmentsWidget: React.FC = () => {
  const { isLoaded } = useContext(NextStatisticsContext);
  return (
    <Widget label="Today's Appointments" loading={!isLoaded}>
      <Grid size="lg">
        <TodaysAppointmentsMetric />
        {/* TODO reinstate this once caching discrepancy with above component is fixed */}
        {/*<TodaysPractitionerAppointmentsMetric />*/}
      </Grid>
    </Widget>
  );
};
