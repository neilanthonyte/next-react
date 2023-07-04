import * as React from "react";

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

export const RoomsPanel: React.FC = () => {
  const client = useClient();
  const { rooms } = useSyncedScopesForLocation(client.auth.session?.locationId);
  const [Pager, paginatedContent] = usePager(8, rooms);

  return (
    <NextBarPanel>
      <NextBarPanelInfoPane actions={null}>
        <NextBarPanelInfoPaneTitle>Rooms</NextBarPanelInfoPaneTitle>
        <NextBarPanelInfoPaneBody>
          The current status of the clinic rooms. Patients are automatically
          allocated to rooms. Please add or remove manually with caution.
        </NextBarPanelInfoPaneBody>
      </NextBarPanelInfoPane>
      <NextBarPanelContentPane>
        <NextBarContent>
          <NextBarContentBody>
            <NextScopesTable scopes={paginatedContent} hideFormAssign={true} />
          </NextBarContentBody>
          <NextBarContentFooter>
            <Pager />
          </NextBarContentFooter>
        </NextBarContent>
      </NextBarPanelContentPane>
    </NextBarPanel>
  );
};
