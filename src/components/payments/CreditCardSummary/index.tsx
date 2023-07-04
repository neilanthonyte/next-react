import * as React from "react";
import { useState, useCallback, useMemo } from "react";
import * as _ from "lodash";

import { ICreditCard } from "next-shared/src/types/ICreditCard";
import { Button } from "../../generic/Button";
import { CreditCardModal } from "../../modals/CreditCardModal";
import { creditCardIsExpired } from "../../../helpers/creditCardIsExpired";
import { DangerBadge } from "../../generic/Badge";

import { ErrorMessage } from "../../generic/Message";
import { Resource, ResourceBody } from "../../generic/Resource";
import { VStack } from "../../structure/VStack";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
import { NoDataFallback } from "../../structure/NoDataFallback";
const css = cssComposer(styles, "CreditCard");

interface ICreditCardSummaryProps {
  card?: ICreditCard;
  onSetCard?: (card: ICreditCard, saveToRecord: boolean) => void;
  disclaimer?: string;
  includeSaveToRecord?: boolean;
}

/**
 * Renders a credit card summary and the ability to collect a new card.
 */
export const CreditCardSummary: React.FC<ICreditCardSummaryProps> = ({
  card,
  onSetCard,
  disclaimer,
  includeSaveToRecord,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOnSuccess = useCallback(
    async (card: ICreditCard, saveToRecord: boolean) => {
      await onSetCard(card, saveToRecord);
      setIsModalOpen(false);
    },
    [],
  );

  const ccExpired = useMemo(() => creditCardIsExpired(card), [card]);
  const hasCard = !!card?.cardNumberLast4;

  if (!hasCard && !onSetCard) {
    return null;
  }

  return (
    <>
      {hasCard ? (
        <Resource>
          <ResourceBody>
            <VStack>
              <div className={css("")}>
                <label className={css("type")}>{card.cardType}</label>{" "}
                <span className={css("number")}>
                  XXXX XXXX XXXX {card.cardNumberLast4}
                </span>
                <span className={css("expiry")}>
                  {!!card.expirationDate &&
                    (ccExpired ? (
                      <DangerBadge icon="warning" size="sm">
                        Exp. {card.expirationDate}
                      </DangerBadge>
                    ) : (
                      <small>Exp. {card.expirationDate}</small>
                    ))}
                </span>{" "}
                {!!onSetCard && (
                  <span data-test="changeCard">
                    <Button
                      className={css("edit")}
                      onClick={() => setIsModalOpen(true)}
                    >
                      Edit
                    </Button>
                  </span>
                )}
              </div>
              {ccExpired && (
                <ErrorMessage>
                  Your credit card has expired. Please update your card details.
                </ErrorMessage>
              )}
            </VStack>
          </ResourceBody>
        </Resource>
      ) : (
        <span data-test="setCard">
          <NoDataFallback
            message="No credit cards on record"
            actions={[
              {
                label: "Add a card",
                onClick: () => setIsModalOpen(true),
              },
            ]}
          />
        </span>
      )}
      <CreditCardModal
        onSuccess={handleOnSuccess}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        disclaimer={disclaimer}
        includeSaveToRecord={includeSaveToRecord}
      />
    </>
  );
};
