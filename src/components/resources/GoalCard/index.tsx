import * as React from "react";

import { FhirGoalUtil } from "next-shared/src/fhirUtil/utilClasses/FhirGoalUtil";
import { ICardProps } from "../../structure/Card";
import { mapObservationTypeToIcon } from "../../../helpers/mapObservationTypeToIcon";
import MetricCell from "../../atoms/MetricCell";
import { Cell, CellHeader } from "../../structure/Cell";
import { Card, CardBody } from "../../structure/Card";
import { NoDataFallback } from "../../structure/NoDataFallback";
import { fhirUtil } from "next-shared/src/fhirUtil";

export interface IGoalCardProps extends ICardProps {
  goal: null | fhir3.Goal;
}

/**
 * Component showing information about GoalCard metrics
 */
export const GoalCard: React.FC<IGoalCardProps> = ({ goal }) => {
  // if there are no goals, just return a 'no records in our system' Card component
  if (!goal) {
    return (
      <Card className="center">
        <CardBody>
          <NoDataFallback />
        </CardBody>
      </Card>
    );
  }
  const goalUtil: FhirGoalUtil = fhirUtil(goal);
  const displayName = goalUtil.getGoalObsDisplayName();
  const resourceType = goalUtil.getObsResourceType();
  const icon = mapObservationTypeToIcon(resourceType);
  const cells: Array<React.ReactElement<any>> = [];
  const leadCell = (
    <Cell
      isLead
      key={goal.id}
      className="center"
      hasGoal={!!goal}
      decorationIcon={icon}
    >
      <CellHeader>{displayName}</CellHeader>
    </Cell>
  );

  cells.push(leadCell);
  cells.push(<MetricCell fhirGoal={goal} />);

  return (
    <Card className="center">
      <CardBody>
        {cells.length &&
          cells.map((cell, index) => React.cloneElement(cell, { key: index }))}
      </CardBody>
    </Card>
  );
};

export default GoalCard;
