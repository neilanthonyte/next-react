import * as React from "react";
import { useState } from "react";

import { mockPatients } from "next-shared/src/mockData/mockPatients";

import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { PatientContactCell } from ".";

export const DemoStandard = () => {
  return (
    <div data-test="PatientContactCell-scenario-standard">
      <NextAppHandlerWeb>
        <div data-test="component">
          <PatientContactCell fhirPatient={mockPatients[0].fhir} />
        </div>
      </NextAppHandlerWeb>
    </div>
  );
};

export const DemoAction = () => {
  const [result, setResult] = useState(null);
  return (
    <div data-test="PatientContactCell-scenario-action">
      <NextAppHandlerWeb>
        <div data-test="component">
          <PatientContactCell
            fhirPatient={mockPatients[0].fhir}
            actions={[
              { label: "Click me", onClick: () => setResult("Clicked") },
            ]}
          />
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
