import * as React from "react";

import { mockStaffMemberSession } from "next-shared/src/mockData/mockAuth";

import { useClient } from "../../../hooks/useClient";
import { VStack } from "../../structure/VStack";
import { ReviewHandler } from "../../handlers/ReviewHandler";
import { PatientSelectableAppointmentsWithDetailsList } from ".";
import { useEffect } from "react";

export const DemoStandard = () => {
  const client = useClient();

  useEffect(() => {
    client.auth.setSession(mockStaffMemberSession);
  }, []);

  return (
    <VStack>
      <div data-test="PatientSelectableAppointmentsWithDetailsList-scenario-standard">
        <div data-test="component">
          <PatientSelectableAppointmentsWithDetailsList />
        </div>
      </div>
      <div data-test="PatientSelectableAppointmentsWithDetailsList-scenario-review">
        <ReviewHandler>
          <h4>With review</h4>
          <div data-test="component">
            <PatientSelectableAppointmentsWithDetailsList />
          </div>
        </ReviewHandler>
      </div>
      <div data-test="PatientSelectableAppointmentsWithDetailsList-scenario-review-only">
        <ReviewHandler>
          <h4>Only reviewable</h4>
          <div data-test="component">
            <PatientSelectableAppointmentsWithDetailsList
              showReviewOnly={true}
            />
          </div>
        </ReviewHandler>
      </div>
    </VStack>
  );
};
