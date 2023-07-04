import * as React from "react";
import { useState } from "react";

import { RequireSessionPersistence } from ".";
import { AppContext, IAppContextValue } from "../../../contexts/AppContext";

export const DemoStandard = () => {
  const [sessionPersistenceComplete, setSessionPersistenceComplete] =
    useState<boolean>(false);
  const [sessionPersistenceError, setSessionPersistenceError] =
    useState<Error>();

  const appContextValue: IAppContextValue = {
    persistSession: undefined,
    sessionPersistenceComplete,
    sessionPersistenceLoading: undefined,
    sessionPersistenceError,
    sessionPersistenceRetry: async () => {
      setSessionPersistenceError(null);
      return null;
    },
  };

  return (
    <>
      <AppContext.Provider value={appContextValue}>
        <div style={{ height: "100vh" }}>
          <RequireSessionPersistence>Session ready!</RequireSessionPersistence>
        </div>
      </AppContext.Provider>
      <div className="debug">
        <a onClick={() => setSessionPersistenceError(new Error())}>Set error</a>
        {" | "}
        <a onClick={() => setSessionPersistenceComplete(true)}>Load session</a>
      </div>
    </>
  );
};
