import * as React from "react";

import {
  mockEhrPatientWithAssociation,
  mockEhrPatientNoAssociation,
} from "next-shared/src/mockData/mockEhrPatients";

import { PatientEhrAssociation } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const DemoWithAssociation = () => {
  return (
    <div data-test="PatientEhrAssociation-scenario-with-association">
      <NextAppHandlerWeb configOverride={{ useRealClient: false }}>
        <div data-test="component">
          <PatientEhrAssociation
            ehrAssociation={mockEhrPatientWithAssociation.association}
          />
        </div>
      </NextAppHandlerWeb>
    </div>
  );
};

export const DemoNoAssociation = () => {
  return (
    <div data-test="PatientEhrAssociation-scenario-without-association">
      <NextAppHandlerWeb configOverride={{ useRealClient: false }}>
        <div data-test="component">
          <PatientEhrAssociation
            ehrAssociation={mockEhrPatientNoAssociation.association}
          />
        </div>
      </NextAppHandlerWeb>
    </div>
  );
};
