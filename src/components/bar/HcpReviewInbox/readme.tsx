import * as React from "react";
import { useEffect } from "react";

import {
  mockMedicalStaffSession,
  mockStaffSessionWithNextBarApp,
} from "next-shared/src/mockData/mockAuth";
import { mockEhrPatientWithAssociation } from "next-shared/src/mockData/mockEhrPatients";
import { ELayoutVariant } from "next-shared/src/types/layouts";

import { useClient } from "../../../hooks/useClient";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { VStack } from "../../structure/VStack";
import { PendingStyleDebug } from "../../debug/PendingStyleDebug";
import { HcpReviewInbox } from ".";

export const DemoStandard = () => {
  return (
    <PendingStyleDebug>
      <NextAppHandlerWeb>
        <Inner />
      </NextAppHandlerWeb>
    </PendingStyleDebug>
  );
};

const Inner = () => {
  const client = useClient();

  useEffect(() => {
    client.auth.setSession(mockMedicalStaffSession);
  }, []);

  // TODO add in local patient support

  return (
    <VStack>
      <div data-test="HcpReviewInbox-scenario-standard">
        <div data-test="component">
          <HcpReviewInbox />
        </div>
      </div>
      <div data-test="HcpReviewInbox-scenario-constrained">
        <div data-test="component" style={{ height: "300px" }}>
          <HcpReviewInbox variant={ELayoutVariant.Compact} />
        </div>
      </div>
    </VStack>
  );
};
