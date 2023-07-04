import * as React from "react";
import { useEffect } from "react";

import { mockMedicalStaffSessionWithApp } from "next-shared/src/mockData/mockAuth";
import { MemoryRouter } from "react-router";

import { AppPatientFormView } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { useClient } from "../../../hooks/useClient";
import { RequireAppSession } from "../../handlers/RequireSession";
import { RequireNextPatient } from "../../handlers/RequireNextPatient";
import { ConfigContext } from "../../../contexts/ConfigContext";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { FormSideBar } from "../../forms/FormSideBar";
import { HStack, Solid } from "../../structure/HStack";
import { ActiveFormHandler } from "../../forms/ActiveFormHandler";
import { NextScopeLocationPayDockHandler } from "../../handlers/NextScopeLocationPayDockHandler";

const Inner = () => {
  const client = useClient();
  const { config } = useRequiredContext(ConfigContext);

  useEffect(() => {
    if (!config.useRealClient) {
      client.auth.setSession(mockMedicalStaffSessionWithApp);
    }
  }, []);

  return (
    <ActiveFormHandler>
      <HStack>
        <Solid>
          <div style={{ width: "200px" }}>
            <FormSideBar />
          </div>
        </Solid>
        <AppPatientFormView formSlug="onboard" successPath="#" />
      </HStack>
    </ActiveFormHandler>
  );
};

export const DemoStandard = () => {
  return (
    <>
      <p>
        This example uses a real client. As such, please create a companion via
        the Manager app and assign a patient via the Next Bar.
      </p>
      <NextAppHandlerWeb configOverride={{ useRealClient: true }}>
        <MemoryRouter>
          <NextScopeLocationPayDockHandler>
            <RequireAppSession>
              <RequireNextPatient>
                <Inner />
              </RequireNextPatient>
            </RequireAppSession>
          </NextScopeLocationPayDockHandler>
        </MemoryRouter>
      </NextAppHandlerWeb>
    </>
  );
};
