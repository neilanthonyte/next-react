import * as React from "react";
import { useState } from "react";
import { PatientBookingForSelfOptions } from "../../../PatientBookingForSelfOptions";

/*
 * TODO: This example and tests have been moved to appointment-bookings/PatientBookingForSelfOptions
 * This example needs to be redone and contain the full AppointmentTypeAndHcpSelection
 */
export const DemoStandard = () => {
  const [result, setResult] = useState<boolean>();

  return (
    <div data-test="PatientBookingForSelfOptions-scenario-standard">
      <div data-test="component">
        <PatientBookingForSelfOptions selected={result} onSelect={setResult} />
      </div>
      <div className="debug">
        <a onClick={() => setResult(null)} data-test="clear">
          Clear
        </a>
        <p>
          <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
        </p>
      </div>
    </div>
  );
};
