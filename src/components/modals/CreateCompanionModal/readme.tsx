import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { CreateCompanionModal } from ".";
import { useState } from "react";
import { useSyncedScopesForLocation } from "../../../hooks/core/useSyncedScopesForLocation";
import { useClient } from "../../../hooks/useClient";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "CreateCompanionModal",
      scenario: "standard",
    },
  });

  const client = useClient();
  const { companions, isLoading } = useSyncedScopesForLocation(
    client.auth.session?.locationId,
  );

  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <>
      <CreateCompanionModal
        open={isOpen}
        onDismiss={() => setIsOpen(false)}
        onSuccess={setOutput}
      />
      <h3>Companions</h3>
      <ul>
        {isLoading ? (
          (companions || []).map((c, index) => (
            <li key={`companion-${index}`}>{c.label}</li>
          ))
        ) : (
          <li>Loading...</li>
        )}
      </ul>
      <p>
        <a onClick={() => setIsOpen(true)}>Open modal</a>
      </p>
    </>
  );
};
