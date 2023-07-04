import { mockStaffSessionWithNextBarApp } from "next-shared/src/mockData/mockAuth";
import * as React from "react";
import { useEffect } from "react";

import { useActiveLocation } from ".";
import { NextAppHandlerWeb } from "../../../components/handlers/NextAppHandlerWeb";
import { useClient } from "../../useClient";

const Inner = () => {
  const { activeLocation: currentLocation } = useActiveLocation();
  const client = useClient();

  useEffect(() => {
    client.auth.setSession(mockStaffSessionWithNextBarApp);
  }, []);

  return <pre>{JSON.stringify(currentLocation, null, 2)}</pre>;
};

export const DemoStandard = () => {
  return (
    <div data-test="useCurrentLocation-scenario-standard">
      <NextAppHandlerWeb>
        <div data-test="component">
          <Inner />
        </div>
      </NextAppHandlerWeb>
    </div>
  );
};
