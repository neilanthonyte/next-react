import * as React from "react";
import { useState } from "react";

import { PatientMetricsList } from "../../atoms/PatientMetricsList";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { VStack } from "../../structure/VStack";
import { ReviewHandler } from ".";

export const DemoStandard = () => {
  const [result, setResult] = useState(null);
  return (
    <div data-test="ReviewHandler-scenario-standard">
      <NextAppHandlerWeb>
        <div data-test="component">
          <VStack>
            <ReviewHandler>
              <PatientMetricsList />
            </ReviewHandler>
            <PatientMetricsList />
          </VStack>
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
