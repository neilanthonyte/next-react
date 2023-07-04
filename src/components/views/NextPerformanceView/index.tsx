import * as React from "react";

import { Page, PageBody } from "../../structure/Page";

import { NextNetworkSection } from "../../pageSections/NextNetworkSection";
import { HcpsPerformanceSection } from "../../pageSections/HcpsPerformanceSection";

export const NextPerformanceView: React.FC = () => {
  return (
    <Page>
      <PageBody>
        <NextNetworkSection />
        <HcpsPerformanceSection />
      </PageBody>
    </Page>
  );
};
