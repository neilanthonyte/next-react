import * as React from "react";
import { useState } from "react";
import * as _ from "lodash";

import {
  mockPatients,
  mockRichFhirPatient,
} from "next-shared/src/mockData/mockPatients";

import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { PatientAddressCell } from ".";

export const DemoStandard = () => {
  return (
    <div data-test="PatientAddressCell-scenario-standard">
      <NextAppHandlerWeb>
        <div data-test="component">
          <PatientAddressCell fhirPatient={mockPatients[0].fhir} />
        </div>
      </NextAppHandlerWeb>
    </div>
  );
};

export const DemoNoAddress = () => {
  const patient = _.cloneDeep(mockPatients[0].fhir);
  delete patient.address;
  return (
    <div data-test="PatientAddressCell-scenario-empty">
      <NextAppHandlerWeb>
        <div data-test="component">
          <PatientAddressCell fhirPatient={patient} />
        </div>
      </NextAppHandlerWeb>
    </div>
  );
};

export const DemoMultipleAddresses = () => {
  return (
    <div data-test="PatientAddressCell-scenario-multiple">
      <NextAppHandlerWeb>
        <div data-test="component">
          <PatientAddressCell fhirPatient={mockRichFhirPatient} />
        </div>
      </NextAppHandlerWeb>
    </div>
  );
};

export const DemoAction = () => {
  const [result, setResult] = useState(null);
  return (
    <div data-test="PatientAddressCell-scenario-action">
      <NextAppHandlerWeb>
        <div data-test="component">
          <PatientAddressCell
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
