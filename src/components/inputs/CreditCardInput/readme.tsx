import * as React from "react";
import { useState } from "react";

import { MockPayDockHandler } from "./components/MockPayDockHandler";
import { CreditCardInput } from ".";
import { ICreditCard } from "next-shared/src/types/ICreditCard";

const disclaimer =
  "Disclaimer: Id aute velit ullamco exercitation voluptate excepteur officia proident veniam. Non ea exercitation commodo in consectetur Lorem eu excepteur cillum nisi cillum aliqua irure mollit.";

export const DemoEmpty = () => {
  const [result, setResult] = useState<ICreditCard>();
  return (
    <div data-test="CreditCardInput-scenario-standard">
      <MockPayDockHandler>
        <div data-test="input">
          <CreditCardInput
            onInputChange={setResult}
            value={result}
            disclaimer={disclaimer}
          />
        </div>
      </MockPayDockHandler>
      <div className="debug">
        <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
};

export const DemoPrefill = () => {
  const [result, setResult] = useState<ICreditCard>({
    cardType: "mastercard",
    cardNumberLast4: "5678",
    expirationDate: "02/2019",
  });

  return (
    <div data-test="CreditCardInput-scenario-standard">
      <MockPayDockHandler>
        <div data-test="input">
          <CreditCardInput onInputChange={setResult} value={result} />
        </div>
      </MockPayDockHandler>
      <div className="debug">
        <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
};
