import * as React from "react";

import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { VStack } from "../../structure/VStack";
import { PatientLifestyleList } from ".";
import { ReviewHandler } from "../../handlers/ReviewHandler";

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      <VStack>
        <div data-test="PatientLifestyleList-scenario-standard">
          <div data-test="component">
            <PatientLifestyleList />
          </div>
        </div>
        <div data-test="PatientLifestyleList-scenario-review">
          <ReviewHandler>
            <h4>With review</h4>
            <div data-test="component">
              <PatientLifestyleList />
            </div>
          </ReviewHandler>
        </div>
        <div data-test="PatientLifestyleList-scenario-review-only">
          <ReviewHandler>
            <h4>Only reviewable</h4>
            <div data-test="component">
              <PatientLifestyleList showReviewOnly={true} />
            </div>
          </ReviewHandler>
        </div>
      </VStack>
    </NextAppHandlerWeb>
  );
};
