import * as React from "react";
import { useMemo } from "react";

import { ICreditCard } from "next-shared/src/types/ICreditCard";

import { Card, CardBody, CardSecondaryContent } from "../../structure/Card";
import {
  Cell,
  CellType,
  CellDescription,
  ICellAction,
} from "../../structure/Cell";
import { creditCardIsExpired } from "../../../helpers/creditCardIsExpired";
import { DangerBadge } from "../../generic/Badge";
import { Resource, ResourceBody } from "../../generic/Resource";

interface ICreditCardCardProps {
  card?: ICreditCard;
  actions?: ICellAction[];
}

/**
 * Renders a credit card summary.
 */
export const CreditCardCard: React.FC<ICreditCardCardProps> = ({
  card,
  actions,
}) => {
  if (card == null) {
    return null;
  }

  const ccExpired = useMemo(() => creditCardIsExpired(card), [card]);

  const cardNumber = `**** **** **** ${card.cardNumberLast4}`;
  return (
    <Resource>
      <ResourceBody>
        <Card>
          <CardBody>
            <Cell decorationIcon="medical-cards" actions={actions}>
              <CellType>{card.cardType}</CellType>
              <CellDescription>Number: {cardNumber}</CellDescription>
              <CellDescription>Expiry: {card.expirationDate}</CellDescription>
            </Cell>
          </CardBody>
          <CardSecondaryContent show={ccExpired}>
            <DangerBadge icon="warning">Credit card has expired</DangerBadge>
          </CardSecondaryContent>
        </Card>
      </ResourceBody>
    </Resource>
  );
};
