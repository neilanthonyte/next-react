import { times } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";

import { SocketLoadTesting } from ".";
import { useClient } from "../../hooks/useClient";
import { useDebug } from "../DemoWrapper";

export const DemoStandard = () => {
  const { setActions } = useDebug({
    test: {
      componentName: "SocketLoadTesting",
      scenario: "standard",
    },
    requireSession: "provider",
    setSessionDebug: true,
  });

  const client = useClient();
  const [count, setCount] = useState<number>(5);

  useEffect(() => {
    setActions([
      {
        label: "Increase",
        action: () => setCount(count + 1),
      },
      {
        label: "Decrease",
        action: () => setCount(Math.max(1, count - 1)),
      },
    ]);
  }, [count]);

  const sessionId = client.auth.session?.sessionId;
  const command =
    "PATTERN=src/{debug/PatientFetch/index.tsx,debug/SocketLoadTesting/index.tsx} yarn dev";

  return (
    <>
      <p>Load using:</p>
      <p>
        <pre>{command}</pre>
      </p>
      <p>Count: {count}</p>
      {times(count, (i) => (
        <>
          {!!sessionId && <SocketLoadTesting sessionId={sessionId} key={i} />}
        </>
      ))}
    </>
  );
};
