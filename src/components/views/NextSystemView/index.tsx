import * as React from "react";

import { Page, PageBody } from "../../structure/Page";

import { DisclaimerSection } from "../../pageSections/DisclaimerSection";
import { ToolsSection } from "../../pageSections/ToolsSection";
import { RoomsSection } from "../../pageSections/RoomsSection";
import { CompanionsSection } from "../../pageSections/CompanionsSection";

export const NextSystemView: React.FC = () => {
  return (
    <Page>
      <PageBody>
        <RoomsSection />
        <CompanionsSection />
        <ToolsSection />
        <DisclaimerSection />
      </PageBody>
    </Page>
  );
};
