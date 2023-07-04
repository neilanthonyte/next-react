import * as React from "react";
import { useState } from "react";

import { PatientAccountCreationForm } from ".";
import { mockPatients } from "next-shared/src/mockData/mockPatients";
import { Patient } from "next-shared/src/models/Patient";
import { MockNextApiClient } from "../../handlers/MockNextApiClient";
import { useClient } from "../../../hooks/useClient";

export const DemoStandard = () => {
  return (
    <MockNextApiClient>
      <Inner />
    </MockNextApiClient>
  );
};

const Inner = () => {
  const client = useClient();
  const [callback, setCallback] = useState<string>();
  const [patient, setPatient] = useState<Patient>();

  return (
    <>
      <PatientAccountCreationForm
        patient={patient?.fhir}
        onAuthenticatedWithNewAccount={() => setCallback("Account created")}
      />
      <div className="debug">
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
        <h4>Session</h4>
        <pre>{JSON.stringify(client.auth.session, null, 2)}</pre>
        <h4>Callback</h4>
        <pre>{callback}</pre>
      </div>
    </>
  );
};
