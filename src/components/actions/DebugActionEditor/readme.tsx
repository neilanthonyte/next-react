import React from "react";
import { useState } from "react";

import { Action } from "next-shared/src/models/Action";
import { DebugActionEditor } from ".";
import { PatientActionPlan } from "../PatientActionPlan";
import { PatientActionsList } from "../PatientActionsList";
import { useDebug } from "next-react/src/debug/DemoWrapper";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";

const Inner = () => {
  const [result, setResult] = useState<Action>(null);
  const { nextPatient } = useSyncedSessionData();

  return (
    <div data-test="DebugActionEditor-scenario-standard">
      <p>Action list</p>
      <PatientActionsList patientId={nextPatient?.patientId} />
      <br />
      <div data-test="component">
        {/* HACK force a new form on update */}
        <DebugActionEditor onCreate={setResult} key={JSON.stringify(result)} />
      </div>
      <div className="debug">
        Actions:{" "}
        <a data-test="reset" onClick={() => setResult(null)}>
          reset
        </a>
        <br />
        <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
      </div>
      <br />
      <h2>Action Plan</h2>
      <PatientActionPlan />
    </div>
  );
};

export const DemoStandard = () => {
  useDebug({
    setSessionDebug: true,
    test: {
      componentName: "DebugActionEditor",
      scenario: "standard",
    },
  });
  return <Inner />;
};
