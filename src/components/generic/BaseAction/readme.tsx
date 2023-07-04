import * as React from "react";
import { useState } from "react";

import { VStack } from "../../structure/VStack";
import { BaseAction } from ".";
import { OpsAction } from "next-shared/src/models/OpsAction";
import { mockOpsActions } from "next-shared/src/mockData/mockOpsActions";

export const DemoStandard = () => {
  const [action, setAction] = useState<OpsAction>();

  return (
    <div data-test="Action-scenario-standard">
      <VStack>
        {mockOpsActions.map((a) => (
          <BaseAction
            key={`a-${action.id}`}
            action={a.toBaseAction()}
            onClick={() => setAction(a)}
          />
        ))}
      </VStack>
      <div style={{ maxWidth: "300px" }}>
        <VStack>
          {mockOpsActions.map((a) => (
            <BaseAction
              key={`b-${action.id}`}
              action={a.toBaseAction()}
              onClick={() => setAction(a)}
            />
          ))}
        </VStack>
      </div>
      <div className="debug">
        <pre>{JSON.stringify(action?.serialize(), null, 2)}</pre>
      </div>
    </div>
  );
};
