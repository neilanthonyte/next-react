import * as React from "react";
import { useState } from "react";

import { CreditCardSummary } from ".";
import { MockPayDockHandler } from "../../inputs/CreditCardInput/components/MockPayDockHandler";
import { VStack } from "../../structure/VStack";

export const DemoStandard = () => {
  return (
    <MockPayDockHandler>
      <VStack>
        <CreditCardSummary
          card={{
            cardNumberLast4: "1234",
            cardType: "visa",
            expirationDate: "01/26",
          }}
        />
        <CreditCardSummary
          card={{
            cardNumberLast4: "1234",
            cardType: "visa",
            expirationDate: "01/26",
          }}
          onSetCard={() => {}}
        />
        <CreditCardSummary
          card={{
            cardNumberLast4: "1234",
            cardType: "visa",
            expirationDate: "01/20",
          }}
        />
      </VStack>
    </MockPayDockHandler>
  );
};

export const DemoEditable = () => {
  const [card, setCard] = useState(null);
  return (
    <MockPayDockHandler>
      <CreditCardSummary
        onSetCard={setCard}
        card={card}
        includeSaveToRecord={true}
      />
    </MockPayDockHandler>
  );
};
