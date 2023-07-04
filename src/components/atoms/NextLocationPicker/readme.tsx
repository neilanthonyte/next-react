import * as React from "react";
import { useState } from "react";

import { NextLocationPicker } from ".";
import { NextLocation } from "next-shared/src/models/NextLocation";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { MemoryRouter } from "react-router";

export const DemoStandard = () => {
  return (
    <MemoryRouter>
      <NextAppHandlerWeb>
        <NextLocationPicker />
      </NextAppHandlerWeb>
    </MemoryRouter>
  );
};

export const DemoAll = () => {
  return (
    <MemoryRouter>
      <NextAppHandlerWeb>
        <NextLocationPicker onlyBookable={false} />
      </NextAppHandlerWeb>
    </MemoryRouter>
  );
};

export const DemoSelectable = () => {
  const [result, setResult] = useState<NextLocation>();
  return (
    <MemoryRouter>
      <NextAppHandlerWeb>
        <NextLocationPicker onLocationSelected={setResult} />
      </NextAppHandlerWeb>
      <div className="debug">
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </MemoryRouter>
  );
};
