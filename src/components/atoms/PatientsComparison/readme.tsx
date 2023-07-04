import * as React from "react";
import { useCallback, useState } from "react";
import * as _ from "lodash";

import {
  mockPatients,
  mockBareNextFhirPatient,
  mockRichFhirPatient,
  mockBareFhirPatient,
} from "next-shared/src/mockData/mockPatients";
import { defaultPatientDataSections } from "next-shared/src/helpers/defaultPatientDataSections";
import { mockNextLocations } from "next-shared/src/mockData/mockLocations";
import { auPatientProfileMedicareSystem } from "next-shared/src/helpers/constants";

import { delay } from "../../../helpers/delay";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { PatientDataCell } from "../../cells/PatientDataCell";
import { PatientsComparison } from ".";
import { mockPatient1Fhir } from "next-shared/src/mockData/mockFhirPatients";

const ehrId = mockNextLocations[0].ehrId;

export const DemoStandard = () => {
  const [result, setResult] = useState<fhir3.Patient>();

  // TODO consider moving to helper function
  const nextPatient = _.cloneDeep(mockPatient1Fhir);
  const ehrPatient = mockPatient1Fhir;
  nextPatient.address = [
    {
      line: ["80 Wentworth Avenue"],
      city: "Surry Hills",
      state: "NSW",
      postalCode: "2010",
      country: "Australia",
    },
  ];
  const identifiers = nextPatient.identifier
    .map((i: fhir3.Identifier) => {
      if (i.system !== auPatientProfileMedicareSystem) {
        return;
      }
      return { ...i, value: (parseInt(i.value, 10) + 1).toString() };
    })
    .filter((x: fhir3.Identifier) => !!x);

  nextPatient.identifier = identifiers;

  const handleOnSave = useCallback(async (patient: fhir3.Patient) => {
    await delay(1000);
    setResult(patient);
  }, []);

  return (
    <div data-test="PatientsComparison-scenario-standard">
      <NextAppHandlerWeb>
        <div data-test="component">
          <PatientsComparison
            ehrPatient={ehrPatient}
            nextPatient={nextPatient}
            onSave={handleOnSave}
            sections={defaultPatientDataSections}
            ehrId={ehrId}
          />
        </div>
        <div className="debug">
          Actions:{" "}
          <a data-test="reset" onClick={() => setResult(null)}>
            reset
          </a>
          <h4>Reult: </h4>
          {result &&
            defaultPatientDataSections.map((s, i) => (
              <PatientDataCell key={i} fhirPatient={result} cellName={s.name} />
            ))}
          <br />
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              Ehr source:
              <pre data-test="output">
                {JSON.stringify(ehrPatient, null, 2)}
              </pre>
            </div>
            <div style={{ flex: 1 }}>
              New:
              <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
            </div>
          </div>
        </div>
      </NextAppHandlerWeb>
    </div>
  );
};

export const DemoNextIncomplete = () => {
  const [result, setResult] = useState<fhir3.Patient>();
  const nextPatient = mockBareNextFhirPatient;
  const ehrPatient = mockPatients[0].fhir;
  const handleOnSave = useCallback(async (patient: fhir3.Patient) => {
    await delay(1000);
    setResult(patient);
  }, []);
  return (
    <div data-test="PatientsComparison-scenario-next-incomplete">
      <NextAppHandlerWeb>
        <div data-test="component">
          <PatientsComparison
            ehrPatient={ehrPatient}
            nextPatient={nextPatient}
            onSave={handleOnSave}
            sections={defaultPatientDataSections}
            ehrId={ehrId}
          />
        </div>
        <div className="debug">
          Actions:{" "}
          <a data-test="reset" onClick={() => setResult(null)}>
            reset
          </a>
          <h4>Reult: </h4>
          {result &&
            defaultPatientDataSections.map((s, i) => (
              <PatientDataCell key={i} fhirPatient={result} cellName={s.name} />
            ))}
          <br />
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              Ehr source:
              <pre data-test="output">
                {JSON.stringify(ehrPatient, null, 2)}
              </pre>
            </div>
            <div style={{ flex: 1 }}>
              New:
              <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
            </div>
          </div>
        </div>
      </NextAppHandlerWeb>
    </div>
  );
};

export const DemoEhrIncomplete = () => {
  const [result, setResult] = useState<fhir3.Patient>();
  const nextPatient = mockPatients[0].fhir;
  const ehrPatient = mockBareFhirPatient;
  const handleOnSave = useCallback(async (patient: fhir3.Patient) => {
    await delay(1000);
    setResult(patient);
  }, []);
  return (
    <div data-test="PatientsComparison-scenario-ehr-incomplete">
      <NextAppHandlerWeb>
        <div data-test="component">
          <PatientsComparison
            ehrPatient={ehrPatient}
            nextPatient={nextPatient}
            onSave={handleOnSave}
            sections={defaultPatientDataSections}
            ehrId={ehrId}
          />
        </div>
        <div className="debug">
          Actions:{" "}
          <a data-test="reset" onClick={() => setResult(null)}>
            reset
          </a>
          <h4>Reult: </h4>
          {result &&
            defaultPatientDataSections.map((s, i) => (
              <PatientDataCell key={i} fhirPatient={result} cellName={s.name} />
            ))}
          <br />
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              Ehr source:
              <pre data-test="output">
                {JSON.stringify(ehrPatient, null, 2)}
              </pre>
            </div>
            <div style={{ flex: 1 }}>
              New:
              <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
            </div>
          </div>
        </div>
      </NextAppHandlerWeb>
    </div>
  );
};

export const DemoRich = () => {
  const [result, setResult] = useState<fhir3.Patient>();
  const nextPatient = mockPatients[0].fhir;
  const ehrPatient = mockRichFhirPatient;
  const handleOnSave = useCallback(async (patient: fhir3.Patient) => {
    await delay(1000);
    setResult(patient);
  }, []);
  return (
    <div data-test="PatientsComparison-scenario-rich">
      <NextAppHandlerWeb>
        <div data-test="component">
          <PatientsComparison
            ehrPatient={ehrPatient}
            nextPatient={nextPatient}
            onSave={handleOnSave}
            sections={defaultPatientDataSections}
            ehrId={ehrId}
          />
        </div>
        <div className="debug">
          Actions:{" "}
          <a data-test="reset" onClick={() => setResult(null)}>
            reset
          </a>
          <h4>Reult: </h4>
          {result &&
            defaultPatientDataSections.map((s, i) => (
              <PatientDataCell key={i} fhirPatient={result} cellName={s.name} />
            ))}
          <br />
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              Ehr source:
              <pre data-test="output">
                {JSON.stringify(ehrPatient, null, 2)}
              </pre>
            </div>
            <div style={{ flex: 1 }}>
              New:
              <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
            </div>
          </div>
        </div>
      </NextAppHandlerWeb>
    </div>
  );
};
