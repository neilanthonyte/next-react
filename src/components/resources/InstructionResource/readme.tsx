import * as React from "react";
import { useState } from "react";

import { InstructionResource } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

const html = `
<h1>Hello world!</h1>`;

export const DemoStandard = () => {
  const [result, setResult] = useState(null);
  return (
    <div data-test="InstructionResource-scenario-standard">
      <NextAppHandlerWeb>
        <div data-test="component">
          <InstructionResource htmlMessage={html} title={"My Message"} />
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
