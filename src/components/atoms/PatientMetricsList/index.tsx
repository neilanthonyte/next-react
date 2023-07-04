import React, { useContext, useMemo } from "react";

import { ELayoutVariant } from "next-shared/src/types/layouts";
import { fhirUtil } from "next-shared/src/fhirUtil";
import { sortObservationsByMostRecent } from "next-shared/src/helpers/sortObservationsByMostRecent";

import ObservationCard from "../../resources/ObservationCard";
import {
  ISelectableListWithDetailAction,
  SelectableListWithDetail,
} from "../SelectableListWithDetail";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { useSyncedPatientMedicalResources } from "../../../hooks/patient/useSyncedPatientMedicalResources";
import { PendingContent } from "../../structure/PendingContent";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import { ObservationCell } from "../../cells/ObservationCell";
import { ReviewContext } from "../../../contexts/ReviewContext";
import { NoDataFallback } from "../../structure/NoDataFallback";

export interface IPatientMetricsListProps {
  showReviewOnly?: boolean;
}

/**
 * Component rendering list of metrics for the patient in session
 */
export const PatientMetricsList: React.FC<IPatientMetricsListProps> = ({
  showReviewOnly = false,
}) => {
  const { nextPatient, scope } = useSyncedSessionData();
  const { reviewableObservationTypes, acceptResources, rejectResources } =
    useContext(ReviewContext);

  // if in a scope, filter down review items by location
  const cmsLocationSlug = scope?.cmsLocationSlug;

  const { patientMetrics, isLoading, error, refetch } =
    useSyncedPatientMedicalResources(nextPatient?.patientId);

  const metricsItems = useMemo(() => {
    if (!patientMetrics) return [];

    return Object.values(patientMetrics).reduce((acc, current) => {
      const returnValue = showReviewOnly
        ? acc.concat(
            current.filter((x) => fhirUtil(x).isReviewItem(cmsLocationSlug)),
          )
        : acc.concat(current);
      return returnValue.sort(sortObservationsByMostRecent);
    }, []);
  }, [patientMetrics, showReviewOnly, nextPatient, cmsLocationSlug]);

  const emptyMessage =
    "There are no metrics to review. Please use the consult dashboard to view the patient’s full list of metrics.";

  const canImportAll = useMemo(
    () =>
      metricsItems.every((metric) =>
        reviewableObservationTypes.includes(
          fhirUtil(metric).getMedicalResourceType(),
        ),
      ),
    [metricsItems, reviewableObservationTypes],
  );

  const listActions = useMemo<ISelectableListWithDetailAction[]>(() => {
    if (
      !rejectResources ||
      !acceptResources ||
      !metricsItems ||
      metricsItems.length <= 1 ||
      // HACK only showing accept/reject all when all items can be accepted/rejected
      !canImportAll
    )
      return;

    return [
      {
        label: "Accept all",
        variant: "primary",
        onClick: () => acceptResources(metricsItems.map((m) => m.id)),
      },
      {
        label: "Reject all",
        variant: "secondary",
        onClick: () => rejectResources(metricsItems.map((m) => m.id)),
      },
    ];
  }, [acceptResources, rejectResources, metricsItems, canImportAll]);

  return (
    <PendingContent check={!isLoading}>
      {!!error ? (
        <ErrorPlaceholder
          title={"Unable to retrieve patient metrics"}
          retry={refetch}
        />
      ) : (
        <SelectableListWithDetail
          data={metricsItems as fhir3.Observation[]}
          renderListItem={(obs) => (
            <ObservationCell
              observation={obs}
              onAccept={
                reviewableObservationTypes.includes(
                  fhirUtil(obs).getMedicalResourceType(),
                ) && acceptResources
              }
              onReject={rejectResources}
            />
          )}
          renderSelectedItem={(obs) => (
            <ObservationCard
              data={obs}
              variant={ELayoutVariant.Compact}
              onAccept={
                reviewableObservationTypes.includes(
                  fhirUtil(obs).getMedicalResourceType(),
                ) && acceptResources
              }
              onReject={rejectResources}
            />
          )}
          renderEmptyListFallback={() => (
            <NoDataFallback message={emptyMessage} />
          )}
          listActions={listActions}
        />
      )}
    </PendingContent>
  );
};
