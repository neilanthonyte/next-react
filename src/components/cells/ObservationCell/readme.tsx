import * as React from "react";
import { useCallback, useState } from "react";

import {
  mockObservationsWeight,
  mockPatientResources,
  mockReasonForVisit,
} from "next-shared/src/mockData/mockFhirPatientResources";

import { Grid } from "../../structure/Grid";
import { ObservationCell } from ".";

const allObs = Object.values(mockPatientResources).flat();

export const DemoStandard = () => {
  return (
    <div data-test="ObservationCell-scenario-standard">
      <div data-test="component">
        <ObservationCell observation={mockObservationsWeight[0]} />
      </div>
    </div>
  );
};

export const DemoAllMock = () => {
  return (
    <Grid>
      {allObs.map((obs, i) => (
        <ObservationCell
          key={`alcohol${i}`}
          observation={obs as fhir3.Observation}
        />
      ))}
    </Grid>
  );
};

export const DemoReview = () => {
  const [result, setResult] = useState<string>(null);
  const handleOnAccept = useCallback(
    async (obsIds) => setResult(`Accept ${obsIds[0]}`),
    [],
  );
  const handleOnReject = useCallback(
    async (obsIds) => setResult(`Reject ${obsIds[0]}`),
    [],
  );
  const handleOnTranscribe = useCallback(
    async (obsIds) => setResult(`Transcribe ${obsIds[0]}`),
    [],
  );
  return (
    <div data-test="ObservationCell-scenario-review">
      <div data-test="component">
        <ObservationCell
          onAccept={handleOnAccept}
          onReject={handleOnReject}
          observation={mockObservationsWeight[0]}
        />
        <ObservationCell
          onTranscribe={handleOnTranscribe}
          observation={mockReasonForVisit[0]}
        />
      </div>

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
