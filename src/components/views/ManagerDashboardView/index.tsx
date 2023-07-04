import * as React from "react";
import FluidGrid from "react-fluid-grid";
import { useClient } from "next-react/src/hooks/useClient";
import { Page, PageBody } from "../../structure/Page";

import { NextStatisticsProvider } from "../../handlers/NextStatisticsProvider";
import { TimeFrameHandler } from "../../handlers/TimeFrameHandler";

import { PageSection, PageSectionBody } from "../../structure/PageSection";
import { SystemUsageWidget } from "../../widgets/SystemUsageWidget";
import { ClinicCareFactorWidget } from "../../widgets/ClinicCareFactorWidget";
import { PopulationWidget } from "../../widgets/PopulationWidget";
import { AppointmentsWidget } from "../../widgets/AppointmentsWidget";
import { CompanionsWidget } from "../../widgets/CompanionsWidget";
import { RoomsWidget } from "../../widgets/RoomsWidget";
import { OpsArticlesWidget } from "../../widgets/OpsArticlesWidget";
import { OpsResourcesWidget } from "../../widgets/OpsResourcesWidget";
import { NewsArticlesWidget } from "../../widgets/NewsArticlesWidget";
import { ActionsWidget } from "../../widgets/ActionsWidget";
import { ChecklistDailyProgressWidget } from "../../widgets/ChecklistDailyProgressWidget";
import { ChecklistOverviewWidget } from "../../widgets/ChecklistOverviewWidget";

const timeFrame = new Map([
  ["7 Days", 7],
  ["30 Days", 30],
]);
/**
 * This is the home screen dashboard used in the NextManager's App
 */
export const ManagerDashboardView: React.FC = () => {
  const client = useClient();
  const session = client.auth.session;
  // determines whether this staff member belongs to an EHR.
  // various widgets below requires an EHR to perform the right queries
  const isEhrStaffMember = !!session.staffMember.ehrId;

  // TODO move to a styling file
  const styleStrategies = [
    {
      mediaQuery: "(max-width: 1100px)",
      style: { numberOfColumns: 1, gutterHeight: 5, gutterWidth: 0 },
    },
    {
      mediaQuery: "(min-width: 1100px) and (max-width: 1500px)",
      style: { numberOfColumns: 2, gutterHeight: 15, gutterWidth: 15 },
    },
    {
      mediaQuery: "(min-width: 1500px)",
      style: { numberOfColumns: 3, gutterHeight: 30, gutterWidth: 30 },
    },
  ];
  return (
    <Page>
      <PageBody>
        <PageSection>
          <PageSectionBody>
            <TimeFrameHandler initialRangeKey="7 Days" rangeOptions={timeFrame}>
              <NextStatisticsProvider>
                <FluidGrid styleStrategies={styleStrategies}>
                  <ChecklistOverviewWidget />
                  <ChecklistDailyProgressWidget />
                  {isEhrStaffMember && <ActionsWidget />}
                  {isEhrStaffMember && <CompanionsWidget />}
                  {isEhrStaffMember && <RoomsWidget />}
                  <OpsArticlesWidget />
                  <OpsResourcesWidget />
                  <NewsArticlesWidget />
                  {isEhrStaffMember && <AppointmentsWidget />}
                  {isEhrStaffMember && <SystemUsageWidget />}
                  {isEhrStaffMember && <ClinicCareFactorWidget />}
                  {isEhrStaffMember && <PopulationWidget />}
                </FluidGrid>
              </NextStatisticsProvider>
            </TimeFrameHandler>
          </PageSectionBody>
        </PageSection>
      </PageBody>
    </Page>
  );
};
