import * as React from "react";
import { useContext, useMemo } from "react";

import { ELayoutVariant } from "next-shared/src/types/layouts";
import { fhirUtil } from "next-shared/src/fhirUtil";
import { sortObservationsByMostRecent } from "next-shared/src/helpers/sortObservationsByMostRecent";
import { MedicalResourceType } from "next-shared/src/types/types";

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

export interface IPatientFormsListProps {
  showReviewOnly?: boolean;
}

/**
 * Component rendering list of submitted forms for the patient in session
 */
export const PatientFormsList: React.FC<IPatientFormsListProps> = ({
  showReviewOnly = false,
}) => {
  const { nextPatient, scope } = useSyncedSessionData();
  const { transcribeResources } = useContext(ReviewContext);
  // if in a scope, filter down review items by location
  const cmsLocationSlug = scope?.cmsLocationSlug;

  const { patientSubmittedInformation, isLoading, error, refetch } =
    useSyncedPatientMedicalResources(nextPatient?.patientId);

  const patientForms = useMemo(() => {
    if (!patientSubmittedInformation) return [];
    const patientSubmittedForms = [
      ...patientSubmittedInformation[MedicalResourceType.PatientForm],
      ...patientSubmittedInformation[MedicalResourceType.OnboardingForm],
    ];

    if (!patientSubmittedForms.length) return [];

    const returnValue = patientSubmittedForms.sort(
      sortObservationsByMostRecent,
    );

    return showReviewOnly
      ? returnValue.filter((x) => fhirUtil(x).isReviewItem(cmsLocationSlug))
      : returnValue;
  }, [
    patientSubmittedInformation,
    showReviewOnly,
    nextPatient,
    cmsLocationSlug,
  ]);

  const emptyMessage =
    "There are no submitted forms to review. Please use the consult dashboard to view the patient’s full list of submitted forms.";

  const listActions = useMemo<ISelectableListWithDetailAction[]>(() => {
    if (!patientForms || patientForms.length <= 1) return;

    return [
      {
        label: "Transcribe all",
        variant: "primary",
        onClick: () => transcribeResources(patientForms),
      },
    ];
  }, [transcribeResources, patientForms]);

  return (
    <PendingContent check={!isLoading}>
      {!!error ? (
        <ErrorPlaceholder
          title={"Unable to retrieve patient submitted forms"}
          retry={refetch}
        />
      ) : (
        <SelectableListWithDetail
          data={patientForms as fhir3.Observation[]}
          renderListItem={(obs) => (
            <ObservationCell
              observation={obs}
              onTranscribe={transcribeResources}
            />
          )}
          renderSelectedItem={(obs) => (
            <ObservationCard
              data={obs}
              variant={ELayoutVariant.Compact}
              onTranscribe={transcribeResources}
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
