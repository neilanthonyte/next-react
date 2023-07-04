import * as React from "react";
import { useState, useEffect, useContext } from "react";

import { NextScopeLocationPayDockHandler } from ".";
import { NextAppHandlerWeb } from "../NextAppHandlerWeb";
import { NextClient } from "../../../client/NextClient";
import { useClient } from "../../../hooks/useClient";
import { PayDockContext } from "../../../contexts/PayDockContext";
import { mockPatientSession } from "next-shared/src/mockData/mockAuth";

const Inner = () => {
  const client = useClient();
  const paydock = useContext(PayDockContext);

  useEffect(() => {
    client.auth.setSession(mockPatientSession);
  }, []);

  return <div>{JSON.stringify(paydock, null, 2)}</div>;
};

export const DemoStandard = () => {
  const [result, setResult] = useState();
  return (
    <>
      <NextAppHandlerWeb
        configOverride={{ useRealClient: false, persistSessionOnLoad: false }}
      >
        <NextScopeLocationPayDockHandler>
          <Inner />
        </NextScopeLocationPayDockHandler>
      </NextAppHandlerWeb>
      <div className="debug">
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </>
  );
};
