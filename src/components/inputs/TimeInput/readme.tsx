import * as React from "react";
import { useState } from "react";

import { TimeInput } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const DemoDefaults = () => {
  const [result, setResult] = useState<string>(null);
  return (
    <div data-test="TimeInput-scenario-defaults">
      <NextAppHandlerWeb>
        <div data-test="component">
          <TimeInput onInputChange={setResult} value={result} />
        </div>
      </NextAppHandlerWeb>
      <div className="debug">
        Actions:{" "}
        <a data-test="reset" onClick={() => setResult(null)}>
          reset
        </a>
        <br />
        <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
};

export const DemoExistingValue = () => {
  const [result, setResult] = useState<string>("9:42");
  return (
    <div data-test="TimeInput-scenario-existingValue">
      <NextAppHandlerWeb>
        <div data-test="component">
          <TimeInput onInputChange={setResult} value={result} />
        </div>
      </NextAppHandlerWeb>
      <div className="debug">
        Actions:{" "}
        <a data-test="reset" onClick={() => setResult(null)}>
          reset
        </a>
        <br />
        <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
};
