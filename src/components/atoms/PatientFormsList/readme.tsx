import * as React from "react";

import { PatientFormsList } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { ReviewHandler } from "../../handlers/ReviewHandler";
import { VStack } from "../../structure/VStack";

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      <VStack>
        <div data-test="PatientFormsList-scenario-standard">
          <div data-test="component">
            <PatientFormsList />
          </div>
        </div>
        <div data-test="PatientFormsList-scenario-review">
          <h4>With review</h4>
          <ReviewHandler>
            <div data-test="component">
              <PatientFormsList />
            </div>
          </ReviewHandler>
        </div>
        <div data-test="PatientFormsList-scenario-review-only">
          <h4>Only reviewable</h4>
          <ReviewHandler>
            <div data-test="component">
              <PatientFormsList showReviewOnly={true} />
            </div>
          </ReviewHandler>
        </div>
      </VStack>
    </NextAppHandlerWeb>
  );
};
