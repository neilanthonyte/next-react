import * as React from "react";
import { useState } from "react";

import { ExemptionsForm, IExceptionCriteria } from ".";

export const Demo = () => {
  const [result, setResult] = useState<IExceptionCriteria>();
  return (
    <>
      <ExemptionsForm onSuccess={setResult} prefillData={{ age: true }} />
      <div className="debug">
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </>
  );
};
