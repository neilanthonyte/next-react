import * as React from "react";
import { useState } from "react";
import * as _ from "lodash";

import {
  mockPatients,
  mockRichFhirPatient,
} from "next-shared/src/mockData/mockPatients";

import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { PatientEmergencyContactCell } from ".";

export const DemoStandard = () => {
  return (
    <div data-test="PatientEmergencyContactCell-scenario-standard">
      <NextAppHandlerWeb>
        <div data-test="component">
          <PatientEmergencyContactCell fhirPatient={mockPatients[0].fhir} />
        </div>
      </NextAppHandlerWeb>
    </div>
  );
};

export const DemoNoContact = () => {
  const patient = _.cloneDeep(mockPatients[0].fhir);
  delete patient.contact;
  return (
    <div data-test="PatientEmergencyContactCell-scenario-empty">
      <NextAppHandlerWeb>
        <div data-test="component">
          <PatientEmergencyContactCell fhirPatient={patient} />
        </div>
      </NextAppHandlerWeb>
    </div>
  );
};

export const DemoMultipleContacts = () => {
  return (
    <div data-test="PatientEmergencyContactCell-scenario-multiple">
      <NextAppHandlerWeb>
        <div data-test="component">
          <PatientEmergencyContactCell fhirPatient={mockRichFhirPatient} />
        </div>
      </NextAppHandlerWeb>
    </div>
  );
};

export const DemoAction = () => {
  const [result, setResult] = useState(null);
  return (
    <div data-test="PatientEmergencyContactCell-scenario-action">
      <NextAppHandlerWeb>
        <div data-test="component">
          <PatientEmergencyContactCell
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
