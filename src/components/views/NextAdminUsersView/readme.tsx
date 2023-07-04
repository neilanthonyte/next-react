import * as React from "react";
import { useState } from "react";
import { MemoryRouter } from "react-router-dom";

import { NextAdminUsersView } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const DemoStandard = () => {
  const [result, setResult] = useState();
  return (
    <>
      <NextAppHandlerWeb>
        <MemoryRouter>
          <NextAdminUsersView />
        </MemoryRouter>
      </NextAppHandlerWeb>
      <div className="debug">
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </>
  );
};
