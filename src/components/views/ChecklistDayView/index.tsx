import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { useClient } from "../../../hooks/useClient";
import { Checklist } from "next-shared/src/models/Checklist";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import { Page, PageHeader, PageTitle, PageBody } from "../../structure/Page";
import {
  PageSection,
  PageSectionHeader,
  PageSectionBody,
} from "../../structure/PageSection";
import { ISODateToLocale } from "../../../helpers/ISODateToLocale";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { Badge } from "../../generic/Badge";
import { ChecklistTaskImages } from "../../ops-tasks/ChecklistTaskImages";
import { ChecklistTaskTable } from "../../ops-tasks/ChecklistTaskTable";

export interface IChecklistDayViewProps {}

export const ChecklistDayView: React.FC<IChecklistDayViewProps> = ({}) => {
  const client = useClient();
  const { date } = useParams<any>();
  const [checklist, setChecklist] = useState<Checklist>(null);

  const { refetch, error, isLoading } = useQuery(
    `checklist-${date}`,
    () => {
      if (!client.auth.session) {
        return setChecklist(null);
      }
      client.tasks.retrieveTasks(date).then(setChecklist);
    },
    { enabled: false },
  );

  useEffect(() => {
    refetch();
  }, [date, client.auth.session]);

  const dailyTasks = useMemo(() => {
    if (checklist === null) {
      return;
    }
    return checklist.checklistTasks.filter((checklistTask) =>
      checklistTask.doesMatchFrequency("daily"),
    );
  }, [checklist]);

  return (
    <Page>
      <PageHeader>
        <PageTitle>Tasks for {ISODateToLocale(date)}</PageTitle>
        {!!checklist?.dayPreview && (
          <p>
            <Badge variant={TColorVariants.Success}>
              {checklist.dayPreview.completedTasks}
            </Badge>{" "}
            complete
            {/* HACK */}
            <span style={{ width: "2em", display: "inline-block" }} />
            <Badge variant={TColorVariants.Danger}>
              {checklist.dayPreview.incompleteTasks}
            </Badge>{" "}
            incomplete
          </p>
        )}
      </PageHeader>
      <PageBody>
        <LoadingBlock isLoading={isLoading}>
          {!!error && <ErrorPlaceholder retry={refetch} />}
          {!!checklist && (
            <>
              <PageSection>
                <PageSectionHeader>
                  <h4>Images</h4>
                </PageSectionHeader>
                <PageSectionBody>
                  <ChecklistTaskImages checklistTasks={dailyTasks} />
                </PageSectionBody>
              </PageSection>
              <PageSection>
                <PageSectionHeader>
                  <h4>Tasks</h4>
                </PageSectionHeader>
                <PageSectionBody>
                  <ChecklistTaskTable checklistTasks={dailyTasks} />
                </PageSectionBody>
              </PageSection>
            </>
          )}
        </LoadingBlock>
      </PageBody>
    </Page>
  );
};
