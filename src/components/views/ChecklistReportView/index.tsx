import * as React from "react";
import { useState } from "react";

import { Page, PageBody, PageHeader, PageTitle } from "../../structure/Page";
import { PageSection, PageSectionBody } from "../../structure/PageSection";
import { DatesSelector } from "../../generic/DatesSelector";
import { ISODate, unixTimestamp } from "next-shared/src/types/dateTypes";
import { useTasksBetweenDatesForFrequency } from "../../../hooks/useTasksBetweenDatesForFrequency";
import { unixToIsoDate } from "../../../helpers/unixToISODate";
import { TFrequencies } from "next-shared/src/types/TFrequencies";
import { Dropdown } from "../../generic/Dropdown";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import { VStack } from "../../structure/VStack";
import { PlaceholderView } from "../../views/PlaceholderView";
import { Widget } from "../../generic/Widget";
import { ChecklistTaskImages } from "../../ops-tasks/ChecklistTaskImages";
import { ChecklistTaskTable } from "../../ops-tasks/ChecklistTaskTable";

export interface IChecklistReportViewProps {}

const taskFrequencies = [
  "Weekly",
  "Monthly",
  "Quarterly",
  "Biannual",
  "Annual",
];

export const ChecklistReportView: React.FC<IChecklistReportViewProps> = () => {
  const [frequency, setFrequency] = useState<string>(taskFrequencies[0]);
  const [range, setRange] = useState<ISODate[]>(null);

  const searchDates = async (
    startDate: unixTimestamp,
    endDate: unixTimestamp,
  ) => {
    setRange([unixToIsoDate(startDate), unixToIsoDate(endDate)]);
  };

  const {
    error,
    isLoading,
    data: tasks,
    refetch,
  } = useTasksBetweenDatesForFrequency(
    frequency,
    range && range[0],
    range && range[1],
  );

  const hasData = Array.isArray(tasks) && tasks.length > 0;
  const hasImages = hasData && !!tasks.find((t) => !!t.imageTmpUrl);

  return (
    <Page>
      <PageHeader>
        <PageTitle>Task report</PageTitle>
        <DatesSelector
          onDateRangeChange={searchDates}
          frequencies={[TFrequencies.Month]}
        />
        {/* HACK turn into a standard layout approach */}
        <div style={{ width: "35px" }} />
        <Dropdown
          options={taskFrequencies}
          selectedOption={frequency}
          staticLabel={`Frequency: ${frequency}`}
          onOptionChange={setFrequency}
          stdSize={EStandardSizes.Small}
          widthInChars={20}
        />
      </PageHeader>
      <PageBody>
        <PageSection>
          <PageSectionBody>
            <LoadingBlock isLoading={isLoading}>
              {!!error && <ErrorPlaceholder retry={refetch} />}
              {hasData ? (
                <VStack>
                  {hasImages && (
                    <Widget label="Image gallery">
                      <ChecklistTaskImages checklistTasks={tasks} />
                    </Widget>
                  )}
                  <ChecklistTaskTable checklistTasks={tasks} />
                </VStack>
              ) : (
                <PlaceholderView
                  icon="info"
                  stdSize={EStandardSizes.Small}
                  instruction="No data matching criteria - please try adjusting the settings"
                />
              )}
            </LoadingBlock>
          </PageSectionBody>
        </PageSection>
      </PageBody>
    </Page>
  );
};
