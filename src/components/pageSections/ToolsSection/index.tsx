import * as React from "react";
import {
  PageSection,
  PageSectionHeader,
  PageSectionTitle,
  PageSectionBody,
} from "../../structure/PageSection";
import ContentGrid from "../../structure/ContentGrid";
import { AppointmentBookingTool } from "../../tools/AppointmentBookingTool";

export interface IToolsSectionProps {}

export const ToolsSection: React.FC<IToolsSectionProps> = ({}) => {
  return (
    <PageSection>
      <PageSectionHeader>
        <PageSectionTitle>Tools</PageSectionTitle>
      </PageSectionHeader>
      <PageSectionBody>
        <ContentGrid columns={2}>
          <AppointmentBookingTool />
        </ContentGrid>
      </PageSectionBody>
    </PageSection>
  );
};
