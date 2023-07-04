import * as React from "react";
import { useState } from "react";

import { NextLocationListing } from ".";
import { mockNextLocations } from "next-shared/src/mockData/mockLocations";
import { NextLocation } from "next-shared/src/models/NextLocation";

export const DemoStandard = () => {
  const [result, setResult] = useState<NextLocation>();
  return (
    <div data-test="NextLocationListing-scenario-standard">
      <div data-test="component">
        <NextLocationListing
          location={mockNextLocations[0]}
          onClick={setResult}
        />
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
