import * as React from "react";

import { ELayoutVariant } from "next-shared/src/types/layouts";

import { PatientSelectableAppointmentsWithDetailsList } from "../../atoms/PatientSelectableAppointmentsWithDetailsList";
import { PatientMetricsList } from "../../atoms/PatientMetricsList";
import {
  TabbedContent,
  TabbedContentPanel,
  TabbedContentPanels,
  TabbedContentTab,
  TabbedContentTabs,
} from "../../structure/TabbedContent";
import { TReviewTabName, useReviewTabs } from "./useReviewTabs";
import { PatientLifestyleList } from "../../atoms/PatientLifestyleList";
import { PatientFormsList } from "../../atoms/PatientFormsList";
import { ReviewHandler } from "../../handlers/ReviewHandler";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { EhrPatientProfile } from "../../bar-panels/ProfilePanel";

export interface IHcpReviewInboxProps {
  variant?: ELayoutVariant;
}

export const HcpReviewInbox: React.FC<IHcpReviewInboxProps> = ({ variant }) => {
  const tabs = useReviewTabs();

  return (
    <ReviewHandler>
      <TabbedContent variant={variant}>
        <TabbedContentTabs>
          {tabs.map((tab, index) => (
            <TabbedContentTab
              key={`tab-${index}`}
              isLoading={tab.isLoading}
              label={tab.label}
              counter={tab.counter}
            />
          ))}
        </TabbedContentTabs>
        <TabbedContentPanels>
          {tabs.map((tab, index) => (
            <TabbedContentPanel key={`panel-${index}`}>
              <HcpReviewInboxContent activeTab={tab.name} />
            </TabbedContentPanel>
          ))}
        </TabbedContentPanels>
      </TabbedContent>
    </ReviewHandler>
  );
};

export interface IHcpReviewInboxContentProps {
  activeTab: TReviewTabName;
}
export const HcpReviewInboxContent: React.FC<IHcpReviewInboxContentProps> = ({
  activeTab,
}) => {
  const { nextPatient } = useSyncedSessionData();

  switch (activeTab) {
    case "Appointments":
      return (
        <PatientSelectableAppointmentsWithDetailsList
          key={activeTab}
          // showReviewOnly={true}
        />
      );
    case "Metrics":
      return nextPatient ? (
        <PatientMetricsList key={activeTab} showReviewOnly={true} />
      ) : (
        <EhrPatientProfile />
      );

    case "Lifestyle": {
      return nextPatient ? (
        <PatientLifestyleList key={activeTab} showReviewOnly={true} />
      ) : (
        <EhrPatientProfile />
      );
    }
    case "Forms": {
      return nextPatient ? (
        <PatientFormsList key={activeTab} showReviewOnly={true} />
      ) : (
        <EhrPatientProfile />
      );
    }

    default:
      console.warn(`${activeTab} tab not supported.`);
      return null;
  }
};
