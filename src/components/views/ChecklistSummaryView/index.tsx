import * as React from "react";
import { useEffect, useState } from "react";

import { ChecklistTable } from "../../ops-tasks/ChecklistTable";
import { ChecklistChart } from "../../ops-tasks/ChecklistChart";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { DatesSelector } from "../../generic/DatesSelector";
import { Page, PageBody, PageHeader, PageTitle } from "../../structure/Page";
import { PageSection, PageSectionBody } from "../../structure/PageSection";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { PlaceholderView } from "../../views/PlaceholderView";
import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { unixToIsoDate } from "../../../helpers/unixToISODate";
import { useClient } from "../../../hooks/useClient";
import { TFrequencies } from "next-shared/src/types/TFrequencies";
import { useQuery } from "react-query";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import { VStack } from "../../structure/VStack";
import { Widget } from "../../generic/Widget";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

export interface IChecklistReportViewProps {}

export const ChecklistSummaryView: React.FC<IChecklistReportViewProps> = () => {
  const client = useClient();

  const [dateRange, setDateRange] = useState<unixTimestamp[]>(null);

  const {
    isLoading,
    error,
    data: dayPreviews,
    refetch,
  } = useQuery(`dayPreviews-${dateRange ? dateRange.join() : ""}`, () => {
    if (dateRange === null) {
      return null;
    }
    return client.tasks.retrieveDailyTaskSummariesBetweenDates(
      unixToIsoDate(dateRange[0]),
      unixToIsoDate(dateRange[1]),
    );
  });

  useEffect(() => {
    refetch();
  }, [dateRange]);

  const hasData = Array.isArray(dayPreviews) && dayPreviews.length > 0;

  return (
    <Page>
      <PageHeader>
        <PageTitle>Past tasks</PageTitle>
        <DatesSelector
          onDateRangeChange={(start, end) => setDateRange([start, end])}
          frequencies={[TFrequencies.Month]}
          maxDate={currentUnixTimestamp()}
        />
      </PageHeader>
      <PageBody>
        <PageSection>
          <PageSectionBody>
            <LoadingBlock isLoading={isLoading}>
              {!!error && <ErrorPlaceholder retry={refetch} />}
              {hasData ? (
                <VStack>
                  <Widget>
                    <ChecklistChart dayPreviews={dayPreviews} />
                  </Widget>
                  <ChecklistTable dayPreviews={dayPreviews} />
                </VStack>
              ) : (
                <PlaceholderView
                  icon="info"
                  stdSize={EStandardSizes.Small}
                  instruction="No data available"
                />
              )}
            </LoadingBlock>
          </PageSectionBody>
        </PageSection>
      </PageBody>
    </Page>
  );
};
