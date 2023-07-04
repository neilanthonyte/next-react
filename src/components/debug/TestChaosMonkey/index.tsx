import * as React from "react";
import { useCallback, useState } from "react";

import { NextClient } from "../../../client/NextClient";
import { useClient } from "../../../hooks/useClient";
import { PendingContent } from "../../structure/PendingContent";

/**
 * Chaos Monkey test component.
 * Switch out the client method call for one of your choice.
 */
export const TestChaosMonkey: React.FC = () => {
  const client = useClient();

  const [state, setState] = useState<boolean>(null);

  const clientCall = useCallback(() => {
    setState(undefined);
    try {
      client.legals.retrieveTermsAndConditions().then(() => setState(true));
    } catch (e) {
      setState(false);
    }
  }, [client]);

  return (
    <div>
      <button onClick={clientCall}>Do a client call</button>
      {state !== null && (
        <PendingContent check={state !== undefined}>
          <span>Client call {`${state ? "succeeded" : "failed"}`}</span>
        </PendingContent>
      )}
    </div>
  );
};
