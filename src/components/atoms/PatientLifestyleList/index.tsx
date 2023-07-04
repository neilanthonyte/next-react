import React, { useContext, useMemo } from "react";

import { ELayoutVariant } from "next-shared/src/types/layouts";
import { fhirUtil } from "next-shared/src/fhirUtil";
import { sortObservationsByMostRecent } from "next-shared/src/helpers/sortObservationsByMostRecent";

import ObservationCard from "../../resources/ObservationCard";
import { SelectableListWithDetail } from "../SelectableListWithDetail";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { useSyncedPatientMedicalResources } from "../../../hooks/patient/useSyncedPatientMedicalResources";
import { PendingContent } from "../../structure/PendingContent";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import { ObservationCell } from "../../cells/ObservationCell";
import { ReviewContext } from "../../../contexts/ReviewContext";
import { NoDataFallback } from "../../structure/NoDataFallback";

export interface IPatientLifestyleListProps {
  showReviewOnly?: boolean;
}

/**
 * Component rendering list of lifestyle factors for the patient in session
 */
export const PatientLifestyleList: React.FC<IPatientLifestyleListProps> = ({
  showReviewOnly = false,
}) => {
  const { nextPatient, scope } = useSyncedSessionData();
  const {
    reviewableObservationTypes,
    acceptResources,
    rejectResources,
    transcribeResources,
  } = useContext(ReviewContext);
  // if in a scope, filter down review items by location
  const cmsLocationSlug = scope?.cmsLocationSlug;

  const { patientLifestyle, isLoading, error, refetch } =
    useSyncedPatientMedicalResources(nextPatient?.patientId);

  const lifestyleItems = useMemo(() => {
    if (!patientLifestyle) return [];

    return Object.values(patientLifestyle).reduce((acc, current) => {
      const returnValue = showReviewOnly
        ? acc.concat(
            current.filter((x) => fhirUtil(x).isReviewItem(cmsLocationSlug)),
          )
        : acc.concat(current);
      return returnValue.sort(sortObservationsByMostRecent);
    }, []);
  }, [patientLifestyle, showReviewOnly, nextPatient, cmsLocationSlug]);

  const emptyMessage =
    "There are no lifestyle factors to review. Please use the consult dashboard to view the patient’s available lifestyle factors.";

  return (
    <PendingContent check={!isLoading}>
      {!!error ? (
        <ErrorPlaceholder
          title={"Unable to retrieve patient lifestyle"}
          retry={refetch}
        />
      ) : (
        <SelectableListWithDetail
          data={lifestyleItems as fhir3.Observation[]}
          renderListItem={(obs) => (
            <ObservationCell
              observation={obs}
              onAccept={
                reviewableObservationTypes.includes(
                  fhirUtil(obs).getMedicalResourceType(),
                ) && acceptResources
              }
              onReject={rejectResources}
              onTranscribe={transcribeResources}
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
              onTranscribe={transcribeResources}
            />
          )}
          renderEmptyListFallback={() => (
            <NoDataFallback message={emptyMessage} />
          )}
        />
      )}
    </PendingContent>
  );
};
