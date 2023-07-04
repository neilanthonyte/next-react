import * as React from "react";
import { useState } from "react";

import { LocationCard } from "./";
import { MemoryRouter } from "react-router-dom";
import { mockNextLocations } from "next-shared/src/mockData/mockLocations";
import { NextLocation } from "next-shared/src/models/NextLocation";

export const DemoStandard = () => {
  return (
    <MemoryRouter>
      <div data-test="LocationCard-scenario-standard">
        {mockNextLocations.map((loc) => (
          <LocationCard location={loc} key={loc.slug} />
        ))}
      </div>
    </MemoryRouter>
  );
};

export const DemoSelectable = () => {
  const [result, setResult] = useState<NextLocation>();
  return (
    <MemoryRouter>
      <div data-test="LocationCard-scenario-standard">
        {mockNextLocations.map((loc) => (
          <LocationCard onSelect={setResult} location={loc} key={loc.slug} />
        ))}
        <div>
          <pre>{JSON.stringify(result && result.serialize(), null, 2)}</pre>
          <p>
            <button onClick={() => setResult(null)}>Reset clicked state</button>
          </p>
        </div>
      </div>
    </MemoryRouter>
  );
};
