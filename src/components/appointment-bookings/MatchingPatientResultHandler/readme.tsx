import * as React from "react";
import { useState } from "react";

import { ICheckForMatchingPatientResult } from "next-shared/src/types/ICheckForMatchingPatientResult";
import { mockPatients } from "next-shared/src/mockData/mockPatients";
import { Patient } from "next-shared/src/models/Patient";

import { MatchingPatientResultHandler } from ".";
import { MockNextApiClient } from "../../handlers/MockNextApiClient";

export const DemoStandard = () => {
  const [result, setResult] = useState<ICheckForMatchingPatientResult>();
  const [action, setAction] = useState<string>();
  const [patient, setPatient] = useState<Patient>();

  return (
    <>
      <MockNextApiClient>
        <MatchingPatientResultHandler
          patient={patient?.fhir}
          result={result}
          onAuthenticated={() => {
            setAction("Authenticated callback");
            setResult(null);
          }}
          onSkipAccountCreation={() => {
            setAction("Proceeded as guest");
            setResult(null);
          }}
          onCancel={() => {
            setResult(null);
            setAction(null);
          }}
        />
      </MockNextApiClient>
      <div className="debug">
        <h4>Scenarios</h4>
        <ul>
          <li>
            <a
              onClick={() =>
                setResult({ emailMatch: true, identifiersMatch: false })
              }
            >
              Email match
            </a>
          </li>
          <li>
            <a
              onClick={() =>
                setResult({ emailMatch: false, identifiersMatch: true })
              }
            >
              Identifiers match
            </a>
          </li>
          <li>
            <a
              onClick={() =>
                setResult({ emailMatch: false, identifiersMatch: false })
              }
            >
              No match
            </a>
          </li>
        </ul>
        <h4>Patient</h4>
        <ul>
          {mockPatients.map((p, index) => (
            <li key={index}>
              <a onClick={() => setPatient(p)}>
                {p === patient ? (
                  <strong>{p.getDisplayName()}</strong>
                ) : (
                  p.getDisplayName()
                )}
              </a>
            </li>
          ))}
        </ul>
        <h4>Action</h4>
        <pre>{action}</pre>
      </div>
    </>
  );
};
