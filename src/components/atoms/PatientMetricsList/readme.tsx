import * as React from "react";
import { useState } from "react";

import { useClient } from "../../../hooks/useClient";
import { VStack } from "../../structure/VStack";
import { ReviewHandler } from "../../handlers/ReviewHandler";
import { PatientMetricsList } from ".";
import { mockMedicalStaffSessionWithAppAndPatient } from "next-shared/src/mockData/mockAuth";

export const DemoStandard = () => {
  const client = useClient();
  const [result, setResult] = useState(null);

  React.useEffect(() => {
    // TODO determine if the correct session
    client.auth.setSession(mockMedicalStaffSessionWithAppAndPatient);
  }, []);

  return (
    <div data-test="PatientMetricsList-scenario-standard">
      <VStack>
        <div data-test="PatientMetricsList-scenario-standard">
          <div data-test="component">
            <PatientMetricsList />
          </div>
        </div>
        <div data-test="PatientMetricsList-scenario-review">
          <h3>With review</h3>
          <ReviewHandler>
            <div data-test="component">
              <PatientMetricsList />
            </div>
          </ReviewHandler>
        </div>
        <div data-test="PatientMetricsList-scenario-review-only">
          <h3>Only reviewable</h3>
          <ReviewHandler>
            <div data-test="component">
              <PatientMetricsList showReviewOnly={true} />
            </div>
          </ReviewHandler>
        </div>
      </VStack>
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
