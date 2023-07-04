import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import moment from "moment";
import * as _ from "lodash";

import {
  PageSection,
  PageSectionBody,
  PageSectionHeader,
  PageSectionTitle,
} from "../../structure/PageSection";

import { useClient } from "../../../hooks/useClient";

import { ICmsLocation } from "next-shared/src/types/ICmsLocation";
import { ChecklistDayPreview } from "next-shared/src/models/ChecklistDayPreview";
import {
  IActionMetricsByLocationId,
  IActionMetricsSerialized,
} from "next-shared/src/types/IActionMetricsSerialized";
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "../../structure/Table";

interface ILocationStatistics {
  title: string;
  compliance: string;
  openActions: string;
}

export interface INextNetworkSectionProps {}

export const NextNetworkSection: React.FC<INextNetworkSectionProps> = () => {
  const client = useClient();

  const [locations, setLocations] = useState(null);
  const [checklistDayPreviews, setChecklistDayPreviews] = useState<{
    [locationId: string]: ChecklistDayPreview[];
  }>(null);
  const [opsActionMetrics, setOpsActionMetrics] =
    useState<IActionMetricsByLocationId>(null);
  const [patientAppSignupCount, setPatientAppSignupCount] = useState(null);

  const startDate = moment().startOf("day");
  const endDate = moment().endOf("day");

  useEffect(() => {
    if (!client.auth.session) {
      return;
    }
    client.locations
      .retrieveAllLocations()
      .then((locations) => setLocations(locations));
  }, [client.auth.session]);

  useEffect(() => {
    if (!client.auth.session) {
      return;
    }
    client.tasks
      .retrieveDailyTaskSummariesBetweenDatesForAvailableLocations(
        startDate.format("YYYY-MM-DD"),
        endDate.format("YYYY-MM-DD"),
      )
      .then((data: ChecklistDayPreview[]) =>
        setChecklistDayPreviews(_.groupBy(data, "locationId")),
      )
      .catch((e: Error) => console.error(e));
  }, [client.auth.session]);

  useEffect(() => {
    if (!client.auth.session) {
      return;
    }
    client.opsActions
      .getActionMetricsForAllAvailableLocations()
      .then((data: IActionMetricsByLocationId) => setOpsActionMetrics(data))
      .catch((e: Error) => console.error(e));
  }, [client.auth.session]);

  useEffect(() => {
    (async () => {
      if (locations === null) {
        return;
      }
      const patientAppSignups = await Promise.all(
        locations.map((location: ICmsLocation) => {
          return client.statistics
            .getPatientAppSignupCountForLocation(
              location.id.toString(),
              startDate.unix(),
              endDate.unix(),
            )
            .then((signUps) => ({
              locationId: location.id,
              appSignUps: signUps,
            }))
            .catch((e) => console.error(e));
        }),
      );
      setPatientAppSignupCount(_.keyBy(patientAppSignups, "locationId"));
    })();
  }, [locations]);

  const statistics: ILocationStatistics[] = useMemo(() => {
    if (
      locations === null ||
      checklistDayPreviews === null ||
      opsActionMetrics === null ||
      patientAppSignupCount === null
    ) {
      return [];
    }
    return locations.map((location: ICmsLocation) => {
      if (!opsActionMetrics[location.id]) {
        console.warn("missing action summary");
      }
      if (!checklistDayPreviews[location.id]) {
        console.warn("missing checklist summary");
      }
      const checklistPreview: ChecklistDayPreview =
        checklistDayPreviews[location.id] &&
        checklistDayPreviews[location.id][0];
      const actionsSummary: IActionMetricsSerialized =
        opsActionMetrics[location.id];

      const summary = {
        title: location.title,
        compliance: "-",
        openActions: "-",
      };

      if (checklistPreview) {
        summary.compliance =
          Math.round(
            (checklistPreview.completedTasks / checklistPreview.totalTasks) *
              100,
          ) + "%";
      }
      if (actionsSummary) {
        summary.openActions = actionsSummary.outstanding.toString();
      }
      return summary;
    });
  }, [
    locations,
    checklistDayPreviews,
    opsActionMetrics,
    patientAppSignupCount,
  ]);

  return (
    <PageSection>
      <PageSectionHeader>
        <PageSectionTitle>Global ranking</PageSectionTitle>
      </PageSectionHeader>
      <PageSectionBody>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Compliance</TableHeaderCell>
              <TableHeaderCell>Open actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {statistics &&
              statistics.map((stat: ILocationStatistics, index) => (
                <TableRow key={index}>
                  <TableCell>{stat.title}</TableCell>
                  <TableCell>{stat.compliance}</TableCell>
                  <TableCell>{stat.openActions}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </PageSectionBody>
    </PageSection>
  );
};
