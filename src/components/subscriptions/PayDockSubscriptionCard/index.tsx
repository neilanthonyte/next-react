import * as React from "react";
import { useMemo } from "react";
import moment from "moment";

import { IPaydockSubscription } from "next-shared/src/types/PaydockTypes";
import { toCurrency } from "next-shared/src/helpers/toCurrency";

import { Card, CardBody } from "../../structure/Card";
import {
  Cell,
  CellDescription,
  CellBody,
  CellType,
  ICellAction,
} from "../../structure/Cell";

export interface IPayDockSubscriptionCardProps {
  subscription: IPaydockSubscription;
  isSelected?: boolean;
  children?: React.ReactElement;
  onChange?: () => void;
}

export const PayDockSubscriptionCard: React.FC<
  IPayDockSubscriptionCardProps
> = ({ subscription, children, onChange }) => {
  const price = `${toCurrency(subscription.amount)} / ${
    subscription.schedule.interval
  }`;
  const lastBilling = moment(subscription.schedule.last_assessment).calendar();
  const nextBilling = moment(subscription.schedule.next_assessment).calendar();

  const actions = useMemo<ICellAction[]>(() => {
    if (!onChange) return;
    return [{ label: "Edit", onClick: onChange }];
  }, [onChange]);

  return (
    <Card>
      <CardBody>
        <Cell decorationIcon="subscription" actions={actions}>
          <CellBody>
            <CellType>
              {subscription.description || "Active subscription"}
            </CellType>
            <CellDescription>Price: {price}</CellDescription>
            <CellDescription>Last billing: {lastBilling}</CellDescription>
            <CellDescription>Next billing: {nextBilling}</CellDescription>
            {children}
          </CellBody>
        </Cell>
      </CardBody>
    </Card>
  );
};
