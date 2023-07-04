import * as React from "react";
import { useMemo, useState } from "react";
import * as _ from "lodash";

import { FhirObservationUtil } from "next-shared/src/fhirUtil/utilClasses/FhirObservationUtil";
import { MedicalResourceType } from "next-shared/src/types/types";
import { ELayoutVariant } from "next-shared/src/types/layouts";
import { TDialogSizes } from "next-shared/src/types/dialogs";
import { fhirUtil } from "next-shared/src/fhirUtil";
import { IReviewableObservation } from "next-shared/src/types/IReviewableObservation";

import { mapObservationTypeToIcon } from "../../../helpers/mapObservationTypeToIcon";
import { NoDataFallback } from "../../structure/NoDataFallback";
import { humaneDate } from "../../../helpers/humaneDate";
import {
  Resource,
  ResourceAction,
  ResourceActionAlt,
  ResourceActions,
  ResourceBody,
  ResourceFooter,
  ResourceHeader,
  ResourceSource,
  ResourceType,
} from "../../generic/Resource";
import { ObservationCardContent } from "./components/ObservationCardContent";
import { DangerBadge } from "../../generic/Badge";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../structure/Modal";

export interface IObservationCardProps extends IReviewableObservation {
  data: fhir3.Observation;
  goal?: fhir3.Goal;
  onEdit?: ((val: fhir3.Observation) => void) | null;
  onViewDetails?: ((val: fhir3.Observation) => void) | null;
  onClick?: () => void;
  /** show a badge suggesting the item is available for prefill. Explicit flag because we only want to show this to practitioners during a consult */
  showPrefillBadge?: boolean;
  variant?: ELayoutVariant;
  isSelected?: boolean;
  onSelect?: (obs: fhir3.Observation) => unknown;
}

/**
 * Component showing information about ObservationCard metrics
 */
export const ObservationCard: React.FC<IObservationCardProps> = ({
  data,
  goal,
  onEdit,
  onViewDetails,
  onAccept,
  onReject,
  onTranscribe,
  showPrefillBadge = false,
  variant = ELayoutVariant.Standard,
  onSelect,
  isSelected,
  ...rest
}) => {
  // HACK do we still need this?
  // incorrect data structure, fall to the standard resource
  if (data && !(_.isObject(data) && data.resourceType)) {
    return <Resource {...rest} />;
  }

  // no data
  if (!data) {
    return <NoDataFallback />;
  }

  const [showModalDetails, setShowModalDetails] = useState<boolean>(false);

  /**
   * Review items can only be reviewable if they are;
   * NOT to be transcribed (like reason for visit),
   * AND
   * they have a custom extension set on the fhir resource saying it's a review item,
   */

  const observationUtil = fhirUtil<FhirObservationUtil>(data);
  const toBeTranscribed = observationUtil.isTranscribeItem();
  const displayName = observationUtil.getObservationDisplayName();
  const resourceType = observationUtil.getMedicalResourceType();
  const needsReview = observationUtil.isReviewItem();
  const lastUpdated = observationUtil.getLastModified();
  const isPatientForm = resourceType === MedicalResourceType.PatientForm;

  const icon = mapObservationTypeToIcon(resourceType);

  // const shouldShowActions = needsReview;

  // Editable if we have an onEdit callback
  // special case for patient forms, only if it's pending
  const isEditable =
    onEdit &&
    typeof onEdit === "function" &&
    (!isPatientForm || (isPatientForm && needsReview));

  const isTranscribable = toBeTranscribed && typeof onTranscribe === "function";

  const isReviewable =
    !toBeTranscribed &&
    typeof onAccept === "function" &&
    typeof onReject === "function";

  const showFooter =
    lastUpdated ||
    isReviewable ||
    isTranscribable ||
    (onViewDetails && typeof onViewDetails === "function");

  const onEditAction = useMemo(() => {
    if (!isEditable || !data.component) {
      return;
    }
    return { label: "Edit", onClick: () => onEdit(data) };
  }, [data, onEdit, isEditable]);

  const onViewDetailsAction = useMemo(() => {
    if (!onViewDetails || typeof onViewDetails !== "function") {
      return;
    }
    return { label: "View details", onClick: () => onViewDetails(data) };
  }, [data, onViewDetails]);

  return (
    <Resource
      fillContainer={variant === ELayoutVariant.Compact}
      onSelect={onSelect ? () => onSelect(data) : undefined}
      isSelected={isSelected}
    >
      <ResourceHeader icon={icon} action={onEditAction}>
        <ResourceType>{displayName}</ResourceType>
        {(isTranscribable || showPrefillBadge) && (
          <DangerBadge size="sm">Available for prefill</DangerBadge>
        )}
        {isReviewable && (
          <DangerBadge size="sm">Available for review</DangerBadge>
        )}
      </ResourceHeader>
      <ResourceBody onViewMoreContent={() => setShowModalDetails(true)}>
        <ObservationCardContent
          data={data?.component}
          goal={goal}
          resourceType={resourceType}
          variant={variant}
          fallbackAction={
            onEdit && {
              label: "Provide details",
              onClick: () => onEdit(data),
            }
          }
        />
      </ResourceBody>
      {showFooter && (
        <ResourceFooter action={onViewDetailsAction}>
          {Boolean(lastUpdated) && (
            <ResourceSource
              description={`Last updated ${humaneDate(lastUpdated)}`}
            />
          )}
        </ResourceFooter>
      )}
      {isTranscribable && (
        <ResourceActions>
          <ResourceAction onClick={() => onTranscribe([data])}>
            Transcribe
          </ResourceAction>
        </ResourceActions>
      )}
      {isReviewable && (
        <ResourceActions>
          <ResourceAction onClick={() => onAccept([data.id])}>
            Accept
          </ResourceAction>
          <ResourceActionAlt onClick={() => onReject([data.id])}>
            Reject
          </ResourceActionAlt>
        </ResourceActions>
      )}
      <Modal
        open={showModalDetails}
        onClose={() => setShowModalDetails(false)}
        size={TDialogSizes.Medium}
      >
        <ModalHeader>{displayName}</ModalHeader>
        <ModalBody>
          <ObservationCardContent
            data={data.component}
            resourceType={resourceType}
          />
        </ModalBody>
        <ModalFooter onCancel={() => setShowModalDetails(false)} />
      </Modal>
    </Resource>
  );
};

export default ObservationCard; // TODO remove when refactored to use named imports everywhere
