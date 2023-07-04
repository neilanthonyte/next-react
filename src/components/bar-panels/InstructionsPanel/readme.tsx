import * as React from "react";
import { useEffect, useState } from "react";
import { mockMedicalStaffSessionWithApp } from "next-shared/src/mockData/mockAuth";
import { ClientSession as Session } from "next-shared/src/models/ClientSession";

import { useClient } from "../../../hooks/useClient";

import { DebugPosition } from "../../../debug/DebugPosition";
import { InstructionsPanel } from ".";
import { useDebug } from "next-react/src/debug/DemoWrapper";

export const Inner = () => {
  const client = useClient();
  const [isFixed, setIsFixed] = useState(false);

  const toggleFixed = () => {
    setIsFixed(!isFixed);
  };

  useEffect(() => {
    client.auth.setSession(mockMedicalStaffSessionWithApp);
  }, [client]);

  return (
    <>
      <DebugPosition fixed={isFixed}>
        <InstructionsPanel />
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
  useDebug({
    setSessionDebug: true,
    test: {
      componentName: "InstructionPanel",
      scenario: "standard",
    },
  });
  return <InstructionsPanel />;
};
