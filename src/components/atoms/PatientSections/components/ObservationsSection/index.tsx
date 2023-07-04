import * as _ from "lodash";
import React, { useMemo } from "react";

import { ELayoutVariant } from "next-shared/src/types/layouts";
import { fhirUtil } from "next-shared/src/fhirUtil";
import {
  MedicalResourceType,
  PatientMedicalResource,
} from "next-shared/src/types/types";

import ObservationCard from "../../../../resources/ObservationCard";

import { useRequiredContext } from "../../../../../hooks/useRequiredContext";
import { Grid } from "../../../../structure/Grid";
import { LoadingBlock } from "../../../../structure/LoadingBlock";
import { ReviewContext } from "../../../../../contexts/ReviewContext";
import { useSyncedSessionData } from "../../../../../hooks/core/useSyncedSessionData";

import styles from "./styles.scss";
import { cssComposer } from "../../../../../helpers/cssComposer";
import { useSyncedPatientMedicalResources } from "../../../../../hooks/patient/useSyncedPatientMedicalResources";

const css = cssComposer(styles, "ObservationsSection");

export interface IObservationsSectionReadyProps {
  filter?: string[];
  onlyShowLatest?: boolean;
  patientAllMedicalResources: {
    [key: string]: any;
  };
  placeholders?: {
    [key: string]: any;
  };
  onEdit?: ((val: fhir3.Observation) => void) | null;
  onAccept?: ((ids: string[]) => Promise<void>) | null;
  onReject?: ((ids: string[]) => Promise<void>) | null;
  variant?: ELayoutVariant;
  reviewableObservationTypes: readonly MedicalResourceType[];
}

export const ObservationsSectionReady: React.FC<
  IObservationsSectionReadyProps
> = ({
  filter = [],
  onlyShowLatest = true,
  patientAllMedicalResources,
  placeholders = {},
  onEdit,
  variant = ELayoutVariant.Standard,
  onAccept,
  onReject,
  reviewableObservationTypes,
}) => {
  const preparedMedicalResources = useMemo(() => {
    const items: {
      [key: string]: any;
    } = {};

    // Sort by most recently modified first.
    const sortFn = (a: PatientMedicalResource, b: PatientMedicalResource) =>
      fhirUtil(b).getLastModified() - fhirUtil(a).getLastModified();

    Object.keys(patientAllMedicalResources).forEach((obsType) => {
      const noObservation =
        (patientAllMedicalResources[obsType] || []).length === 0;
      items[obsType] = noObservation
        ? placeholders[obsType]
        : patientAllMedicalResources[obsType];
    });

    // filter down to last entry
    if (onlyShowLatest) {
      Object.keys(items).map((k) => {
        items[k] = _.last(items[k]);
      });
    }
    // filter down to a select group
    const observationsToShow = _.flatten(filter.map((f) => items[f] || []));

    return observationsToShow.sort(sortFn);
  }, [patientAllMedicalResources, placeholders, onlyShowLatest, filter]);

  // Getting the location from the ehr patient in scope
  // to check if the observation is reviewable for the current location
  // TODO recheck after the review extension is finalised in the backend
  const { ehrPatient } = useSyncedSessionData();
  const locationSlug = ehrPatient?.association?.cmsLocationSlug;

  return (
    <div>
      {!preparedMedicalResources.length && (
        <h4 style={{ marginBottom: "20px" }}>No information on record</h4>
      )}
      <Grid size="lg">
        {preparedMedicalResources.map((observation, index) => {
          const isReviewItem = fhirUtil(observation).isReviewItem(locationSlug);
          const resourceType = fhirUtil(observation).getMedicalResourceType();
          const canImportIntoEhr =
            reviewableObservationTypes.includes(resourceType);

          const isReviewable = isReviewItem && canImportIntoEhr;

          return (
            <div key={index} className={css("", `-${variant}`)}>
              <ObservationCard
                data={observation}
                onEdit={onEdit}
                variant={variant}
                onAccept={isReviewable ? onAccept : null}
                onReject={isReviewable ? onReject : null}
              />
            </div>
          );
        })}
      </Grid>
    </div>
  );
};

export interface IObservationsSectionProps
  extends Omit<
    IObservationsSectionReadyProps,
    "patientAllMedicalResources" | "reviewableObservationTypes"
  > {
  isReviewable?: boolean;
}

export const ObservationsSection = (props: IObservationsSectionProps) => {
  const { isReviewable, ...rest } = props;

  const { scope } = useSyncedSessionData();
  const { patientAllMedicalResources } = useSyncedPatientMedicalResources(
    scope?.patientId,
  );

  const { acceptResources, rejectResources, reviewableObservationTypes } =
    useRequiredContext(ReviewContext);

  return (
    <LoadingBlock isLoading={patientAllMedicalResources === null}>
      <ObservationsSectionReady
        {...rest}
        patientAllMedicalResources={patientAllMedicalResources}
        onAccept={isReviewable ? acceptResources : null}
        onReject={isReviewable ? rejectResources : null}
        reviewableObservationTypes={reviewableObservationTypes}
      />
    </LoadingBlock>
  );
};
