import * as React from "react";
import { useCallback } from "react";

import { CreditCardSummary } from "../../payments/CreditCardSummary";
import { ICreditCard } from "next-shared/src/types/ICreditCard";

export interface ICreditCardInputProps {
  value?: ICreditCard;
  onInputChange?: (cardDetails: ICreditCard) => void;
  disclaimer?: string;
}

/**
 * Provides a text input.
 */
export const CreditCardInput: React.FC<ICreditCardInputProps> = ({
  value,
  onInputChange,
  disclaimer,
}) => {
  // wait for the card to be set
  const onChange = useCallback(
    async (card) => {
      onInputChange && onInputChange(card);
    },
    [onInputChange],
  );

  return (
    <div data-test-card={JSON.stringify(value)} data-test="summary">
      <CreditCardSummary
        card={value}
        onSetCard={onChange}
        disclaimer={disclaimer}
      />
    </div>
  );
};
