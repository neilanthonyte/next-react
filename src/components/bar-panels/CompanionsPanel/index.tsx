import * as React from "react";

import { EhrPatient } from "next-shared/src/models/EhrPatient";
import { Scope } from "next-shared/src/models/Scope";

import { usePager } from "../../../hooks/usePager";
import { NextScopesTable } from "../../atoms/NextScopesTable";
import {
  NextBarContent,
  NextBarContentBody,
  NextBarContentFooter,
} from "../../bar/NextBarContent";
import {
  NextBarPanel,
  NextBarPanelInfoPane,
  NextBarPanelInfoPaneTitle,
  NextBarPanelInfoPaneBody,
  NextBarPanelContentPane,
} from "../../bar/NextBarPanel";
import { useSyncedScopesForLocation } from "../../../hooks/core/useSyncedScopesForLocation";
import { useClient } from "../../../hooks/useClient";
import { LoadingBlock } from "../../structure/LoadingBlock";

export const CompanionsPanel: React.FC = () => {
  const client = useClient();
  const { companions, isLoading, error } = useSyncedScopesForLocation(
    client.auth.session?.locationId,
  );
  const [Pager, paginatedContent] = usePager(8, companions);

  const canAssign = (ehrPatient: EhrPatient, scope: Scope) => {
    if (!ehrPatient) {
      return false;
    }
    // is there a patient in this scope already
    if (scope.ehrPatient) {
      return false;
    }
    // are they already on another companion
    if (
      !!companions.find(
        (c) => c.ehrPatient?.ehrPatientId === ehrPatient.ehrPatientId,
      )
    ) {
      return false;
    }
    return true;
  };

  return (
    <NextBarPanel>
      <NextBarPanelInfoPane actions={null}>
        <NextBarPanelInfoPaneTitle>Companions</NextBarPanelInfoPaneTitle>
        <NextBarPanelInfoPaneBody>
          View the status of the clinic companion devices. Patients can be
          allocated and removed as part of the onboarding process.
        </NextBarPanelInfoPaneBody>
      </NextBarPanelInfoPane>
      <NextBarPanelContentPane>
        <NextBarContent>
          <NextBarContentBody>
            <LoadingBlock isLoading={isLoading} error={error}>
              <NextScopesTable
                scopes={paginatedContent}
                canAssign={canAssign}
              />
            </LoadingBlock>
          </NextBarContentBody>
          <NextBarContentFooter>
            <Pager />
          </NextBarContentFooter>
        </NextBarContent>
      </NextBarPanelContentPane>
    </NextBarPanel>
  );
};
