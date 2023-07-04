import * as React from "react";

import { ELayoutVariant } from "next-shared/src/types/layouts";

import {
  NextBarPanel,
  NextBarPanelInfoPane,
  NextBarPanelInfoPaneTitle,
  NextBarPanelInfoPaneBody,
  NextBarPanelContentPane,
} from "../../bar/NextBarPanel";
import { HcpReviewInbox } from "../../bar/HcpReviewInbox";

export const ReviewsPanel: React.FC = () => (
  <NextBarPanel>
    <NextBarPanelInfoPane>
      <NextBarPanelInfoPaneTitle>Review Items</NextBarPanelInfoPaneTitle>
      <NextBarPanelInfoPaneBody>
        The items displayed here have been provided by the patient.
      </NextBarPanelInfoPaneBody>
    </NextBarPanelInfoPane>
    <NextBarPanelContentPane>
      <HcpReviewInbox variant={ELayoutVariant.Compact} />
    </NextBarPanelContentPane>
  </NextBarPanel>
);
