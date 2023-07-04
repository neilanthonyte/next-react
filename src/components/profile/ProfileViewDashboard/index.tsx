import * as React from "react";

import { Page, PageBody } from "../../structure/Page";
import {
  PageSection,
  PageSectionBody,
  PageSectionHeader,
  PageSectionTitle,
} from "../../structure/PageSection";
import { PatientForms, PatientLifestyle } from "../../atoms/PatientSections";
import { ReviewHandler } from "../../handlers/ReviewHandler";

export interface IProfileViewDashboardInnerProps {}

export const ProfileViewDashboard: React.FC<
  IProfileViewDashboardInnerProps
> = () => {
  return (
    <ReviewHandler>
      <Page>
        <PageBody>
          <PageSection>
            <PageSectionHeader>
              <PageSectionTitle>Patient submitted forms</PageSectionTitle>
            </PageSectionHeader>
            <PageSectionBody>
              <PatientForms />
            </PageSectionBody>
          </PageSection>
          <PageSection>
            <PageSectionHeader>
              <PageSectionTitle>Lifestyle factors</PageSectionTitle>
            </PageSectionHeader>
            <PageSectionBody>
              <PatientLifestyle />
            </PageSectionBody>
          </PageSection>
        </PageBody>
      </Page>
    </ReviewHandler>
  );
};
