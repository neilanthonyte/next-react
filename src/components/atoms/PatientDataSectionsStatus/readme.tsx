import * as React from "react";
import { useState } from "react";

import { mockPatientDataSectionsWithStatus } from "next-shared/src/mockData/mockPatients";

import { PatientDataSectionsStatus } from ".";

export const DemoStandard = () => {
  return (
    <div data-test="PatientDataSectionsStatus-scenario-standard">
      <div data-test="component">
        <PatientDataSectionsStatus
          dataSections={mockPatientDataSectionsWithStatus}
        />
      </div>
    </div>
  );
};

export const DemoState = () => {
  return (
    <div data-test="PatientDataSectionsStatus-scenario-state">
      <div data-test="component">
        <PatientDataSectionsStatus
          dataSections={mockPatientDataSectionsWithStatus}
          showStatus={true}
        />
      </div>
    </div>
  );
};

export const DemoTitle = () => {
  return (
    <div data-test="PatientDataSectionsStatus-scenario-title">
      <div data-test="component">
        <PatientDataSectionsStatus
          title="Here are the available patient data sections"
          dataSections={mockPatientDataSectionsWithStatus}
        />
      </div>
    </div>
  );
};

export const DemoAction = () => {
  const [result, setResult] = useState<string>(null);
  return (
    <div data-test="PatientDataSectionsStatus-scenario-import">
      <div data-test="component">
        <PatientDataSectionsStatus
          dataSections={mockPatientDataSectionsWithStatus}
          action={{ label: "Click", onClick: () => setResult("Clicked") }}
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
