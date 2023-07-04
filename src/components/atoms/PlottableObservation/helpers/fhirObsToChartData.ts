import * as _ from "lodash";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { observationComponentDisplayNameExtensionUrl } from "next-shared/src/helpers/constants";

import { ILineOption, ILineChartMultiPoint } from "../../../charts/LineChart";

export interface IFhirObsChartData {
  options: ILineOption[];
  data: ILineChartMultiPoint[]; // [Date, number[], boolean?][]
}

/**
 * Converts FHIR observations to plottable data.
 */
export const fhirObsToChartData = (
  observations: fhir3.Observation[],
): IFhirObsChartData => {
  const names = observations[0]?.component.map((component) => {
    return fhirUtil(component).getExtensionStringValue(
      observationComponentDisplayNameExtensionUrl,
    );
  });

  const options: ILineOption[] = names.map((n) => ({
    label: n,
    lineStyle: "hard",
  }));

  const data = observations.map((observation, i) => {
    const fhirObs = fhirUtil(observation);

    const date: number = fhirObs.getCreationDate();
    const data: any = names.map(() => null);

    observation.component.forEach((component, i) => {
      const value = component.valueQuantity.value;
      data[i] = value;
    });

    return [new Date(date), Object.values(data), false];
  });

  return {
    options,
    data,
  };
};
