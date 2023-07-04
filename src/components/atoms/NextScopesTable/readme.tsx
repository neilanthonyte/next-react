import * as React from "react";
import { useEffect } from "react";

import { mockMedicalStaffSession } from "next-shared/src/mockData/mockAuth";

import { useClient } from "../../../hooks/useClient";
import { MockNextBarHandler } from "../../handlers/MockNextBarHandler";
import { NextScopesTable } from ".";
import { useSyncedScopesForLocation } from "../../../hooks/core/useSyncedScopesForLocation";

export const DemoStandard = () => {
  const client = useClient();
  const { scopes, rooms, companions } = useSyncedScopesForLocation(
    client.auth.session?.locationId,
  );

  useEffect(() => {
    client.auth.setSession(mockMedicalStaffSession);
  }, []);

  if (!scopes) {
    return <div>Loading...</div>;
  }

  return (
    <MockNextBarHandler>
      <h3>All</h3>
      <NextScopesTable scopes={scopes} />
      <h3>Companions</h3>
      <NextScopesTable scopes={rooms} />
      <h3>Rooms</h3>
      <NextScopesTable scopes={companions} />
    </MockNextBarHandler>
  );
};
