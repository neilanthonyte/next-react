import * as React from "react";

import { ListItem, List } from "../../structure/List";
import { FhirObservationUtil } from "next-shared/src/fhirUtil/utilClasses/FhirObservationUtil";
import { formatDate } from "../PlottableObservation/index";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { fhirUtil } from "next-shared/src/fhirUtil";
export const css = cssComposer(styles, "ObservationsList");

export interface IObservationsListProps {
  observations: fhir3.Observation[];
}
/**
 * Displays the observations as a list of data.
 * @param {*} param0
 */
export const ObservationsList: React.FC<IObservationsListProps> = ({
  observations = [],
}) => {
  const filteredObs: FhirObservationUtil<fhir3.Observation>[] = observations
    .map((o) => {
      return fhirUtil<FhirObservationUtil>(o);
    })
    .sort((a, b) => b.getCreationDate() - a.getCreationDate());

  return (
    <div className={css("")}>
      <List scale="compact">
        {filteredObs.map((obs) => {
          const name = obs.getDisplayText().split(/ /, 2);
          const value = name[0];
          const unit = name.length > 1 ? name[1] : false;

          return (
            // @ts-ignore - not sure how to fix this.
            <ListItem key={obs.resource.id}>
              <div className={css("item")}>
                <span>
                  {value}
                  {unit ? <small> {unit}</small> : null}
                </span>
                <small className={css("item_timestamp")}>
                  {formatDate(obs.getCreationDate())}
                </small>
              </div>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
