import * as React from "react";
import { useState } from "react";

import { CovidForm, ICovidRisk } from ".";

export const Demo = () => {
  const [result, setResult] = useState<ICovidRisk>();
  return (
    <>
      <CovidForm onSuccess={setResult} />
      <div className="debug">
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </>
  );
};
