import * as React from "react";
import { useCallback } from "react";

import { FirebaseContext } from "../../../contexts/FirebaseContext";
import { FirebaseHandler } from "../../../handlers/FirebaseHandler";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const FirebaseExample: React.FC = ({}) => {
  return (
    <NextAppHandlerWeb>
      <FirebaseHandler>
        <_FirebaseExample />
      </FirebaseHandler>
    </NextAppHandlerWeb>
  );
};

const _FirebaseExample: React.FC = ({}) => {
  const { logEvent } = useRequiredContext(FirebaseContext);

  const onClick = useCallback(
    () =>
      logEvent("Test Event", {
        testDataKey: "testDataValue",
      }),
    [logEvent],
  );

  return <button onClick={onClick}>Log {`'Test Event'`} to firebase.</button>;
};
