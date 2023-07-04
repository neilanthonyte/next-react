import * as React from "react";
import { useState, useCallback } from "react";

import { CreditCardModal } from ".";
import { MockPayDockHandler } from "../../inputs/CreditCardInput/components/MockPayDockHandler";
import { Button } from "../../generic/Button";

export const DemoStandard = () => {
  const [result, setResult] = useState();
  const [open, setOpen] = useState(true);

  const handleOnSuccess = useCallback((data) => {
    setResult(data);
    setOpen(false);
  }, []);

  return (
    <MockPayDockHandler>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <CreditCardModal
        onSuccess={handleOnSuccess}
        onClose={() => setOpen(false)}
        open={open}
      />
      <div className="debug">
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </MockPayDockHandler>
  );
};
