import * as React from "react";

import { PatientSelectableAppointmentsWithDetailsList } from "../../atoms/PatientSelectableAppointmentsWithDetailsList";
import {
  NextBarPanel,
  NextBarPanelInfoPane,
  NextBarPanelInfoPaneTitle,
  NextBarPanelInfoPaneBody,
  NextBarPanelContentPane,
} from "../../bar/NextBarPanel";

/**
 * Component rendering a list of session patient upcoming appointments with details
 */
export const AppointmentsPanel: React.FC = () => (
  <NextBarPanel>
    <NextBarPanelInfoPane actions={null}>
      <NextBarPanelInfoPaneTitle>Appointments</NextBarPanelInfoPaneTitle>
      <NextBarPanelInfoPaneBody>
        List of upcoming patient appointments and related forms.
      </NextBarPanelInfoPaneBody>
    </NextBarPanelInfoPane>
    <NextBarPanelContentPane>
      <PatientSelectableAppointmentsWithDetailsList />
    </NextBarPanelContentPane>
  </NextBarPanel>
);
