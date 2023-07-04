import * as React from "react";
import { useContext } from "react";

import { NextStatisticsContext } from "../../../contexts/NextStatisticsContext";
import { ClinicRatingMetric } from "../../metrics/ClinicRating";
import { Widget } from "../../generic/Widget";

export const ClinicCareFactorWidget: React.FC = () => {
  const { isLoaded } = useContext(NextStatisticsContext);
  return (
    <Widget label="Clinic Care Rating" loading={!isLoaded}>
      <ClinicRatingMetric />
    </Widget>
  );
};
