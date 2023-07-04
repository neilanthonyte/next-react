import * as React from "react";
import {
  NextBarPanel,
  NextBarPanelInfoPane,
  NextBarPanelInfoPaneTitle,
  NextBarPanelInfoPaneBody,
  NextBarPanelContentPane,
} from "../../bar/NextBarPanel";
import { NextLettersTable } from "../../bar/NextDocumentsTable";

export const LettersPanel: React.FC = () => {
  return (
    <NextBarPanel>
      <NextBarPanelInfoPane actions={null}>
        <NextBarPanelInfoPaneTitle>Letters</NextBarPanelInfoPaneTitle>
        <NextBarPanelInfoPaneBody>
          Control the patient access to letters. Once released, patients can
          access their letters via the patient app.
        </NextBarPanelInfoPaneBody>
      </NextBarPanelInfoPane>
      <NextBarPanelContentPane>
        <NextLettersTable />
      </NextBarPanelContentPane>
    </NextBarPanel>
  );
};
