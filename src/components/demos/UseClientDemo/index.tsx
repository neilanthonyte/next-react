import * as React from "react";

import { useClient } from "../../../hooks/useClient";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const Demo = () => {
  return (
    <NextAppHandlerWeb>
      <div className="debug">
        <SessionTemporaryAcessGrantedDebug />
      </div>
    </NextAppHandlerWeb>
  );
};

export const SessionTemporaryAcessGrantedDebug = () => {
  const client = useClient();
  return (
    <>
      <h4>Session Temporary Access</h4>
      <p>
        {client.auth.sessionTemporaryAccessGranted ? "granted" : "not granted"}{" "}
        (
        <a
          onClick={() => {
            client.auth.grantSessionTemporaryAccess();
          }}
        >
          grant access
        </a>
        {" | "}
        <a onClick={() => client.auth.revokeSessionTemporaryAccess()}>
          revoke access
        </a>
        )
      </p>
    </>
  );
};
