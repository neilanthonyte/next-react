import * as React from "react";
import { useState } from "react";

import { ICreditCard } from "next-shared/src/types/ICreditCard";

import { useDebug } from "../../../debug/DemoWrapper";
import { PayDockCreditCardForm } from ".";
import { CreditCardSummary } from "../CreditCardSummary";
import {
  IPayDockContextValue,
  PayDockContext,
} from "../../../contexts/PayDockContext";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "PayDockCreditCardForm",
      scenario: "standard",
    },
  });

  const [card, setCard] = useState<ICreditCard>();
  // to test how it loads in - allows the internet speed to be reduced between page load and paydock load
  const [show, setShow] = useState<boolean>(true);

  const value: IPayDockContextValue = {
    gatewayId: "5c8f40f94aba3c6d7f3e3245",
    prefillData: {
      email: "dev.team@nextpracticehealth.com",
      nameOnCard: "Dev Team",
    },
  };

  return (
    <div onClick={() => setShow(true)} style={{ minHeight: "100px" }}>
      {show && (
        <PayDockContext.Provider value={value}>
          <PayDockCreditCardForm
            onSuccess={(card) => {
              setCard(card);
              setOutput(card);
            }}
            onSkip={() => setOutput("cancel")}
          />
        </PayDockContext.Provider>
      )}
      <div>
        <h4>Card summary</h4>
        <CreditCardSummary card={card} />
      </div>
    </div>
  );
};
