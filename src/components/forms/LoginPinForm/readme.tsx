import * as React from "react";
import { useState } from "react";

import { LoginPinForm } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const DemoStandard = () => {
  const [result, setResult] = useState(null);
  return (
    <div data-test="LoginPinForm-scenario-standard">
      <NextAppHandlerWeb>
        <div data-test="component">
          <LoginPinForm />
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
