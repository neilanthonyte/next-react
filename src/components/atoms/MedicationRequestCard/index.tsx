import * as React from "react";
import * as _ from "lodash";

import { Cell, CellHeader, CellDescription } from "../../structure/Cell";
import { Card } from "../../structure/Card";

export interface IMedicationRequestCardProps {
  medication: fhir3.MedicationRequest;
}

/**
 * Component showing information about a medication
 */
export const MedicationRequestCard: React.FC<IMedicationRequestCardProps> = ({
  medication,
  ...rest
}) => {
  const rows = [];

  const name = _.get(medication, "medicationCodeableConcept.text", "");
  const directions = _.get(medication, "dosageInstruction[0].text", ""); // eg "One per day, as required"
  const description = _.get(
    medication,
    "dosageInstruction[0].additionalInstruction[0].text",
    "",
  ); // eg "Telfast 60mg"
  const route = _.get(medication, "dosageInstruction[0].route.text");

  if (name) {
    rows.push({
      isLead: true,
      heading: _.capitalize(name),
      icon: "medications",
    });
  }

  if (directions || description) {
    rows.push({
      heading: _.capitalize(directions),
      description: _.capitalize(description),
    });
  }

  if (route) {
    rows.push({
      heading: "Route",
      description: _.capitalize(route),
    });
  }

  return (
    <Card {...rest}>
      {rows &&
        rows.map((row, i) => (
          <Cell
            key={i}
            isLead={row.isLead}
            className="center"
            decorationIcon={row.icon}
          >
            <CellHeader>{row.heading}</CellHeader>
            <CellDescription>{row.description}</CellDescription>
          </Cell>
        ))}
    </Card>
  );
};

export default MedicationRequestCard; // TODO: remove me, left for legacy imports
