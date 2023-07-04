import * as React from "react";
import { useEffect, useState } from "react";
import { MemoryRouter } from "react-router-dom";

import { mockMedicalStaffSession } from "next-shared/src/mockData/mockAuth";
import { ClientSession as Session } from "next-shared/src/models/ClientSession";

import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { useClient } from "../../../hooks/useClient";
import { DebugPosition } from "../../../debug/DebugPosition";
import { MockNextBarHandler } from "../../handlers/MockNextBarHandler";
import { CompanionsPanel } from ".";

export const Inner = () => {
  const client = useClient();

  const [isFixed, setIsFixed] = useState(false);

  const toggleFixed = () => {
    setIsFixed(!isFixed);
  };

  useEffect(() => {
    client.auth.setSession(mockMedicalStaffSession);
  }, [client]);

  return (
    <>
      <DebugPosition fixed={isFixed}>
        <CompanionsPanel />
      </DebugPosition>
      <div className="debug">
        <p>
          Position:{" "}
          <button onClick={toggleFixed}>
            {isFixed ? "relative" : "fixed"}
          </button>
        </p>
      </div>
    </>
  );
};

export const Demo = () => {
  return (
    <MemoryRouter>
      <NextAppHandlerWeb>
        <MockNextBarHandler>
          {" "}
          <Inner />{" "}
        </MockNextBarHandler>
      </NextAppHandlerWeb>
    </MemoryRouter>
  );
};
