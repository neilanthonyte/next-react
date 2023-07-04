import * as React from "react";
import { useMemo } from "react";
import * as _ from "lodash";

import { Grid, IGridSize } from "../../structure/Grid";
import { ObservationCard } from "../../resources/ObservationCard";
import { cloneModelObject } from "next-shared/src/helpers/cloneModelObject";
import { PlaceholderView } from "../../views/PlaceholderView";

export interface IPatientObservationsProps {
  /** array of observation names to filter by */
  filter?: string[];
  /** only show last observation entry, true by default */
  onlyShowLatest?: boolean;
  /** list of observation grouped by type */
  observationsByType: {
    [key: string]: any;
  };
  /** callback with selected observation */
  onEdit?: ((val: fhir3.Observation) => void) | null;
  /** Override the grid size */
  gridSize?: IGridSize;
}

// TODO replaces ObservationSection component still using redux
// (still used in dashboard atm)

/**
 * Component rendering a list of editable observations
 */
export const PatientObservations: React.FC<IPatientObservationsProps> = ({
  filter = [],
  onlyShowLatest = true,
  observationsByType,
  gridSize = "lg",
  onEdit,
}) => {
  const observationsToShow: fhir3.Observation[] = useMemo(() => {
    if (!observationsByType) return [];
    const clonedObservationsByType = cloneModelObject(observationsByType);

    if (onlyShowLatest) {
      Object.keys(clonedObservationsByType).map((k) => {
        clonedObservationsByType[k] = _.last(clonedObservationsByType[k]);
      });
    }

    if (filter.length > 0) {
      return _.flatten(filter.map((f) => clonedObservationsByType[f] || []));
    }
    return _.flatten(
      Object.keys(clonedObservationsByType).map(
        (f) => clonedObservationsByType[f] || [],
      ),
    );
  }, [observationsByType, filter, onlyShowLatest]);

  return (
    <div>
      {!observationsToShow.length && (
        <PlaceholderView instruction="No information on record" />
      )}
      <Grid size={gridSize}>
        {observationsToShow.map((observation, index) => (
          <ObservationCard key={index} data={observation} onEdit={onEdit} />
        ))}
      </Grid>
    </div>
  );
};
