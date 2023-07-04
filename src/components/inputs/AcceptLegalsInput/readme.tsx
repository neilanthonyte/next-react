import * as React from "react";
import { useState } from "react";

import { addParamsToUrl } from "../../../helpers/addParamsToUrl";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { AcceptLegalsInput } from "./";

export const DemoStandard: React.FC = () => {
  const [value, setValue] = useState(true);

  return (
    <NextAppHandlerWeb>
      <div data-test="standard-usage">
        <div data-test="acceptLegals-input">
          <AcceptLegalsInput onInputChange={setValue} value={value} />
        </div>
        Selected: {`"`}
        <span data-test="output">{JSON.stringify(value)}</span>
        {`"`}
        <br />
      </div>
      <ul>
        <li>
          Add <code>?debugClientMethodsError=</code>{" "}
          <a
            href={addParamsToUrl({
              debugClientMethodsError: ["legals.retrieveTermsAndConditions"],
            })}
          >
            (add now)
          </a>
          <a
            href={addParamsToUrl({
              debugClientMethodsError: undefined,
            })}
          >
            (remove now)
          </a>
        </li>
      </ul>
    </NextAppHandlerWeb>
  );
};

export const DemoDisabled: React.FC = () => {
  const [value, setValue] = useState();

  return (
    <NextAppHandlerWeb>
      <div data-test="disabled">
        <div data-test="acceptLegals-input">
          <AcceptLegalsInput
            onInputChange={setValue}
            value={value}
            disabled={true}
          />
        </div>
        Selected: {`"`}
        <span data-test="output">{JSON.stringify(value)}</span>
        {`"`}
        <br />
      </div>
    </NextAppHandlerWeb>
  );
};

export const DemoError: React.FC = () => {
  const [value, setValue] = useState();

  return (
    <NextAppHandlerWeb configOverride={{ debugRequestErrorCount: 1 }}>
      <div>
        <div>
          <AcceptLegalsInput onInputChange={setValue} value={value} />
        </div>
        Selected: {`"`}
        <span data-test="output">{JSON.stringify(value)}</span>
        {`"`}
        <br />
      </div>
    </NextAppHandlerWeb>
  );
};

export const DemoNext: React.FC = () => {
  const [value, setValue] = useState();

  return (
    <NextAppHandlerWeb configOverride={{ useRealClient: true }}>
      <div>
        <div>
          <AcceptLegalsInput onInputChange={setValue} value={value} />
        </div>
        Selected: {`"`}
        <span data-test="output">{JSON.stringify(value)}</span>
        {`"`}
        <br />
      </div>
    </NextAppHandlerWeb>
  );
};
