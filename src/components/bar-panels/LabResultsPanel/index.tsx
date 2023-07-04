import * as React from "react";
import {
  NextBarPanel,
  NextBarPanelInfoPane,
  NextBarPanelInfoPaneTitle,
  NextBarPanelInfoPaneBody,
  NextBarPanelContentPane,
} from "../../bar/NextBarPanel";
import { NextLabResultsTable } from "../../bar/NextDocumentsTable";

export const LabResultsPanel: React.FC = () => (
  <NextBarPanel>
    <NextBarPanelInfoPane actions={null}>
      <NextBarPanelInfoPaneTitle>Lab Results</NextBarPanelInfoPaneTitle>
      <NextBarPanelInfoPaneBody>
        Control the patient access to lab results. Once released, patients can
        access their lab results via the patient app.
      </NextBarPanelInfoPaneBody>
    </NextBarPanelInfoPane>
    <NextBarPanelContentPane>
      <NextLabResultsTable />
    </NextBarPanelContentPane>
  </NextBarPanel>
);
