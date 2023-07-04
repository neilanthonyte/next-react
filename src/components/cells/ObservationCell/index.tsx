import React, { useMemo } from "react";
import moment from "moment";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { IReviewableObservation } from "next-shared/src/types/IReviewableObservation";
import { supportedMetrics } from "next-shared/src/helpers/supportedMetrics";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { FhirObservationUtil } from "next-shared/src/fhirUtil/utilClasses/FhirObservationUtil";

import { mapObservationTypeToIcon } from "../../../helpers/mapObservationTypeToIcon";
import {
  Cell,
  CellDescription,
  CellHeader,
  ICellAction,
} from "../../structure/Cell";
import { humanDateTimeFormatCompact } from "../../../helpers/momentFormats";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";

const css = cssComposer(styles, "ObservationCell");

export interface IObservationCellProps extends IReviewableObservation {
  observation: fhir3.Observation;
}

/**
 * Component rendering a preview cell for the given observation
 */
export const ObservationCell: React.FC<IObservationCellProps> = ({
  observation,
  onAccept,
  onReject,
  onTranscribe,
}) => {
  if (!observation.component || !Array.isArray(observation.component)) {
    console.warn("Only fhir observations with component are supported.");
    return null;
  }
  const { type, title, lastModified, isReviewItem, isTranscribeItem } =
    useMemo(() => {
      const isMetric = !!observation.component.find((c) => !!c.valueQuantity);
      const obsUtil = fhirUtil<FhirObservationUtil>(observation);
      const type = obsUtil.getMedicalResourceType();
      const title = isMetric
        ? obsUtil.getDisplayText(supportedMetrics[type]?.decimalRounding)
        : obsUtil.getDisplayName();
      const modifiedDate = moment
        .unix(obsUtil.getLastModified())
        .format(humanDateTimeFormatCompact);

      return {
        type,
        title,
        lastModified: modifiedDate,
        isReviewItem: obsUtil.isReviewItem(),
        isTranscribeItem: obsUtil.isTranscribeItem(),
      };
    }, [observation]);

  const actions = useMemo<ICellAction[]>(() => {
    if (!isTranscribeItem && !isReviewItem) return;
    if (isTranscribeItem && onTranscribe) {
      return [
        {
          label: "Transcribe",
          onClick: () => onTranscribe([observation]),
          size: EStandardSizes.Small,
        },
      ];
    }
    if (!onAccept || !onReject) return;
    return [
      {
        label: "Accept",
        onClick: () => onAccept([observation.id]),
        size: EStandardSizes.Small,
      },
      {
        label: "Reject",
        onClick: () => onReject([observation.id]),
        size: EStandardSizes.Small,
        variant: "secondary",
      },
    ];
  }, [
    onAccept,
    onReject,
    onTranscribe,
    isTranscribeItem,
    isReviewItem,
    observation,
  ]);

  return (
    <Cell decorationIcon={mapObservationTypeToIcon(type)} actions={actions}>
      <div className={css("")}>
        <div className={css("body")}>
          {!!title && <CellHeader>{title}</CellHeader>}
          {!!lastModified && <CellDescription>{lastModified}</CellDescription>}
        </div>
      </div>
    </Cell>
  );
};
