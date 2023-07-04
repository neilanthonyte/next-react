import * as React from "react";
import { AppSignupsMetric } from "../../metrics/AppSignups";
import { ActiveAppUsersMetric } from "../../metrics/ActiveAppUsers";
import { useContext } from "react";
import { NextStatisticsContext } from "../../../contexts/NextStatisticsContext";
import { Widget } from "../../generic/Widget";
import { Grid } from "../../structure/Grid";

/**
 * The population widget is a self contained component that categorises
 * a few different metrics into a single container.
 */
export const PopulationWidget: React.FC = () => {
  const { isLoaded } = useContext(NextStatisticsContext);
  return (
    <Widget label="Population" loading={!isLoaded}>
      <Grid size="lg">
        <AppSignupsMetric />
        <ActiveAppUsersMetric />
      </Grid>
    </Widget>
  );
};
