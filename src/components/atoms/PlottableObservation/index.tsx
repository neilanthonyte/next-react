import * as React from "react";
import { useMemo } from "react";
import moment from "moment";

import { FhirObservationUtil } from "next-shared/src/fhirUtil/utilClasses/FhirObservationUtil";

import { LineChart } from "../../charts/LineChart";
import { BloodPressure } from "../../charts/BloodPressure";
import { ObservationsList } from "../ObservationsList";
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { fhirUtil } from "next-shared/src/fhirUtil";
import {
  IFhirObsChartData,
  fhirObsToChartData,
} from "./helpers/fhirObsToChartData";

export const css = cssComposer(styles, "PlottableObservation");

const MODES = {
  CHART: 0,
  METRICS: 1,
  ARTICLES: 2,
  BLOOD_PRESSURE: 2,
};

export const formatDate = (d: number) => moment.unix(d).format("DD MMM 'YY");

export interface IPlottableObservationProps {
  observations: fhir3.Observation[];
}

/**
 * Show an observation type.
 */
export const PlottableObservation: React.FC<IPlottableObservationProps> = ({
  observations,
}) => {
  const chart: IFhirObsChartData = useMemo(
    () => fhirObsToChartData(observations),
    [observations],
  );

  const name = useMemo(
    () =>
      observations.length
        ? fhirUtil<FhirObservationUtil>(
            observations[0],
          ).getObservationDisplayName()
        : "",
    [observations],
  );

  // TODO - do something useful
  const updateSelection = () => {};
  const selectedIndex = chart.data.length - 1;

  // TODO - hack approach
  const isBloodPressure = name === "Blood pressure";
  const bloodPressureData = isBloodPressure
    ? chart.data.map((d: any) => d[1])
    : [];

  return (
    <div className={css("")}>
      <div className={css("chart")}>
        {chart.data.length > 1 ? (
          <LineChart
            data={chart.data}
            onSelectionChange={updateSelection}
            selection={selectedIndex}
            lineOptions={chart.options}
            legend={{ show: true }}
          />
        ) : null}
        {isBloodPressure && (
          <div className={css("chart_subchart")}>
            <BloodPressure
              data={bloodPressureData}
              onSelectionChange={updateSelection}
              selectedIndex={selectedIndex}
            />
          </div>
        )}
      </div>
      <div className={css("metrics")}>
        <ObservationsList observations={observations} />
      </div>
    </div>
  );
};
