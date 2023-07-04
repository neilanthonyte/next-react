import * as React from "react";
import { useState } from "react";

import { mockPatients } from "next-shared/src/mockData/mockPatients";
import { EPatientDataSectionNames } from "next-shared/src/types/IPatientDataSection";

import { PatientDataCell } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const DemoStandard = () => {
  return (
    <div data-test="PatientDataCell-scenario-standard">
      <NextAppHandlerWeb>
        <div data-test="component">
          <PatientDataCell
            fhirPatient={mockPatients[0].fhir}
            cellName={EPatientDataSectionNames.Address}
          />
        </div>
      </NextAppHandlerWeb>
    </div>
  );
};

export const DemoAction = () => {
  const [result, setResult] = useState(null);
  return (
    <div data-test="PatientDataCell-scenario-action">
      <NextAppHandlerWeb>
        <div data-test="component">
          <PatientDataCell
            fhirPatient={mockPatients[0].fhir}
            cellName={EPatientDataSectionNames.Address}
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
