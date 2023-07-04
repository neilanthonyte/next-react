import * as React from "react";
import { useContext } from "react";

import { NextStatisticsContext } from "../../../contexts/NextStatisticsContext";
import { PractitionerAppPhotosTakenMetric } from "../../metrics/PractitionerAppPhotosTaken";
import { Widget } from "../../generic/Widget";
import { Grid } from "../../structure/Grid";

export const SystemUsageWidget: React.FC = () => {
  const { isLoaded } = useContext(NextStatisticsContext);
  return (
    <Widget label="Feature Adoption" loading={!isLoaded}>
      <Grid size="lg">
        <PractitionerAppPhotosTakenMetric />
      </Grid>
    </Widget>
  );
};
