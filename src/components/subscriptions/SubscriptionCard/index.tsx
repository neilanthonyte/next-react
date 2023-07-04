import * as React from "react";
import { ICmsSubscription } from "next-shared/src/types/ICmsSubscription";

import { toCurrency } from "next-shared/src/helpers/toCurrency";
import {
  CellHeader,
  CellDescription,
  Cell,
  CellType,
} from "../../structure/Cell";
import { Card, CardBody } from "../../structure/Card";

export interface ISubscriptionCardProps {
  subscription: ICmsSubscription;
  overflow?: "scroll";
  isSelected?: boolean;
}

export const SubscriptionCard: React.FC<ISubscriptionCardProps> = ({
  subscription,
  isSelected,
  overflow = null,
}) => {
  const price = `${toCurrency(subscription.price)} / ${subscription.interval}`;

  return (
    <Card state={isSelected ? "selected" : null} overflow={overflow}>
      <CardBody>
        <Cell>
          <CellType>{subscription.description}</CellType>
          <CellDescription>Price: {price}</CellDescription>
        </Cell>
      </CardBody>
    </Card>
  );
};
