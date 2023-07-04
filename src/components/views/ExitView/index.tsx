import * as React from "react";

import { Page, PageBody } from "../../structure/Page";
import {
  PageSection,
  PageSectionBody,
  PageSectionHeader,
  PageSectionTitle,
} from "../../structure/PageSection";

export const ExitView: React.FC = () => (
  <Page>
    <PageBody>
      <PageSection>
        <PageSectionHeader>
          <PageSectionTitle>Thank you for your time.</PageSectionTitle>
        </PageSectionHeader>
        <PageSectionBody>
          <p>
            We ask that you please return this tablet to one of our team
            members.
          </p>
        </PageSectionBody>
      </PageSection>
    </PageBody>
  </Page>
);
