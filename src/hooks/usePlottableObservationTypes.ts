import { useMemo } from "react";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirObservationUtil } from "next-shared/src/fhirUtil/utilClasses/FhirObservationUtil";
import { IGroupedPatientMedicalResources } from "next-shared/src/types/types";

/**
 * Hook returning type of observations that can be plotted from the given available observations
 */
export const usePlottableObservationTypes = (
  groupedObservations: IGroupedPatientMedicalResources,
): string[] | null => {
  return useMemo(() => {
    if (!groupedObservations) return null;
    return Object.keys(groupedObservations).filter((type) => {
      return (
        groupedObservations[type].length > 0 &&
        fhirUtil<FhirObservationUtil>(
          groupedObservations[type][0],
        ).isPlottable()
      );
    });
  }, [groupedObservations]);
};
