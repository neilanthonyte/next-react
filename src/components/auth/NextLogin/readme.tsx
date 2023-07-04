import * as React from "react";
import { useEffect, useState } from "react";

import { NextLogin } from ".";
import { useClient } from "../../../hooks/useClient";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

const Inner = () => {
  const client = useClient();
  const [sso, setSSO] = useState<boolean>();
  const [asApp, setAsApp] = useState<boolean>();

  return (
    <div data-test="NextLogin-scenario-standard">
      <div data-test="component">
        {client.auth.session ? (
          <>
            <h3>Already logged in</h3>
            <p>See below for session controls</p>
          </>
        ) : (
          <NextLogin allowSSO={sso} asApp={asApp} />
        )}
      </div>

      <div className="debug">
        <p>
          <a onClick={() => setSSO(!sso)}>Toggle SSO</a>{" "}
          <a onClick={() => setAsApp(!asApp)}>Toggle as app</a>
        </p>
        <pre data-test="output">
          {JSON.stringify(client.auth.session, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      <Inner />
    </NextAppHandlerWeb>
  );
};
