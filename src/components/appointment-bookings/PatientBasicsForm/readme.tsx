import * as React from "react";
import { useState } from "react";

import { PatientBasicsForm, IPatientBasicsFormData } from ".";
import { mockPatients } from "next-shared/src/mockData/mockPatients";
import { addParamsToUrl } from "../../../helpers/addParamsToUrl";
import { Patient } from "next-shared/src/models/Patient";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const PatientBasicsFormDebug = () => {
  return (
    <>
      <h4>Patient form tips</h4>
      <ul>
        <li>
          Auto mock patient: <code>?mockPatient=</code> (
          <a href={addParamsToUrl({ mockPatient: undefined })}>add</a>)
        </li>
        <li>
          Mock with known existing patient: <code>?existingPatient=</code> (
          <a href={addParamsToUrl({ existingPatient: undefined })}>add</a>)
        </li>
        <li>
          Default values via env vars: <code>MOCK_PATIENT_EMAIL</code>,{" "}
          <code>MOCK_PATIENT_PHONE</code>
        </li>
      </ul>
    </>
  );
};

export const Demo = () => {
  const [result, setResult] = useState<fhir3.Patient>();
  const [prefill, setPrefill] = useState<IPatientBasicsFormData>();

  return (
    <>
      <NextAppHandlerWeb>
        <PatientBasicsForm
          key={prefill ? JSON.stringify(prefill) : "blank"}
          onSuccess={(r) => setResult(r.Patient)}
          prefillData={prefill}
        />
      </NextAppHandlerWeb>
      <div className="debug">
        <h4>Prefill</h4>
        <ul>
          {mockPatients.map((f, index) => (
            <li key={index}>
              <a onClick={() => setPrefill({ ...prefill, Patient: f.fhir })}>
                {f.getDisplayName()}
              </a>
            </li>
          ))}
        </ul>
        <br /> <br />
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </>
  );
};

export const DemoAccount = () => {
  const [result, setResult] = useState<fhir3.Patient>();
  const [prefill, setPrefill] = useState<IPatientBasicsFormData>();

  return (
    <>
      <NextAppHandlerWeb>
        <PatientBasicsForm
          key={prefill ? JSON.stringify(prefill) : "blank"}
          onSuccess={(data) => setResult(data.Patient)}
          prefillData={prefill}
          showCreateAccount={true}
        />
      </NextAppHandlerWeb>
      <div className="debug">
        <h4>Prefill</h4>
        <ul>
          {mockPatients.map((f, index) => (
            <li key={index}>
              <a onClick={() => setPrefill({ ...prefill, Patient: f.fhir })}>
                {f.getDisplayName()}
              </a>
            </li>
          ))}
        </ul>
        <br /> <br />
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </>
  );
};
